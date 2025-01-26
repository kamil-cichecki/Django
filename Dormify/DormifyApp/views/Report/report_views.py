from django.http import JsonResponse
from django.core.exceptions import ValidationError
from DormifyApp.models import Report, Dormitory, User
import json

def get_reports_by_dormitory(request, dormitory_id):
    if request.method == 'GET':
        try:
            reports = Report.objects.filter(dormitory_id=dormitory_id)
            
            if not reports.exists():
                return JsonResponse({"message": "Brak zgłoszeń dla tego akademika."}, status=404)

            reports_list = [
                {
                    "id": report.id,
                    "user_id": report.user_id.id,
                    "status": report.status,
                    "title": report.title,
                    "type": report.type,
                    "content": report.content,
                    "date": report.date.strftime('%Y-%m-%d %H:%M:%S')
                }
                for report in reports
            ]

            return JsonResponse(reports_list, safe=False, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method"}, status=400)

def create_report(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))

            dormitory_id = data.get('dormitory_id')
            user_id = data.get('user_id')
            title = data.get('title')
            report_type = data.get('type')
            content = data.get('content')

            try:
                dormitory = Dormitory.objects.get(id=dormitory_id)
            except Dormitory.DoesNotExist:
                return JsonResponse({"error": "Akademik o podanym ID nie istnieje"}, status=404)

            try:
                user = User.objects.get(id=user_id)
            except User.DoesNotExist:
                return JsonResponse({"error": "Użytkownik o podanym ID nie istnieje"}, status=404)

            report = Report(
                dormitory_id=dormitory,
                user_id=user,
                title=title,
                type=report_type,
                content=content
            )

            report.full_clean()
            report.save()

            return JsonResponse({"message": "Zgłoszenie zostało utworzone!", "report_id": report.id}, status=201)
        except ValidationError as e:
            return JsonResponse({"error": e.message_dict}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method"}, status=400)

def delete_report(request, report_id):
    if request.method == 'DELETE':
        try:
            report = Report.objects.get(id=report_id)

            report.delete()

            return JsonResponse({"message": f"Zgłoszenie o ID {report_id} zostało usunięte."}, status=200)
        except Report.DoesNotExist:
            return JsonResponse({"error": f"Zgłoszenie o ID {report_id} nie istnieje."}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method"}, status=400)
