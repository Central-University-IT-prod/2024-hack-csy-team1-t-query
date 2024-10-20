from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from stands.serializers import StandSerializer
from stands.models import Stand
from tgusers.models import TgUser
from stands.serializers import StandSerializer
from tgusers.serializers import TgUserSerializer
from drf_spectacular.utils import *


@extend_schema_view(
    list=extend_schema(
        summary="Получить список всех стендов",
        description=(
                "Возвращает список всех доступных стендов на платформе. "
                "Этот метод позволяет получить информацию о каждом стенде, включая его название, описание "
                "и другие связанные данные. Поддерживает пагинацию и фильтрацию при необходимости."
        )
    ),
    create=extend_schema(
        summary="Создать новый стенд",
        description=(
                "Создает новый стенд с указанными данными. В теле запроса необходимо передать "
                "все необходимые данные для создания стенда, такие как название, описание, "
                "событие, и другие параметры. В случае успешного выполнения возвращает данные созданного стенда."
        )
    ),
    retrieve=extend_schema(
        summary="Получить информацию о конкретном стенде",
        description=(
                "Возвращает детальную информацию о стенде по его уникальному идентификатору (ID). "
                "Может использоваться для получения всех данных стенда, таких как название, описание, "
                "список связанных пользователей и другие атрибуты."
        )
    ),
    update=extend_schema(
        summary="Полное обновление существующего стенда",
        description=(
                "Обновляет все поля существующего стенда, заменяя текущие данные новыми значениями. "
                "Требуется передать все необходимые данные стенда в теле запроса. "
                "Этот метод полностью заменяет существующую запись новым набором данных."
        )
    ),
    partial_update=extend_schema(
        summary="Частичное обновление стенда",
        description=(
                "Позволяет обновить только некоторые поля существующего стенда. "
                "Отправьте только те данные, которые необходимо изменить. Частичное обновление не требует "
                "указания всех полей стенда, как в полном обновлении."
        )
    ),
    destroy=extend_schema(
        summary="Удалить стенд по ID",
        description=(
                "Удаляет стенд по его уникальному идентификатору (ID). Этот метод полностью удаляет запись "
                "из базы данных, и она больше не будет доступна. Будьте осторожны при использовании этого метода, "
                "так как это действие необратимо."
        )
    ),
)
class StandViewSet(viewsets.ModelViewSet):
    serializer_class = StandSerializer
    queryset = Stand.objects.all()


@extend_schema(
    summary="Получение стендов по ID события",
    description="Возвращает список стендов, связанных с указанным ID события."
)
@api_view(['GET'])
def stands_by_event_id(request, event_id):
    try:
        return Response(StandSerializer(Stand.objects.filter(event=event_id), many=True).data)
    except:
        return Response("no event", status=400)


@extend_schema(
    summary="Получение стендов по имени пользователя",
    description="Возвращает список стендов, связанных с пользователем, используя его Telegram логин."
)
@api_view(['GET'])
@permission_classes([AllowAny])
def stands_by_user(request, username):
    try:
        return Response(StandSerializer(Stand.objects.filter(user__telegram_login=username), many=True).data)
    except:
        return Response("no user", status=400)


@extend_schema(
    summary="Получение информации о стенде по его ID",
    description="Возвращает информацию о конкретном стенде по его ID."
)
@api_view(["GET"])
@permission_classes([AllowAny])
def get_stand_by_id(request, stand_id):
    try:
        return Response(StandSerializer(Stand.objects.get(pk=stand_id)).data)
    except:
        return Response("no stand", status=400)


@extend_schema(
    summary="Получение пользователей стенда",
    description="Возвращает список пользователей, связанных с указанным стендом."
)
@api_view(['GET'])
@permission_classes([AllowAny])
def users_by_stand(request, stand_id):
    try:
        return Response(TgUserSerializer(Stand.objects.get(pk=stand_id).user.all(), many=True).data)
    except:
        return Response("no stand", status=400)


@extend_schema(
    summary="Удаление пользователя из стенда",
    description="Удаляет пользователя из указанного стенда по Telegram логину и ID стенда."
)
@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_user_from_stand(request, username, stand_id):
    try:
        user = TgUser.objects.get(telegram_login=username)
        Stand.objects.get(pk=stand_id).user.remove(user)
        return Response("ok", status=200)
    except:
        return Response("no user or stand", status=400)


@extend_schema(
    summary="Добавление пользователя в стенд",
    description="Добавляет пользователя в указанный стенд по Telegram логину и ID стенда. Если пользователь не существует, он будет создан."
)
@api_view(['POST'])
@permission_classes([AllowAny])
def add_user_to_stand(request, username, stand_id):
    try:
        user = TgUser.objects.get(telegram_login=username)
    except TgUser.DoesNotExist:
        user = TgUser.objects.create(telegram_login=username)
    try:
        Stand.objects.get(pk=stand_id).user.add(user)
        return Response("ok", status=200)
    except:
        return Response("no user or stand", status=400)
