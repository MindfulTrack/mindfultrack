# Generated by Django 4.2.9 on 2024-03-15 03:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('baseapp', '0004_merge_20240314_2132'),
    ]

    operations = [
        migrations.AlterField(
            model_name='calendarevent',
            name='organizer',
            field=models.ForeignKey(db_column='organizer_id', on_delete=django.db.models.deletion.CASCADE, related_name='calendar', to=settings.AUTH_USER_MODEL),
        ),
    ]
