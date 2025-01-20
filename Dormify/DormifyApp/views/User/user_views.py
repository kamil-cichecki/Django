import json
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib import messages
from rest_framework_simplejwt.tokens import RefreshToken
from DormifyApp.models import Dormitory, User

def user_login(request):
    if request.method == 'POST':
        # Odczytanie danych z requestu
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
            traceback.print_exc()  # Zapisz pełny stack trace w logach
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Metoda POST wymagana'}, status=405)