from django.http import JsonResponse
from django.core.exceptions import ValidationError
from DormifyApp.models import Laundry, User
from django.utils.dateparse import parse_datetime
import json

def save_laundry_reservations(request, dormitory_id):
    if request.method == 'POST':
        try:
            reservations = json.loads(request.body)

            for reservation_data in reservations:
                user_id = reservation_data.get('user_id')
                reservation_start = parse_datetime(reservation_data.get('reservation_start'))
                reservation_end = parse_datetime(reservation_data.get('reservation_end'))

                laundry_reservation = Laundry(
                    user_id_id=user_id,
                    reservation_start=reservation_start,
                    reservation_end=reservation_end,
                    dormitory_id_id = dormitory_id
                )
                laundry_reservation.save()

            return JsonResponse({"message": "Rezerwacje zostały zapisane!"}, status=201)
        
        except json.JSONDecodeError:
            return JsonResponse({"error": "Błąd parsowania danych!"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    
    return JsonResponse({"error": "Invalid request method"}, status=400)

def get_laundry_reservations(request, dormitory_id):
    if request.method == 'GET':
        try:
            reservations = Laundry.objects.filter(dormitory_id=dormitory_id)

            reserved_slots = []
            for reservation in reservations:
                reserved_slots.append({
                    'user_id': reservation.user_id.id,
                    'reservation_start': reservation.reservation_start.isoformat(),
                    'reservation_end': reservation.reservation_end.isoformat(),
                })

            return JsonResponse({"reservations": reserved_slots}, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=400)