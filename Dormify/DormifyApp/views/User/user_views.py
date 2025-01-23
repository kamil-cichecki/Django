import json
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render, redirect
from django.contrib import messages
from pydantic import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken
from DormifyApp.models import Dormitory, User, Room

def user_login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            login = data.get('login')
            password = data.get('password')

            print(login, password)


            user = User.objects.get(login=login)
            if user.password == password:
                refresh = RefreshToken.for_user(user)
                refresh.payload['role'] = user.role
                refresh.payload['first_name'] = user.first_name
                refresh.payload['last_name'] = user.last_name
                refresh.payload['dormitory_id_id'] = user.dormitory_id_id
                request.session['user_id'] = user.id
                user_list = {
                    "id": user.id,
                    "login": user.login,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "role": user.role,
                }
                return JsonResponse({
                    'message': 'Zalogowano pomyślnie!',
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),
                    'users': user_list,
                }, status=200)
            else:
                return JsonResponse({'error': 'Nieprawidłowe dane logowania'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Metoda POST wymagana'}, status=405)

def get_latest_users(request, dormitory_id):
    if request.method == 'GET':
        users = User.objects.filter(dormitory_id=dormitory_id, role=0).order_by('-id')[:3]
        users_list = [
            {
                "id": user.id,
                "login": user.login,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "room_number": user.room_id.room_number if user.room_id else None,  # Pobranie numeru pokoju
                "dormitory_id": user.dormitory_id.id,
            }
            for user in users
        ]
        return JsonResponse(users_list, safe=False)
    return JsonResponse({"error": "Invalid request method"}, status=400)

def edit_user(request, user_id):
    if request.method == 'PUT':
        try:
            user = User.objects.get(id=user_id)
            
            data = json.loads(request.body)
            
            user.first_name = data.get('first_name', user.first_name)
            user.last_name = data.get('last_name', user.last_name)
            user.login = data.get('login', user.login)
            
            user.save()

            return JsonResponse({"message": "User updated successfully"}, status=200)
        
        except User.DoesNotExist:
            return JsonResponse({"error": "User not found"}, status=404)
        
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=400)

def delete_user(request, user_id):
    if request.method == 'DELETE':
        try:
            user = get_object_or_404(User, id=user_id)
            user.delete()
            return JsonResponse({"message": "User deleted successfully"}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method"}, status=400)


def create_student(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))

            login = data.get('login')
            password = data.get('password')
            first_name = data.get('first_name')
            last_name = data.get('last_name')
            room_number = data.get('room_number')
            dormitoryid = data.get('dormitory_id')

            try:
                dormitory = Dormitory.objects.get(id=dormitoryid)
            except Dormitory.DoesNotExist:
                return JsonResponse({"error": "Akademik o podanym ID nie istnieje."}, status=404)


            try:
                room = Room.objects.get(room_number=room_number, dormitory_id=dormitory)
                if room.tenant_count >= room.capacity:
                    return JsonResponse({"error": "Pokój jest pełny."}, status=400)
            except Room.DoesNotExist:
                return JsonResponse({"error": "Pokój o podanym numerze nie istnieje w tym akademiku."}, status=404)

            new_user = User(
                login=login,
                password=password,
                first_name=first_name,
                last_name=last_name,
                room_id=room,
                role=0,
                dormitory_id=dormitory,
            )
            new_user.full_clean()
            new_user.save()

            room.tenant_count += 1
            room.save()

            return JsonResponse({"message": "Mieszkaniec został pomyślnie dodany!", "student_id": new_user.id}, status=201)

        except ValidationError as e:
            return JsonResponse({"error": e.message_dict}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method"}, status=400)


def get_users_with_role(request):
    if request.method == 'GET':
        try:
            userData = User.objects.filter(role=1)
            user_list = [
                {
                    "id": user.id,
                    "login": user.login,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "role": user.role,
                }
                for user in userData
            ]

            return JsonResponse({
                'message': 'Lista użytkowników z rolą 1',
                'users': user_list
            }, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Metoda GET wymagana'}, status=405)

def get_all_users(request, dormitory_id):
    if request.method == 'GET':
        try:
            userData = User.objects.filter(dormitory_id = dormitory_id, role=0)
            user_list = [
                {
                    "id": user.id,
                    "login": user.login,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "role": user.role,
                }
                for user in userData
            ]

            return JsonResponse({
                'message': 'Lista użytkowników z rolą 1',
                'users': user_list
            }, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Metoda GET wymagana'}, status=405)

def assign_dormitory(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            dormitory_id = data.get('dormitory_id')
            user_id = data.get('user_id')

            if not dormitory_id or not user_id:
                return JsonResponse({'error': 'Brak wymaganych danych'}, status=400)

            dormitory = Dormitory.objects.get(id=dormitory_id)
            user = User.objects.get(id=user_id)

            user.dormitory_id_id = dormitory.id
            user.save()

            return JsonResponse({'message': 'Użytkownik przypisany do akademika'}, status=200)
        except Dormitory.DoesNotExist:
            return JsonResponse({'error': 'Nie znaleziono akademika'}, status=404)
        except User.DoesNotExist:
            return JsonResponse({'error': 'Nie znaleziono użytkownika'}, status=404)
        except Exception as e:
            import traceback
            traceback.print_exc()
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Metoda POST wymagana'}, status=405)