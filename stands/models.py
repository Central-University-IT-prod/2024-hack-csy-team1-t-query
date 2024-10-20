from django.db import models
from tgusers.models import TgUser
from events.models import Event


class Stand(models.Model):
    title = models.CharField(max_length=256, null=False, blank=False)
    max_duration = models.DurationField()
    description = models.TextField()
    user = models.ManyToManyField(TgUser)
    event = models.ForeignKey(Event, related_name="stand", on_delete=models.CASCADE, null=True)