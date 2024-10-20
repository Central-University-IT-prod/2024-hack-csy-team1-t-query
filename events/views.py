from rest_framework import viewsets
from events.serializers import EventSerializer
from rest_framework.decorators import api_view, permission_classes
from events.models import Event
from rest_framework.response import Response
from django.contrib.auth.models import User
from drf_spectacular.utils import *


@extend_schema_view(
    list=extend_schema(
        summary="Получить список событий",
        description=(
                "Возвращает список всех событий, зарегистрированных в системе. "
                "Этот метод поддерживает пагинацию, фильтрацию и сортировку при необходимости. "
                "Используйте данный метод для получения информации о всех событиях, таких как их название, дата проведения, "
                "место и другие связанные данные."
        )
    ),
    create=extend_schema(
        summary="Создать новое событие",
        description=(
                "Создает новое событие с переданными данными. В теле запроса необходимо указать всю необходимую информацию "
                "для создания события, такую как название, дата, место проведения и другие атрибуты. "
                "В случае успешного выполнения возвращает данные созданного события."
        )
    ),
    retrieve=extend_schema(
        summary="Получить информацию о событии",
        description=(
                "Возвращает подробную информацию о событии по его уникальному идентификатору (ID). "
                "Этот метод можно использовать для получения всех данных о конкретном событии, таких как название, "
                "дата проведения, место, список участников и другие связанные данные."
        )
    ),
    update=extend_schema(
        summary="Полное обновление существующего события",
        description=(
                "Полностью обновляет данные существующего события по его уникальному идентификатору (ID). "
                "Все текущие данные события будут заменены новыми значениями, переданными в теле запроса. "
                "Необходимо передать все обязательные поля события для выполнения полного обновления."
        )
    ),
    partial_update=extend_schema(
        summary="Частичное обновление информации о событии",
        description=(
                "Частично обновляет данные существующего события по его уникальному идентификатору (ID). "
                "Позволяет обновлять только отдельные поля события, не затрагивая остальные данные. "
                "Это удобно, когда требуется внести небольшие изменения, не изменяя всю запись."
        )
    ),
    destroy=extend_schema(
        summary="Удаление события",
        description=(
                "Удаляет событие по его уникальному идентификатору (ID). "
                "После выполнения этого действия событие будет полностью удалено из системы, и его данные больше не будут доступны. "
                "Будьте осторожны при использовании этого метода, так как удаление является необратимым."
        )
    ),
)
class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer

    def get_queryset(self):
        user = self.request.user

        # Return events that belong to the authenticated user
        return Event.objects.filter(admin=user)


@api_view(["GET"])
def admin_id_by_login(request, login):
    try:
        return Response(User.objects.get(username=login).pk, status=200)
    except:
        return Response("no admin", status=400)
