
from django.contrib import admin
from django.urls import path
from ninja import NinjaAPI
from DormifyApp.views.admin_views import accept_dormitory
from DormifyApp.views.User.user_views import user_login, get_users_with_role, assign_dormitory, create_student, get_latest_users, get_all_users, delete_user,edit_user
from DormifyApp.views.Dormitory.dormitory_views import register_dormitory, get_all_dormitories, delete_dormitory, accept_dormitory, delete_dormitory, get_dormitory_by_id, get_dormitory_occupancy, get_dormitory_population
from DormifyApp.views.Room.room_views import add_room_to_dormitory, delete_room, get_all_rooms,get_room_status_by_dormitory, get_latest_rooms_by_dormitory, edit_room
from DormifyApp.views.Report.report_views import get_reports_by_dormitory, create_report, delete_report
from DormifyApp.views.Laundry.laundy_view import get_laundry_reservations, save_laundry_reservations
from DormifyApp.views.Payment.payment_views import create_payment


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
    path('accept_dormitory/', accept_dormitory, name='accept_dormitory'),
    path('users/', get_users_with_role, name='get_users_with_role'),
    path('users/delete/<int:user_id>/', delete_user, name='delete_user'),
    path('users/edit/<int:user_id>/', edit_user, name='edit_user'),
    path('users/all/<int:dormitory_id>', get_all_users, name='get_all_users'),
    path('users/assign_dormitory/',assign_dormitory, name='get_users_with_role'),
    path('users/create_user/',create_student, name='create_user'),
    path('users/getlatestusers/<int:dormitory_id>',get_latest_users, name='get_latest_users'),
    #Dormitory
    path('allDormitories/', get_all_dormitories, name='get_all_dormitories'),
    path('dormitories/<int:dormitory_id>/accept/', accept_dormitory, name='accept_dormitory'),
    path('dormitories/<int:dormitory_id>/delete/', delete_dormitory, name='delete_dormitory'),
    path('dormitories/<int:dormitory_id>/', get_dormitory_by_id, name='get_dormitory_by_id'),
    path('dormitories/<int:dormitory_id>/population/', get_dormitory_population, name='get_dormitory_population'),
    path('dormitories/occupancy/<int:dormitory_id>/', get_dormitory_occupancy, name='get_dormitory_occupancy'),
    #Rooms
    path('rooms/add/', add_room_to_dormitory, name='add_room_to_dormitory'),
    path('rooms/', get_all_rooms, name='get_all_rooms'),
    path('rooms/delete/<int:room_id>/', delete_room, name='delete_room'),
    path('rooms/getlatest/<int:dormitory_id>/', get_latest_rooms_by_dormitory, name='get_latest_rooms_by_dormitory'),
    path('rooms/status/<int:dormitory_id>/', get_room_status_by_dormitory, name='room_status_by_dormitory'),
    path('rooms/edit/<int:room_id>/', edit_room, name="edit_room"),
    #Reports
    path('reports/dormitory/<int:dormitory_id>/', get_reports_by_dormitory, name='get_reports_by_dormitory'),
    path('reports/create/', create_report, name='create_report'),
    path('reports/delete/<int:report_id>/', delete_report, name='delete_report'),
    #Laundry
    path('laundry/save/<int:dormitory_id>/', save_laundry_reservations, name='save_laundry_reservations'),
    path('laundry/get/<int:dormitory_id>/', get_laundry_reservations, name='get_laundry_reservations'),
    #Payments
    path('payments/accept/<int:user_id>/', create_payment, name='create_payment'),
]