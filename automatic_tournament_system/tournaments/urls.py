from django.urls import path, include
from django.views.generic import TemplateView

from .views import Home
import django.contrib.auth.urls

urlpatterns = [
    path('', Home.as_view(), name='home'),

]