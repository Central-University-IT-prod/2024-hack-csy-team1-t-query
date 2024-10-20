from django.db import models
from django.contrib.auth.models import User

from stands.models import Stand

class Event(models.Model):
    title = models.CharField(max_length=256, null=False, blank=False)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    admin = models.ForeignKey(User, on_delete=models.CASCADE, related_name='events')
    stand = models.ForeignKey(Stand, on_delete=models.CASCADE, null=True)
