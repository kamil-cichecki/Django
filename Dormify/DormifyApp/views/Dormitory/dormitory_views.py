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
        
def get_all_dormitories(request):
    if request.method == 'GET':
        dormitories = Dormitory.objects.all()
        dormitories_list = [
            {
                "name": dorm.name,
                "address": dorm.address,
                "manager": dorm.manager,
                "population": dorm.population,
                "room_count": dorm.room_count,
                "isAccepted": dorm.isAccepted,
            }
            for dorm in dormitories
        ]
        return JsonResponse(dormitories_list, safe=False)
    return JsonResponse({"error": "Invalid request method"}, status=400)


def delete_dormitory(request, dormitory_id):
    if request.method == 'DELETE':
        try:
            dormitory = Dormitory.objects.get(id=dormitory_id)
            dormitory.delete()
            return JsonResponse({"message": "Akademik został usunięty pomyślnie!"}, status=200)
        except Dormitory.DoesNotExist:
            return JsonResponse({"error": "Akademik nie istnieje"}, status=404)
    return JsonResponse({"error": "Invalid request method"}, status=400)


def accept_dormitory(request, dormitory_id):
    if request.method == 'POST':
        try:
            dormitory = Dormitory.objects.get(id=dormitory_id)
            dormitory.isAccepted = True
            dormitory.save()
            return JsonResponse({"message": "Status 'isAccepted' został zmieniony na True"}, status=200)
        except Dormitory.DoesNotExist:
            return JsonResponse({"error": "Akademik o podanym ID nie istnieje"}, status=404)
    return JsonResponse({"error": "Invalid request method"}, status=400)

def delete_dormitory(request, dormitory_id):
    if request.method == 'DELETE':
        try:
            dormitory = Dormitory.objects.get(id=dormitory_id)
            dormitory.delete()
            return JsonResponse({"message": "Akademik został usunięty pomyślnie!"}, status=200)
        except Dormitory.DoesNotExist:
            return JsonResponse({"error": "Akademik o podanym ID nie istnieje"}, status=404)
    return JsonResponse({"error": "Invalid request method"}, status=400)
    

