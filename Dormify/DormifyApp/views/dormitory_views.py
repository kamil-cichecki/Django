import json
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib import messages
from rest_framework_simplejwt.tokens import RefreshToken
from DormifyApp.models import Dormitory

def register_dormitory(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            name = data.get('name')
            address = data.get('address')
            manager = data.get('manager')
            isAccepted = data.get('isAccepted', False)

            if Dormitory.objects.filter(name=name).exists():
                return JsonResponse({'error': 'Akademik o tej nazwie już istnieje'}, status=400)
            
            new_dormitory = Dormitory(name=name, address = address, manager=manager, isAccepted = isAccepted)
            new_dormitory.save()

            return JsonResponse({'message': 'Akademik został zarejestrowany pomyślnie!'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        
#leno
    

