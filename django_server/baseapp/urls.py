from django.urls import path, include
from .views import TestView, QueuePositionView, healthcheck, TestAuthView

from .views import ResourceDetailsView, ResourceCategoryView, StudentQueueView
from .views import UniversitiesView, PersonView, PersonPermissionView
from .views import ResourceDetailsView, ResourceCategoryView, StudentQueueView, UniversitiesView, StudentQueueDetailsView
from rest_framework.routers import DefaultRouter

# Create a router and register our ViewSets with it.
router = DefaultRouter()
router.register(r'person', PersonView, basename='person')
router.register(r'universities', UniversitiesView, basename='universities')
router.register(r'studentQueue', StudentQueueView, basename='studentQueue')

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

    #Person
    path('', include(router.urls)),
    path('personPermission/<int:person_id>/', PersonPermissionView.as_view(), name='personPermissions'),

    #University
    path('', include(router.urls)),
]
