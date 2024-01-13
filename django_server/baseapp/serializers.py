from rest_framework import serializers
from .models import Test

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = '__all__'  # Or specify the fields you want to include in your API.
