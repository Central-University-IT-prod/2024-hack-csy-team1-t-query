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
from events.views import EventViewSet
from stands.views import StandViewSet, stands_by_user_id, users_by_stand, delete_user_from_stand, get_stand_by_id
from tgusers.views import TgUserViewSet


router = routers.SimpleRouter()
router.register(r'event', EventViewSet, basename='event')
router.register(r'stand', StandViewSet)
router.register(r'tguser', TgUserViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api/', include('user.urls')),
    path('api/tgreq/stands_by_user/<int:user_id>', stands_by_user_id),
    path('api/tgreq/users_by_stand/<int:stand_id>', users_by_stand),
    path('api/tgreq/delete_user_from_stand/<int:stand_id>/<int:user_id>', delete_user_from_stand),
    path('api/tgreq/get_stand_by_id/<int:stand_id>', get_stand_by_id)
]
