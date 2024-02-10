from django.urls import path
from .views import TestView, QueuePositionView, healthcheck, TestAuthView
from .views import ResourceDetailsView, ResourceCategoryView, StudentQueueView


urlpatterns = [
    path('healthcheck/', healthcheck, name='healthcheck'),
    
    #Tests
    path('test/', TestView.as_view(), name='test'),
    path('testAuth/', TestAuthView.as_view(), name='testAuth'),

    #Student Availability

    #Resources
    path('resourceDetails/<int:resource_id>', ResourceDetailsView.as_view(), name='resourceDetails'),
    path('resourceCategory/', ResourceCategoryView.as_view(), name='resourceCategory'),

    #Queue
    path('queuePosition/<int:person_id>/', QueuePositionView.as_view(), name='queuePosition'),
    path('studentQueue/', StudentQueueView.as_view(), name='studentQueue'),

    #Person

    #University
    
]
