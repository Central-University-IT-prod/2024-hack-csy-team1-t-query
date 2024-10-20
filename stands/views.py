from rest_framework import viewsets
from stands.serializers import StandSerializer
from stands.models import Stand
from drf_spectacular.utils import *
@extend_schema_view(
    list=extend_schema(
        summary="Получить список стендов",
    ),
    create=extend_schema(
        summary="Создание нового стенда",
    ),
    retrieve=extend_schema(
        summary="Получение информации о стенде",
    ),
    update=extend_schema(
        summary="Изменение существующего стенда по id",
    ),
    partial_update=extend_schema(
        summary="Изменение части информации стенда",
    ),
    destroy=extend_schema(
        summary="Удаление стенда",
    ),
)
class StandViewSet(viewsets.ModelViewSet):
    serializer_class = StandSerializer
    queryset = Stand.objects.all()