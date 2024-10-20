from rest_framework import viewsets
from tgusers.serializers import TgUserSerializer
from tgusers.models import TgUser
from drf_spectacular.utils import *


@extend_schema_view(
    list=extend_schema(
        summary="Получить список пользователей",
    ),
    create=extend_schema(
        summary="Создание нового пользователя",
    ),
    retrieve=extend_schema(
        summary="Получение информации о пользователе",
    ),
    update=extend_schema(
        summary="Изменение существующего пользователя по id",
    ),
    partial_update=extend_schema(
        summary="Изменение части информации пользователя",
    ),
    destroy=extend_schema(
        summary="Удаление пользователя",
    ),
)
class TgUserViewSet(viewsets.ModelViewSet):
    serializer_class = TgUserSerializer
    queryset = TgUser.objects.all()
