from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Test, StudentQueue, DayOfWeek, ResourceCategory, Resource, University, Person
from .serializers import TestSerializer, TestAuthSerializer, StudentQueueSerializer, UniversitySerializer, PersonSerializer, PersonPermissionSerializer
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


# Resources
@permission_classes([IsAuthenticated])
class ResourceDetailsView(APIView):
    def get(self, request, resource_id):
        resources = Resource.objects.get(resource_id=resource_id)
        return Response(resources)

@permission_classes([IsAuthenticated])
class ResourceCategoryView(APIView):
    def get(self, request):
        categories = ResourceCategory.objects.all()
        return Response(categories)


#Student Queue
@permission_classes([IsAuthenticated])
class QueuePositionView(APIView):
    def get (self, request, person_id, format=None):
        student_entry = get_object_or_404(StudentQueue, person_id = person_id)
        student_position = StudentQueue.objects.filter(
            startTime__lt = student_entry.startTime
        ).count() + 1
        return Response(student_position)

@permission_classes([IsAuthenticated])
class StudentQueueView(APIView):
    # GET all students in the queue
    def get (self, request, format=None):
        studentQueue = StudentQueue.objects.all()
        serializer = StudentQueueSerializer(studentQueue, many=True)
        return Response(serializer.data)

    # POST a new student to the queue
    def post (self, request):
        # queueData = request
        serializer = StudentQueueSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    # DELETE a student from the queue
    def delete (self, request, person_id):
        studentQueue = get_object_or_404(StudentQueue, person_id = person_id)
        studentQueue.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#Person
# @permission_classes([IsAuthenticated])
class PersonView(viewsets.ModelViewSet):   
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
      

class PersonPermissionView(RetrieveAPIView):
    # GET person Permissions
    def retrieve(self, request, person_id):
        person = get_object_or_404(Person, id = person_id)
        serializer = PersonPermissionSerializer(person)
        return Response(serializer.data)

#University
@permission_classes([IsAuthenticated])
class UniversitysView(APIView):
    # GET all universities
    def get (self, request, format=None):
        university = University.objects.all()
        serializer = UniversitySerializer(university, many=True)
        return Response(serializer.data)

    # POST a new university
    def post (self, request):
        serializer = UniversitySerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE university
    def delete (self, request, university_id):
        university = get_object_or_404(University, id = university_id)
        university.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)