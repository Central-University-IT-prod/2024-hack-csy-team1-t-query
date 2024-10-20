from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from stands.serializers import StandSerializer
from stands.models import Stand
from stands.serializers import StandSerializer
from tgusers.serializers import TgUserSerializer


class StandViewSet(viewsets.ModelViewSet):
    serializer_class = StandSerializer
    queryset = Stand.objects.all()


@api_view(['GET'])
@permission_classes([AllowAny])
def stands_by_user_id(request, username):
    try:
        return Response(StandSerializer(Stand.objects.filter(user__telegram_login=username), many=True).data)
    except:
        return Response("no user", status=400)


@api_view(["GET"])
@permission_classes([AllowAny])
def get_stand_by_id(request, stand_id):
    try:
        return Response(StandSerializer(Stand.objects.get(pk=stand_id)).data)
    except:
        return Response("no stand", status=400)


@api_view(['GET'])
@permission_classes([AllowAny])
def users_by_stand(request, stand_id):
    try:
        return Response(TgUserSerializer(Stand.objects.get(pk=stand_id).user.all(), many=True).data)
    except:
        return Response("no stand", status=400)


@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_user_from_stand(request, username, stand_id):
    try:
        Stand.objects.get(pk=stand_id).user.get(telegram_login=username).delete()
        return Response("ok", status=200)
    except:
        return Response("no user or stand", status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def add_user_to_stand(request, username, stand_id):
    try:
        Stand.objects.get(pk=stand_id).user.create(telegram_login=username)
        return Response("ok", status=200)
    except:
        return Response("no user or stand", status=400)
