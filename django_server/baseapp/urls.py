from .views import *
from .utilities import *
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
router.register(r'queueLeaveReason', QueueLeaveReasonView, basename='queueLeaveReason')
# router.register(r'favoriteResources', FavoriteResourcesView, basename='favoriteResources')

urlpatterns = [
    path('', include(router.urls)),
    path('healthcheck/', healthcheck, name='healthcheck'),

    path('favoriteResources/', FavoriteResourcesView.as_view(), name='favoriteResources'),
    
    #Tests
    path('testAuth/', TestAuthView.as_view(), name='testAuth'),

    #Queue
    path('queuePosition/<int:person_id>/', QueuePositionView.as_view(), name='queuePosition'),

    #Dashboard
    # path('currentQueue/', CurrentQueueView.as_view(), name='currentQueue'),
    # path('currentMonthExits/', CurrentMonthExitsView.as_view(), name='currentMonthExits'),
    # path('currentMonthReceivedServices/', CurrentMonthReceiveServicesView.as_view(), name='currentMonthReceivedServices'),
    path('lineChartData/', LineChartDataView.as_view(), name='lineChartData'),
    path('dashboardData/', DashboardDataView.as_view(), name='dashboardData'),
    path('pieChartData/', PieChartsView.as_view(), name='pieChartData'),
    path('pieChartData/', PieChartsView.as_view(), name='pieChartData'),
    
    path('testVerifyUrl/<str:signature>', testVerifyUrl, name='testVerifyUrl'),
    path('sendSignedUrl/<str:signature>', sendSignedUrl, name='sendSignedUrl'),
    
]
