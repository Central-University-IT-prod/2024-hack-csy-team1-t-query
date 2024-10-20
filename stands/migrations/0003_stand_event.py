# Generated by Django 5.1.2 on 2024-10-13 00:31

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_remove_event_stand'),
        ('stands', '0002_alter_stand_max_duration'),
    ]

    operations = [
        migrations.AddField(
            model_name='stand',
            name='event',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='events.event'),
        ),
    ]
