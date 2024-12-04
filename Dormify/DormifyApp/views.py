from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.contrib import messages

from .models import User

def user_login(request):
    if request.method == 'POST':
        login = request.POST.get('login')
        password = request.POST.get('password')
        
        try:
            user = User.objects.get(login=login)
            if user.password == password: #hash hasla potem
                request.session['user_id'] = user.id
                messages.success(request, "Zalogowano pomyślnie!")
                return redirect('home')
            else:
                messages.error(request, "Nieprawidłowe hasło.")
        except User.DoesNotExist:
            messages.error(request, "Użytkownik nie istnieje.")
    
    return render(request, 'login.html')
