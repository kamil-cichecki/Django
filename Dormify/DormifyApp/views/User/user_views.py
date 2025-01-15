import json
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib import messages
from rest_framework_simplejwt.tokens import RefreshToken
from DormifyApp.models import User

def user_login(request):
    if request.method == 'POST':
        # Odczytanie danych z requestu
        try:
            data = json.loads(request.body.decode('utf-8'))
            login = data.get('login')
            password = data.get('password')

            print(login, password)

            userData = User.objects.all()
            user_list = [
                {
                    "id": user.id,
                    "login": user.login,
                    "imie": user.first_name,
                    "nazwisko": user.last_name,
                    "rola": user.role,
                }
            for user in userData
        ]

            user = User.objects.get(login=login)
            if user.password == password:
                refresh = RefreshToken.for_user(user)
                request.session['user_id'] = user.id
                                
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
