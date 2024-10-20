from django.db import models
from tgusers.models import TgUser


class Stand(models.Model):
    title = models.CharField(max_length=256, null=False, blank=False)
    max_duration = models.TimeField()
    description = models.TextField()
    user = models.ManyToManyField(TgUser)