from django.http import JsonResponse
from DormifyApp.models import Payment, User
from django.utils.timezone import now
import json
from django.utils.timezone import now

#manager ma widok ze wszystkimi uzytkownikami w zakładce payments - wyswietla mu się lista uzytkownikow i po prawo ma przycisk do zatwierdzania płatności. 
#w momencie gdy przejdzie przelew od uzytkownika X, znajduje go na liście i klika przycisk by zatwierdzić płatność od danego mieszkańca. Wtedy tworzy się obiekt typu Payment

def create_payment(request, user_id):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            user_id = data.get('user_id')

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

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method."}, status=400)
