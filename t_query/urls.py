"""
URL configuration for t_query project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from events.views import EventViewSet, admin_id_by_login
from stands.views import (StandViewSet, stands_by_event_id, stands_by_user, 
                          users_by_stand, delete_user_from_stand, 
                          get_stand_by_id, add_user_to_stand)
from tgusers.views import TgUserViewSet
from drf_spectacular.views import *
router = routers.SimpleRouter()
router.register(r'event', EventViewSet, basename='event')
router.register(r'stand', StandViewSet)
router.register(r'tguser', TgUserViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api/', include('user.urls')),
    path('api/stands_by_event_id/<int:event_id>', stands_by_event_id),
    path('api/admin_id_by_login/<str:login>', admin_id_by_login),
    path('api/tgreq/stands_by_user/<str:username>', stands_by_user),
    path('api/tgreq/users_by_stand/<int:stand_id>', users_by_stand),
    path('api/tgreq/delete_user_from_stand/<int:stand_id>/<str:username>', delete_user_from_stand),
    path('api/tgreq/get_stand_by_id/<int:stand_id>', get_stand_by_id),
    path('api/tgreq/add_user_to_stand/<str:username>/<int:stand_id>', add_user_to_stand),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

]
