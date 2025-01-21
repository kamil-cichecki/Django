from django.http import JsonResponse
from django.db import transaction #atomowość 
from django.core.exceptions import ValidationError
from DormifyApp.models import Dormitory, Room
from django.db.models import Q
import json


def get_all_rooms(request):
    if request.method == 'GET':
        rooms = Room.objects.all()
        rooms_list = [
            {
                "id": room.id,
                "dormitory_id": room.dormitory_id.id,
                "room_number": room.room_number,
                "capacity": room.capacity,
                "tenant_count": room.tenant_count,
                "type": room.type,
                "floor": room.floor,
                "rent_cost": str(room.rent_cost),
            }
            for room in rooms
        ]
        return JsonResponse(rooms_list, safe=False)
    return JsonResponse({"error": "Invalid request method"}, status=400)

def get_latest_rooms_by_dormitory(request, dormitory_id):
    if request.method == 'GET':
        try:
            dormitory = Dormitory.objects.get(id=dormitory_id)
        except Dormitory.DoesNotExist:
            return JsonResponse({"error": "Akademik o podanym ID nie istnieje"}, status=404)

        # Pobranie 3 ostatnio dodanych pokoi dla danego akademika
        rooms = Room.objects.filter(dormitory_id=dormitory).order_by('-id')[:3]
        rooms_list = [
            {
                "id": room.id,
                "dormitory_id": room.dormitory_id.id,
                "room_number": room.room_number,
                "capacity": room.capacity,
                "tenant_count": room.tenant_count,
                "type": room.type,
                "floor": room.floor,
                "rent_cost": str(room.rent_cost),
            }
            for room in rooms
        ]
        return JsonResponse(rooms_list, safe=False)
    return JsonResponse({"error": "Invalid request method"}, status=400)




def delete_room(request, room_id):
    if request.method == 'DELETE':
        try:
            room = Room.objects.get(id=room_id)
            dormitory = room.dormitory_id

            with transaction.atomic():
                dormitory.capacity -= room.capacity
                dormitory.save()
                room.delete()

            return JsonResponse({"message": f"Pokój o ID {room_id} został usunięty."}, status=200)
        except Room.DoesNotExist:
            return JsonResponse({"error": f"Pokój o ID {room_id} nie istnieje."}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method"}, status=400)


def add_room_to_dormitory(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))

            dormitory_id = data.get('dormitory_id')
            room_number = data.get('room_number')
            capacity = data.get('capacity')
            tenant_count = data.get('tenant_count', 0)
            room_type = data.get('type')
            floor = data.get('floor')
            rent_cost = data.get('rent_cost')

            try:
                dormitory = Dormitory.objects.get(id=dormitory_id)
            except Dormitory.DoesNotExist:
                return JsonResponse({"error": "Akademik o podanym ID nie istnieje"}, status=404)

            if Room.objects.filter(Q(dormitory_id=dormitory) & Q(room_number=room_number)).exists():
                return JsonResponse(
                    {"error": f"Pokój o numerze {room_number} już istnieje w tym akademiku."},
                    status=400
                )

            new_room = Room(
                dormitory_id=dormitory,
                room_number=room_number,
                capacity=capacity,
                tenant_count=tenant_count,
                type=room_type,
                floor=floor,
                rent_cost=rent_cost
            )

            with transaction.atomic():
                new_room.full_clean()
                new_room.save()
                dormitory.capacity += capacity
                dormitory.save()

            return JsonResponse({"message": "Pokój został pomyślnie dodany!"}, status=201)
        except ValidationError as e:
            return JsonResponse({"error": e.message_dict}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method"}, status=400)


def get_room_status_by_dormitory(request, dormitory_id):
    if request.method == 'GET':
        try:
            try:
                dormitory = Dormitory.objects.get(id=dormitory_id)
            except Dormitory.DoesNotExist:
                return JsonResponse({"error": "Akademik o podanym ID nie istnieje"}, status=404)

            rooms = Room.objects.filter(dormitory_id=dormitory_id)
            room_status_list = [
                {
                    "room_id": room.id,
                    "room_number": room.room_number,
                    "dormitory_id": room.dormitory_id.id,
                    "dormitory_name": room.dormitory_id.name,
                    "capacity": room.capacity,
                    "tenant_count": room.tenant_count,
                    "status": f"{room.tenant_count}/{room.capacity}",
                    "is_full": room.tenant_count == room.capacity,
                    "has_space": room.tenant_count < room.capacity,
                    "room_type": room.type,
                    "floor": room.floor,
                    "rent_cost": room.rent_cost,
                }
                for room in rooms
            ]

            return JsonResponse({
                "dormitory": {
                    "id": dormitory.id,
                    "name": dormitory.name,
                    "address": dormitory.address,
                    "manager": dormitory.manager
                },
                "rooms": room_status_list
            }, safe=False, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method"}, status=400)