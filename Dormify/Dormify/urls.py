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
from DormifyApp.views.User.user_views import user_login, get_users_with_role, assign_dormitory
from DormifyApp.views.Dormitory.dormitory_views import register_dormitory, get_all_dormitories, delete_dormitory, accept_dormitory, delete_dormitory
from DormifyApp.views.Room.room_views import add_room_to_dormitory, delete_room, get_all_rooms


#ninja Django
api = NinjaAPI()

@api.get("/add")
def add(request, a: int, b: int):
    return {"result": a + b}

urlpatterns = [
    #Users
    path('admin/', admin.site.urls),
    path("api/", api.urls),
    path('login/', user_login, name='user_login'),
    path('register_dormitory/', register_dormitory, name='register_dormitory'),
    path('users/', get_users_with_role, name='get_users_with_role'),
    path('users/assign_dormitory/',assign_dormitory, name='get_users_with_role'),
    #Dormitory
    path('allDormitories/', get_all_dormitories, name='get_all_dormitories'),
    path('dormitories/<int:dormitory_id>/accept/', accept_dormitory, name='accept_dormitory'),
    path('dormitories/<int:dormitory_id>/delete/', delete_dormitory, name='delete_dormitory'),
    #Room
    path('rooms/add/', add_room_to_dormitory, name='add_room_to_dormitory'),
    path('rooms/', get_all_rooms, name='get_all_rooms'),
    path('rooms/<int:room_id>/', delete_room, name='delete_room')
]

