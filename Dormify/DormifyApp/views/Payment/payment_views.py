from django.http import JsonResponse
from DormifyApp.models import Payment, User
from django.utils.timezone import now
import json

#manager ma widok ze wszystkimi uzytkownikami w zakładce payments - wyswietla mu się lista uzytkownikow i po prawo ma przycisk do zatwierdzania płatności. 
#w momencie gdy przejdzie przelew od uzytkownika X, znajduje go na liście i klika przycisk by zatwierdzić płatność od danego mieszkańca. Wtedy tworzy się obiekt typu Payment

def create_payment(request, user_id):
    if request.method == 'POST':
        try:


            # Znajdź użytkownika
            try:
                user = User.objects.get(id=user_id)
            except User.DoesNotExist:
                return JsonResponse({"error": "Użytkownik o podanym ID nie istnieje."}, status=404)

            # Sprawdź, czy użytkownik ma przypisany pokój
            if not user.room_id:
                return JsonResponse({"error": "Użytkownik nie jest przypisany do żadnego pokoju."}, status=400)

            # Pobierz szczegóły pokoju i koszt wynajmu
            room = user.room_id
            rent_cost = room.rent_cost

            # Utwórz obiekt Payment
            payment = Payment.objects.create(
                dormitory_id=user.dormitory_id,
                user_id=user,
                amount=rent_cost,
                status=False,
                date_payment=now().date()
            )

            return JsonResponse({
                "message": "Płatność została pomyślnie utworzona.",
                "payment_id": payment.id,
                "user_id": user.id,
                "amount": str(payment.amount),
                "date_payment": payment.date_payment
            }, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method."}, status=400)