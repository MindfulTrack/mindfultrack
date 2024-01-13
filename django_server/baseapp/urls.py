from django.urls import path
from .views import TestView

urlpatterns = [
    path('test/', TestView.as_view(), name='test'),
    # Add other URL patterns here...
]
