from rest_framework import serializers
from events.models import Stand


class StandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stand
        fields = '__all__'