from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.

class Dormitory(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=300)
    manager = models.CharField(max_length=200, help_text="kierownik akademika")
    population = models.IntegerField(help_text="liczba mieszkańców", default=0)
    capacity = models.IntegerField(help_text="liczba miejsc", default=0)
    room_count = models.IntegerField(help_text="liczba pokoi", default=0)
    isAccepted = models.BooleanField(default=False)


class Room(models.Model):

    CATEGORY = (
            ('Jednoosobowy', 'Jednoosobowy'),
            ('Dwuosobowy', 'Dwuosobowy'),
            ('Trzyosobowy', 'Trzyosobowy')
            )

    dormitory_id = models.ForeignKey(Dormitory, on_delete=models.CASCADE)
    room_number = models.IntegerField()
    capacity = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(3)])
    tenant_count = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(3)])
    type = models.CharField(max_length=200, choices=CATEGORY)
    floor = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])
    rent_cost = models.DecimalField(max_digits=10, decimal_places=2)

class User(models.Model):

    ROLE = (
        (0, 'Student'),
        (1, 'Manager'),
        (2, 'Administrator')
    )

    login = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    first_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=60)
    room_id = models.ForeignKey(Room, on_delete=models.SET_NULL, null=True)
    role = models.IntegerField(choices=ROLE, validators=[MinValueValidator(0), MaxValueValidator(5)])
    student_status = models.BooleanField(default=True, null=True)
    washes_number = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)], default=5, null=True)
    dormitory_id = models.ForeignKey(Dormitory, on_delete=models.SET_NULL, null=True, blank=True)


class Report(models.Model): 

    STATUS = (
            ('Przyjęto', 'Przyjęto'),
            ('W trakcie', 'w trakcie'),
            ('Zakończono', 'Zakończono')
            )
    
    TYPE = (
            ('naprawa', 'naprawa'),
            ('czyszczenie', 'czyszczenie'),
            ('inne', 'inne')
            )

    dormitory_id = models.ForeignKey(Dormitory, on_delete=models.SET_NULL, null=True, blank=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=50, choices=STATUS, default='Przyjęto')
    title = models.CharField(max_length=200, help_text="tytuł zgłoszenia")
    type = models.CharField(max_length=50, choices=TYPE)
    content = models.TextField(help_text="szczegóły zgłoszenia")
    date = models.DateTimeField(auto_now_add=True)

class Laundry(models.Model):
    dormitory_id = models.ForeignKey(Dormitory, on_delete=models.SET_NULL, null=True, blank=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    reservation_start = models.DateTimeField(help_text="Data i godzina rozpoczęcia prania")
    reservation_end = models.DateTimeField(help_text="Data i godzina zakończenia prania")

class Payment(models.Model):

    STATUS = (
            ('Opłacone', 'Opłacone'),
            ('Nieopłacone', 'Nieopłacone')
            )

    dormitory_id = models.ForeignKey(Dormitory, on_delete=models.SET_NULL, null=True, blank=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.BooleanField(default=False)
    date_payment = models.DateField()
    payment_deadline = models.DateField()


