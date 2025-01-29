from django.http import JsonResponse
from DormifyApp.models import Payment, User
from django.utils.timezone import now
import json
from django.utils.timezone import now
from django.core.exceptions import ObjectDoesNotExist

#manager ma widok ze wszystkimi uzytkownikami w zakładce payments - wyswietla mu się lista uzytkownikow i po prawo ma przycisk do zatwierdzania płatności. 
#w momencie gdy przejdzie przelew od uzytkownika X, znajduje go na liście i klika przycisk by zatwierdzić płatność od danego mieszkańca. Wtedy tworzy się obiekt typu Payment

def get_payments_for_dormitory(request, dormitory_id):
    if request.method != 'GET':
        return JsonResponse({"error": "Invalid request method. Only GET is allowed."}, status=405)

    try:
        payments = Payment.objects.filter(dormitory_id=dormitory_id)
        
        if not payments.exists():
            return JsonResponse({"error": "No payments found for the specified dormitory."}, status=404)

        payments_list = [
            {
                "payment_id": payment.id,
                "user_id": payment.user_id.id,
                "dormitory_id": payment.dormitory_id.id if payment.dormitory_id else None,
                "amount": str(payment.amount),
                "status": payment.status,
                "date_payment": payment.date_payment.isoformat() if payment.date_payment else None
            }
            for payment in payments
        ]

        print(payments_list)

        return JsonResponse({"payments": payments_list}, status=200)

    except ObjectDoesNotExist:
        return JsonResponse({"error": "Dormitory or related data not found."}, status=404)
    except Exception as e:
        return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

def create_payment(request, user_id):
    if request.method == 'POST':

            try:
                user = User.objects.get(id=user_id)
            except User.DoesNotExist:
                return JsonResponse({"error": "Użytkownik o podanym ID nie istnieje."}, status=404)

            if not user.room_id:
                return JsonResponse({"error": "Użytkownik nie jest przypisany do żadnego pokoju."}, status=400)

            room = user.room_id
            rent_cost = room.rent_cost

            payment = Payment.objects.create(
                dormitory_id=user.dormitory_id,
                user_id=user,
                amount=rent_cost,
                status=True,
                date_payment=now().date()
            )

            user.is_payment_paid = True
            user.save()

            return JsonResponse({
                "message": "Płatność została pomyślnie utworzona i oznaczona jako opłacona.",
                "payment_id": payment.id,
                "user_id": user.id,
                "amount": str(payment.amount),
                "date_payment": payment.date_payment,
                "is_payment_paid": user.is_payment_paid
            }, status=201)

    return JsonResponse({"error": "Invalid request method."}, status=400)
