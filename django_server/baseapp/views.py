from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Test, StudentQueue, DayOfWeek, ResourceCategory, ResourceDetail, University, Person, AvailableTimeSlot
from django.contrib.auth.models import User

from .serializers import TestSerializer, TestAuthSerializer, StudentQueueSerializer
from .serializers import UniversitySerializer, PersonSerializer, FavoriteResourcesSerializer
from .serializers import PersonPermissionSerializer, StudentAvailabilitySerializer
from .serializers import ResourceCategorySerializer, ResourceDetailSerializer

from django.shortcuts import get_object_or_404
from datetime import datetime
from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status, generics, viewsets

from rest_framework.generics import RetrieveAPIView

class AdminPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name='Admin').exists()
class StaffPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name__in=['Admin', 'Staff']).exists()
class StudentPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name__in=['Admin', 'Staff', 'Student']).exists()

## USED FOR AWS TO VALIDATE THE INSTANCE IS HEALTHY
def healthcheck(request):

    return HttpResponse(request)

#Tests
class TestView(APIView):
    def get(self, request):
        tests = Test.objects.all()
        serializer = TestSerializer(tests, many=True)
        return Response(serializer.data)

@permission_classes([IsAuthenticated])
class StudentQueueView(APIView):
    def get (self, request, person_id, format=None):
        student_entry = get_object_or_404(StudentQueue, person_id = person_id)
        student_position = StudentQueue.objects.filter(
            startTime__lt = student_entry.startTime
        ).count() + 1
        return Response(student_position)
    
@permission_classes([IsAuthenticated, StaffPermission])
class TestAuthView(APIView):
    def get (self, request):
        days = DayOfWeek.objects.all()
        serializer = TestAuthSerializer(days, many=True)
        print(days)
        return Response(serializer.data)

#Student Availability    
@permission_classes([IsAuthenticated])
class StudentAvailabilityView(viewsets.ModelViewSet):   
    queryset = AvailableTimeSlot.objects.all()
    serializer_class = StudentAvailabilitySerializer

# RESOURCES
@permission_classes([IsAuthenticated])
class ResourceDetailView(viewsets.ModelViewSet):
  queryset = ResourceDetail.objects.all()
  serializer_class = ResourceDetailSerializer

@permission_classes([IsAuthenticated])
class ResourceCategoryView(viewsets.ModelViewSet):
    queryset = ResourceCategory.objects.all()
    serializer_class = ResourceCategorySerializer

@permission_classes([IsAuthenticated])
class FavoriteResourcesView(viewsets.ModelViewSet):
    queryset = ResourceDetail.objects.all()
    serializer_class = FavoriteResourcesSerializer


#Student Queue
@permission_classes([IsAuthenticated, StudentPermission])
class QueuePositionView(APIView):
    def get (self, request, person_id, format=None):
        student_entry = get_object_or_404(StudentQueue, person_id = person_id)
        student_position = StudentQueue.objects.filter(
            startTime__lt = student_entry.startTime
        ).count() + 1
        return Response(student_position)

@permission_classes([IsAuthenticated, StaffPermission])
class StudentQueueView(viewsets.ModelViewSet):
    queryset = StudentQueue.objects.all()
    serializer_class = StudentQueueSerializer


# Details API
@permission_classes([IsAuthenticated])
class StudentQueueDetailsView(APIView):
    # PUT - save changes to a student - including adding reason why the student left the queue
    def put (self, request, id):
        queue = get_object_or_404(StudentQueue, id = id)
        serializer = StudentQueueSerializer(queue, data = request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        print(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE a student from the queue
    def delete (self, request, id):
        studentQueue = get_object_or_404(StudentQueue, id = id)
        studentQueue.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#Person
@permission_classes([IsAuthenticated])
class PersonView(viewsets.ModelViewSet):   
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
      
# class PersonPermissionView(RetrieveAPIView):
#     # GET person Permissions
#     def retrieve(self, request, person_id):
#         person = get_object_or_404(Person, id = person_id)
#         serializer = PersonPermissionSerializer(person)
#         return Response(serializer.data)

#University
@permission_classes([IsAuthenticated])
class UniversitiesView(viewsets.ModelViewSet):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer
    # permission_classes = [IsAuthenticated]



### LOGIC FOR SCHEDULING ###
    ## DISPLAY