from django.http import JsonResponse
from django.shortcuts import get_object_or_404
import json
from DormifyApp.models import Dormitory

def accept_dormitory(request, dormitory_id):
    if request.method == 'POST':
        try:
            dormitory = get_object_or_404(Dormitory, id=dormitory_id)
            
            if dormitory.isAccepted:
                return JsonResponse({'error': 'Akademik został już zaakceptowany'}, status=400)
            
            dormitory.isAccepted = True
            dormitory.save()

            return JsonResponse({'message': f'Akademik "{dormitory.name}" został zaakceptowany!'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Metoda nieobsługiwana'}, status=405)
