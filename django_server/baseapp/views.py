from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Test, StudentQueue, DayOfWeek, ResourceCategory, Resource
from .serializers import TestSerializer, TestAuthSerializer
from django.shortcuts import get_object_or_404
from datetime import datetime
from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

def healthcheck(request):


    return HttpResponse(request)

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
    
@permission_classes([IsAuthenticated])
class TestAuthView(APIView):
    def get (self, request):
        days = DayOfWeek.objects.all()
        serializer = TestAuthSerializer(days, many=True)
        print(days)
        return Response(serializer.data)


class ResourceDetailsView(APIView):
    def get(self, request, resource_id):
        resources = Resource.objects.get(resource_id=resource_id)
        return Response(resources)

class ResourceCategoryView(APIView):
    def get(self, request):
        categories = ResourceCategory.objects.get()
        return Response(categories)






