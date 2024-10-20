from rest_framework import viewsets
from events.serializers import EventSerializer
from events.models import Event
from drf_spectacular.utils import *

@extend_schema_view(
    list=extend_schema(
        summary="Получить список событий",
    ),
    create=extend_schema(
        summary="Создание нового события",
    ),
    retrieve=extend_schema(
        summary="Получение информации о событии",
    ),
    update=extend_schema(
        summary="Изменение существующего события по id",
    ),
    partial_update=extend_schema(
        summary="Изменение части информации о событии",
    ),
    destroy=extend_schema(
        summary="Удаление события",
    ),
)
class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    queryset = Event.objects.all()

