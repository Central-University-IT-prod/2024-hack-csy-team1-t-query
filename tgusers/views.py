from rest_framework import viewsets
from tgusers.serializers import TgUserSerializer
from rest_framework.response import Response
from tgusers.models import TgUser
from rest_framework.decorators import api_view
from tgusers.serializers import TgUserSerializer


class TgUserViewSet(viewsets.ModelViewSet):
    serializer_class = TgUserSerializer
    queryset = TgUser.objects.all()
