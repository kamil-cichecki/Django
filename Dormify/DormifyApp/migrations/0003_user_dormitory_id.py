# Generated by Django 5.1.3 on 2025-01-16 19:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('DormifyApp', '0002_dormitory_isaccepted_alter_dormitory_population_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='dormitory_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='DormifyApp.dormitory'),
        ),
    ]
