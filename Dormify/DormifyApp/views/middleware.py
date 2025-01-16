from django.http import JsonResponse
from functools import wraps
from DormifyApp.models import User

#do obsługi roli.
def role_required(roles):
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(request, *args, **kwargs):
            user_id = request.session.get('user_id')
            if not user_id:
                return JsonResponse({'error': 'Nie zalogowano użytkownika'}, status=403)
            
            try:
                user = User.objects.get(id=user_id)
                if user.role not in roles:
                    return JsonResponse({'error': 'Brak dostępu'}, status=403)
                return view_func(request, *args, **kwargs)
            except User.DoesNotExist:
                return JsonResponse({'error': 'Nie znaleziono użytkownika'}, status=404)
        return wrapper
    return decorator
