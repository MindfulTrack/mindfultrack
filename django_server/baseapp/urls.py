from django.urls import path, include
from .views import TestView, QueuePositionView, healthcheck, TestAuthView
from .views import ResourceDetailsView, ResourceCategoryView, StudentQueueView
from .views import UniversitysView, PersonView
from rest_framework.routers import DefaultRouter

# Create a router and register our ViewSets with it.
router = DefaultRouter()
router.register(r'person', PersonView, basename='person')

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
    path('studentQueue/<int:person_id>/', StudentQueueView.as_view(), name='studentQueueDelete'),

    #Person
    path('', include(router.urls)),

    #University
    path('university/', UniversitysView.as_view(), name='universitysView'),
    path('university/<int:university_id>/', UniversitysView.as_view(), name='universitysDelete')
]
