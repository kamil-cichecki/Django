import json
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib import messages

from .models import User

def user_login(request):
    if request.method == 'POST':
        # Odczytanie danych z requestu
        try:
            data = json.loads(request.body.decode('utf-8'))
            login = data.get('login')
            password = data.get('password')

            print(login, password)

            user = User.objects.get(login=login)
            if user.password == password: #hash hasla potem

                request.session['user_id'] = user.id
                                #Zrobić tutaj generowanie tokena JWT i wysłać w odpowiedzi, pozdrawiam :)
                return JsonResponse({'message': 'Zalogowano pomyślnie!'}, status=200)
            else:
                return JsonResponse({'error': 'Nieprawidłowe dane logowania'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Metoda POST wymagana'}, status=405)
