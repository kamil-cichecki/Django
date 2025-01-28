from django.contrib import admin
from .models import Dormitory, Room, User, Report, Laundry, Payment

# Register your models here.

@admin.register(Dormitory)
class DormitoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'address', 'manager', 'population', 'room_count')
    search_fields = ('name', 'address', 'manager')
    list_filter = ('manager',)

@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('room_number', 'dormitory_id', 'capacity', 'tenant_count', 'type', 'floor', 'rent_cost')
    search_fields = ('room_number', 'dormitory_id__name')
    list_filter = ('type', 'floor')

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('login', 'first_name', 'last_name', 'role', 'student_status', 'room_id')
    search_fields = ('login', 'first_name', 'last_name')
    list_filter = ('role', 'student_status')

@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ('title', 'user_id', 'status', 'type', 'date')
    search_fields = ('title', 'user_id__login')
    list_filter = ('status', 'type', 'date')

@admin.register(Laundry)
class LaundryAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'reservation_start', 'reservation_end')
    search_fields = ('user_id__login',)

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'amount', 'status', 'date_payment')
    search_fields = ('user_id__login',)
