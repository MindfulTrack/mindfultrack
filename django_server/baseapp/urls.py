from django.urls import path, include
from .views import TestView, QueuePositionView, healthcheck, TestAuthView

from .views import ResourceDetailsView, ResourceCategoryView, StudentQueueView
from .views import UniversitiesView, PersonView, PersonPermissionView, PersonAvailabilityView
from .views import ResourceDetailsView, ResourceCategoryView, StudentQueueView, UniversitiesView
from .views import StudentQueueDetailsView, StudentAvailabilityView, DayAvailabilityView, TimeAvailabilityView, DayTimeAvailabilityView
from rest_framework.routers import DefaultRouter

# Create a router and register our ViewSets with it.
router = DefaultRouter()
router.register(r'person', PersonView, basename='person')
router.register(r'universities', UniversitiesView, basename='universities')
router.register(r'studentQueue', StudentQueueView, basename='studentQueue')
router.register(r'studentAvailability', StudentAvailabilityView, basename='studentAvailability')

urlpatterns = [
    path('healthcheck/', healthcheck, name='healthcheck'),
    
    #Tests
    path('test/', TestView.as_view(), name='test'),
    path('testAuth/', TestAuthView.as_view(), name='testAuth'),

    #Student Availability
    path('', include(router.urls)),
    # path('personAvailability/<int:person_id>/', PersonAvailabilityView.as_view(), name='personAvailability'),
    # path('dayAvailability/<int:day_id>/', DayAvailabilityView.as_view(), name='dayAvailability'),
    # path('timeAvailability/<int:time_id>/', TimeAvailabilityView.as_view(), name='timeAvailability'),
    # path('daytimeAvailability/<int:day_id>/<int:time_id>/', DayTimeAvailabilityView.as_view(), name='daytimeAvailability'),

    #Resources
    path('resourceDetails/<int:resource_id>', ResourceDetailsView.as_view(), name='resourceDetails'),
    path('resourceCategory/', ResourceCategoryView.as_view(), name='resourceCategory'),

    #Queue
    path('queuePosition/<int:person_id>/', QueuePositionView.as_view(), name='queuePosition'),

    #Person
    path('', include(router.urls)),
    # path('personPermission/<int:person_id>/', PersonPermissionView.as_view(), name='personPermissions'),

    #University
    path('', include(router.urls)),
]
