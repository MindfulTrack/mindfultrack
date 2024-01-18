from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Test
from .serializers import TestSerializer

class TestView(APIView):
    def get(self, request):
        tests = Test.objects.all()
        serializer = TestSerializer(tests, many=True)
        return Response(serializer.data)
