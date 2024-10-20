from django.db import models


class TgUser(models.Model):
    telegram_login = models.CharField(max_length=256, null=False, blank=False)
