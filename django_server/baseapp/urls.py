from django.urls import path, include
from .views import TestView, QueuePositionView, healthcheck, TestAuthView
from .views import UniversitiesView, PersonView
from .views import ResourceDetailView, ResourceCategoryView, StudentQueueView, UniversitiesView
from .views import StudentQueueDetailsView, StudentAvailabilityView
from .views import FavoriteResourcesView
from rest_framework.routers import DefaultRouter

# Create a router and register our ViewSets with it.
router = DefaultRouter()
router.register(r'person', PersonView, basename='person')
router.register(r'universities', UniversitiesView, basename='universities')
router.register(r'studentQueue', StudentQueueView, basename='studentQueue')
router.register(r'studentAvailability', StudentAvailabilityView, basename='studentAvailability')
router.register(r'resourceCategory', ResourceCategoryView, basename='resourceCategory')
router.register(r'resourceDetails', ResourceDetailView, basename='resourceDetails')
router.register(r'favoriteResources', FavoriteResourcesView, basename='favoriteResources')

urlpatterns = [
    path('', include(router.urls)),
    path('healthcheck/', healthcheck, name='healthcheck'),
    
    #Tests
    path('test/', TestView.as_view(), name='test'),
    path('testAuth/', TestAuthView.as_view(), name='testAuth'),

    #Student Availability

    #Resources
    # path('favoriteResources', FavoriteResourcesView.as_view(), name='favoriteResources'),
    #Queue
    path('queuePosition/<int:person_id>/', QueuePositionView.as_view(), name='queuePosition'),

    #Person

    #University
]
