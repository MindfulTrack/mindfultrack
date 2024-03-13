from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Test(models.Model):
    id = models.BigAutoField(primary_key=True)
    student = models.CharField(blank=True, null=True, max_length=255)
    appointment = models.CharField(blank=True, null=True, max_length=255)

    class Meta:
        managed = False
        db_table = 'test'

class University(models.Model):
    name = models.CharField(max_length=255)
    addressLineOne = models.CharField(max_length=255)
    addressLineTwo = models.CharField(blank=True, null=True, max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=2) 
    zipCode = models.CharField(max_length=5)

    class Meta:
        managed = False
        db_table = 'baseapp_university'
    def __str__(self):
        return self.name

class TimeSlot(models.Model):
    startTime = models.TimeField()
    endTime = models.TimeField()
    dayOfWeek = models.CharField(max_length=255)
    class Meta:
        managed = False
        db_table = 'baseapp_timeslot'
    def __str__(self):
        return str(self.startTime) + " to " + str(self.endTime)
    
class DayOfWeek(models.Model):
    dayOfWeek = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'baseapp_dayofweek'

    def __str__(self):
        return self.dayOfWeek

class Person(models.Model):
    id = models.BigAutoField(primary_key=True)
    person = models.OneToOneField(User, db_column="user_id", on_delete=models.CASCADE)
    events = models.ManyToManyField("CalendarEvent")
    university = models.ForeignKey(University, on_delete=models.CASCADE, blank=True, null=True)
    gender = models.CharField(blank=True, null=True, max_length=1)
    age = models.IntegerField(blank=True, null=True)
    year_in_school = models.IntegerField(blank=True, null=True)
    college = models.CharField(blank=True, null=True)
    major = models.CharField(blank=True, null=True)

    def __str__(self):
        return self.person.first_name + " " + self.person.last_name

    

class QueueLeaveReason(models.Model):
    leaveReason = models.CharField(max_length=255)

    def __str__(self):
        return self.leaveReason

    class Meta:
        managed = False
        db_table = 'baseapp_queueleavereason'
    
class StudentQueue(models.Model):
    id = models.AutoField(primary_key=True)
    person = models.OneToOneField(User, db_column="user_id", on_delete=models.CASCADE, related_name="student_queue")
    startTime = models.DateTimeField()
    endTime = models.DateTimeField(blank=True, null=True)
    queueTime = models.BigIntegerField(blank=True, null=True)
    leaveReason = models.ForeignKey(QueueLeaveReason, on_delete=models.SET_NULL, null=True, blank=True)
    notes = models.CharField(max_length=1048, blank=True, null=True)
   
    def __str__(self):
        return self.person.last_name + " " + str(self.startTime)

    def inQueue(self):
        if self.startTime:
            if self.endTime is None:
                return True
            
        return False

class AvailableTimeSlot(models.Model):
    id = models.AutoField(primary_key=True)
    person = models.ForeignKey(User, db_column="user_id", related_name="availblity", on_delete=models.CASCADE)
    timeSlot = models.ForeignKey(TimeSlot, on_delete=models.SET_NULL, null=True)
    dayOfWeek = models.CharField(blank=True, null=True, max_length=255)

    def __str__(self):
        return str(self.person.id) + " - " + str(self.timeSlot.startTime)

class ResourceCategory(models.Model):
    name = models.CharField(max_length=255)
    image = models.CharField(max_length=500, default='https://picsum.photos/id/147/2000/1700')

    class Meta:
            managed = False
            db_table = 'baseapp_resourcecategory'

    def __str__(self):
        return self.name

class ResourceDetail(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(blank=True, null=True, max_length=255)
    url = models.CharField(blank=True, null=True, max_length=500)
    category = models.ForeignKey(ResourceCategory, on_delete=models.CASCADE, null=True)
    university = models.ForeignKey(University, on_delete=models.CASCADE)
    favoritedBy = models.ManyToManyField(User, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'baseapp_resourcedetail'
    def __str__(self):
        return self.name

class CalendarEvent(models.Model):
    title = models.CharField(max_length=255)
    eventLocation = models.CharField(max_length=255)
    backgroundColor = models.CharField(max_length=255)
    allDay = models.BooleanField()
    editable = models.BooleanField()
    oneDayEvent = models.BooleanField()
    start = models.DateTimeField(blank=True, null=True)
    end = models.DateTimeField(blank=True, null=True)
    organizer = models.ForeignKey(Person, on_delete=models.SET_NULL, null=True)
    









