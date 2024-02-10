from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Test, StudentQueue, DayOfWeek, ResourceCategory, Resource
from .serializers import TestSerializer, TestAuthSerializer, StudentQueueSerializer
from django.shortcuts import get_object_or_404
from datetime import datetime
from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

def healthcheck(request):
    return HttpResponse(request)

#Tests
class TestView(APIView):
    def get(self, request):
        tests = Test.objects.all()
        serializer = TestSerializer(tests, many=True)
        return Response(serializer.data)
    
# @permission_classes([IsAuthenticated])
class TestAuthView(APIView):
    def get (self, request):
        days = DayOfWeek.objects.all()
        serializer = TestAuthSerializer(days, many=True)
        return Response(serializer.data)

#Student Availability    


# Resources
@permission_classes([IsAuthenticated])
class ResourceDetailsView(APIView):
    def get(self, request, resource_id):
        resources = Resource.objects.get(resource_id=resource_id)
        return Response(resources)

# @permission_classes([IsAuthenticated])
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
    
class StudentQueueView(APIView):
    # GET all students in the queue
    print("we at least made it to the api call")
    def get (self, request, format=None):
        studentQueue = StudentQueue.objects.all()
        serializer = StudentQueueSerializer(studentQueue, many=True)
        return Response(serializer.data)

    # POST a new student to the queue

    # DELETE a student from the queue


#Person
    

#University
