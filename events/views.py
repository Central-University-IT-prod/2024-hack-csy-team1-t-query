from rest_framework import viewsets
from events.serializers import EventSerializer
from events.models import Event


class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer

    def get_queryset(self):
        user = self.request.user
        
        # Return events that belong to the authenticated user
        return Event.objects.filter(admin=user)