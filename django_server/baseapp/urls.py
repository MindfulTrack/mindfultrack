from django.urls import path
from .views import TestView, StudentQueueView, healthcheck, TestAuthView

urlpatterns = [
    path('healthcheck/', healthcheck, name='healthcheck'),
    path('test/', TestView.as_view(), name='test'),
    path('studentQueue/<int:person_id>/', StudentQueueView.as_view(), name='studentQueue'),
    path('testAuth/', TestAuthView.as_view(), name='testAuth'),
]
