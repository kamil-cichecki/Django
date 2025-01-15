"""
URL configuration for Dormify project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from ninja import NinjaAPI
from DormifyApp.views.User.user_views import user_login
from DormifyApp.views.Dormitory.dormitory_views import register_dormitory, get_all_dormitories, delete_dormitory


#ninja Django
api = NinjaAPI()

@api.get("/add")
def add(request, a: int, b: int):
    return {"result": a + b}

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", api.urls),
    path('login/', user_login, name='user_login'),
    path('register_dormitory/', register_dormitory, name='register_dormitory'),
    path('allDormitories/', get_all_dormitories, name='get_all_dormitories'),
    path('dormitories/<int:dormitory_id>/', delete_dormitory, name='delete_dormitory')
]

#test2
