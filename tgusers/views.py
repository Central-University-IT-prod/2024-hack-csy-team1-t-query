from rest_framework import viewsets
from tgusers.serializers import TgUserSerializer
from rest_framework.response import Response
from tgusers.models import TgUser
from rest_framework.decorators import api_view
from tgusers.serializers import TgUserSerializer


class TgUserViewSet(viewsets.ModelViewSet):
    serializer_class = TgUserSerializer
    queryset = TgUser.objects.all()


@api_view(['GET'])
def users_by_stand(request, stand_id):
    return Response(TgUserSerializer(TgUser.objects.filter(stand=stand_id), many=True))