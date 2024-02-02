from django.urls import path
from .views import TestView, StudentQueueView

urlpatterns = [
    path('test/', TestView.as_view(), name='test'),
    # Add other URL patterns here...
    path('studentQueue/<int:person_id>/', StudentQueueView.as_view(), name='studentQueue')
]
