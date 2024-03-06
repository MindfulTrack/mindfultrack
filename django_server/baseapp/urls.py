from .views import *
from django.urls import path, include
from rest_framework.routers import DefaultRouter

# Create a router and register our ViewSets with it.
router = DefaultRouter()
router.register(r'person', PersonView, basename='person')
router.register(r'universities', UniversitiesView, basename='universities')
router.register(r'studentQueue', StudentQueueView, basename='studentQueue')
router.register(r'studentAvailability', StudentAvailabilityView, basename='studentAvailability')
router.register(r'resourceCategory', ResourceCategoryView, basename='resourceCategory')
router.register(r'resourceDetails', ResourceDetailView, basename='resourceDetails')
router.register(r'leaveQueue', LeaveQueue, basename='leaveQueue')
router.register(r'queueLeaveReason', QueueLeaveReason, basename='queueLeaveReason')

urlpatterns = [
    path('', include(router.urls)),
    path('healthcheck/', healthcheck, name='healthcheck'),
    
    #Tests
    path('test/', TestView.as_view(), name='test'),
    path('testAuth/', TestAuthView.as_view(), name='testAuth'),
    
    #Queue
    path('queuePosition/<int:person_id>/', QueuePositionView.as_view(), name='queuePosition'),
]
