import json
from .models import *
from .serializers import *
from .utilities import *
from datetime import datetime, time
import dateutil.relativedelta
from django.http import HttpResponse
from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404, render
from django.db.models import Count, Avg, F

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser 
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions, status, generics, viewsets



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

@permission_classes([IsAuthenticated, StaffPermission])
class TestAuthView(APIView):
    def get (self, request):
        days = DayOfWeek.objects.all()
        serializer = TestAuthSerializer(days, many=True)
        print(days)

        # years = ["Freshman", "Sophomore", "Junior", "Senior", "Graduate"]

        # Person.objects.filter(id = 3136).update(
        #     year_in_school = years[3]
        # )
        return Response(serializer.data)

@permission_classes([IsAuthenticated, StudentPermission])
class LeaveQueue(viewsets.ModelViewSet):
    def create(self, request, *args, **kwargs):
        data = json.loads(request.data)        
        
        studentQueue = StudentQueue.objects.get(person=request.user)
        studentQueue.endTime = datetime.now()
        studentQueue.leaveReason_id = int(data['reasonLeavingId'])
        studentQueue.notes = data['reasonLeavingText'] + (studentQueue.notes if studentQueue.notes else "")
        studentQueue.save()
       

        return Response({'message':'Waitlist Exited'})

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

# @permission_classes([IsAuthenticated])
class FavoriteResourcesView(APIView):

    def get(self, request, format=None):
      filtered_resources = ResourceDetail.objects.filter(favoritedBy__id = request.user.id)
      arrFavoriteResources = []
      for obj in filtered_resources:
        serializer = FavoriteResourcesSerializer(obj)
        arrFavoriteResources.append(serializer.data)
      return Response(arrFavoriteResources)


#Student Queue
@permission_classes([IsAuthenticated, StudentPermission])
class QueuePositionView(APIView):
    def get (self, request, person_id, format=None):
        student_entry = get_object_or_404(StudentQueue, person_id = person_id)
        student_position = StudentQueue.objects.filter(
            startTime__lt = student_entry.startTime
        ).count() #+ 1
        return Response(student_position)

@permission_classes([IsAuthenticated, StudentPermission])
class StudentQueueView(viewsets.ModelViewSet):
    queryset = StudentQueue.objects.all()
    serializer_class = StudentQueueSerializer

    def get (self, request, person_id, format=None):
        student_entry = get_object_or_404(StudentQueue, person_id = person_id)
        student_position = StudentQueue.objects.filter(
            startTime__lt = student_entry.startTime
        ).count() + 1
        return Response(student_position)

    def create(self, request, *args, **kwargs):        
        queueSpot = StudentQueue()
        queueSpot.person_id = request.user.id
        queueSpot.startTime = datetime.now()
        queueSpot.save()
        return Response({'message':'Added to the Queue'})

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
    lookup_field = 'person'

    def create(self, request, *args, **kwargs):
        data = json.loads(request.data)        
        
        person = Person()
        person.person_id = request.user.id
        person.university_id = data['university']
        person.college = data['college']
        person.major = data['major']
        person.year_in_school = int(data['year_in_school'])
        person.age = int(data['age'])
        person.gender = data['gender']
        person.save()
        

        return Response({'message':'Person Saved'})


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

#University
@permission_classes([IsAuthenticated])
class QueueLeaveReasonView(viewsets.ReadOnlyModelViewSet):
    queryset = QueueLeaveReason.objects.all()
    serializer_class = QueueLeaveReasonSerializer

