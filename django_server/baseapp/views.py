from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Test, StudentQueue
from .serializers import TestSerializer, StudentQueueSerializer
from django.shortcuts import get_object_or_404
from datetime import datetime

class TestView(APIView):
    def get(self, request):
        tests = Test.objects.all()
        serializer = TestSerializer(tests, many=True)
        return Response(serializer.data)

    
class StudentQueueView(APIView):
    def get (self, request, person_id, format=None):
        student_entry = get_object_or_404(StudentQueue, person_id = person_id)
        student_position = StudentQueue.objects.filter(
            startTime__lt = student_entry.startTime
        ).count() + 1
        return Response(student_position)