# Dashboard API's
# @permission_classes([IsAuthenticated, AdminPermission])
class DashboardDataView(APIView):
    def get(self, format=None):
        currentQueue = StudentQueue.objects.filter(endTime__isnull=True).count()
        monthExits = StudentQueue.objects.filter(
            endTime__gt = datetime.today().replace(day=1)
        ).exclude(
            leaveReason = 3
        ).count()
        monthServices = StudentQueue.objects.filter(
            endTime__gt = datetime.today().replace(day=1),
            leaveReason = 3
        ).count()
        averageWaitTime = StudentQueue.objects.exclude(
            endTime__isnull = True
        ).aggregate(Avg('queueTime'))
        dashboardData = {
            "currentQueue" : currentQueue,
            "monthExits" : monthExits,
            "monthServices" : monthServices,
            "averageWaitTime" : averageWaitTime["queueTime__avg"],
        }

        return Response(dashboardData)
    
# @permission_classes([IsAuthenticated, AdminPermission])
class PieChartsView(APIView):
    def get(self, format=None):
        leaveReasons = (StudentQueue.objects
            .exclude(leaveReason__isnull=True)
            .values('leaveReason')
            .annotate(count=Count('leaveReason'))
            .order_by()
        )
        collegesData = (Person.objects
            .values('college')
            .annotate(count=Count('college'))
            .order_by()
        )
        genderData = (Person.objects
            .values('gender')
            .annotate(count=Count('gender'))
            .order_by()
        )
        yearData = (Person.objects
            .values('year_in_school')
            .annotate(count=Count('year_in_school'))
            .order_by()            
        )
        returnReasons = []
        returnCounts = []
        colleges = []
        collegeCounts = []
        genders = []
        genderCounts = []
        years = []
        yearCounts = []
        for row in genderData:
            if row['count'] > 0:
                genders.append(row['gender'])
                genderCounts.append(row['count'])
        for row in collegesData:
            if row['count'] > 0:
                colleges.append(row['college'])
                collegeCounts.append(row['count'])
        for x in leaveReasons:
            if x['leaveReason'] != "None":
                x['leaveReason'] = QueueLeaveReason.objects.get(id = x['leaveReason'])
                serializer = QueueLeaveReasonSerializer(x['leaveReason'])
                x['leaveReason'] = serializer.data
                returnReasons.append(x['leaveReason']['leaveReason'])
                returnCounts.append(x['count'])
        for row in yearData:
            if row['count'] > 0:
                years.append(row['year_in_school'])
                yearCounts.append(row['count'])
        returnData = {
            "reasons" : returnReasons,
            "leaveCounts" : returnCounts,
            "colleges" : colleges,
            "collegeCounts": collegeCounts,
            "genders" : genders,
            "genderCounts" : genderCounts,
            "years" : years,
            "yearCounts" : yearCounts,
        }
        return Response(returnData)
    
class LineChartDataView(APIView):
    def get(self, format=None):
        chartData = []
        monthStart = datetime.today().replace(day=1)
        monthStart = datetime.combine(monthStart, time.min)
        for x in range(12):
            monthData = StudentQueue.objects.filter(
                startTime__gte = monthStart + dateutil.relativedelta.relativedelta(months=-x),
                startTime__lt = monthStart + dateutil.relativedelta.relativedelta(months=-(x-1))
            ).count()
            chartData.insert(0, monthData)
            print("Month Number: " + str(monthData))
            print(chartData)
        
        return Response(chartData)


## SIGNING 

from django.core import signing
def generate_signature(signValue):
    # Replace 'your-bucket-name' with your S3 bucket name
    signer = signing.TimestampSigner()
    value = signer.sign_object({'value': signValue})
    print(value)
    return value


def sendSignedUrl(request, signature):
    signature = generate_signature(signature)
    sender = MessageSender('jwdonaldson99@gmail.com')
    sender.send_email(
        subject="Test Signed url",
        message="Try the action below to see if it works!",
        presigned_url="http://localhost:8000/api/base/testVerifyUrl/"+signature,
    )
    return JsonResponse({})


def testVerifyUrl(request, signature):
    signer = signing.TimestampSigner()
    try:
        ## Signed url only valid for 24 hours
        signatureObject = signer.unsign_object(signature, max_age=86400)
        print(signatureObject)
    except signing.BadSignature:
        print("Tampering detected!")
    return JsonResponse({})
    