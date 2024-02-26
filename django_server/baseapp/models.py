from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class PermissionLevel(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class University(models.Model):
    name = models.CharField(max_length=255)
    addressLineOne = models.CharField(max_length=255)
    addressLineTwo = models.CharField(blank=True, null=True, max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=2)
    zip = models.CharField(max_length=5)

    def __str__(self):
        return self.name

class ResourceCategory(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class ResourceDetail(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(blank=True, null=True, max_length=255)
    url = models.CharField(blank=True, null=True, max_length=255)
    image = models.CharField(blank=True, null=True, max_length=255)
    category = models.ForeignKey(ResourceCategory, on_delete=models.SET_NULL, null=True)
    university = models.ForeignKey(University, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class FavoriteResource(models.Model):
    personId = models.ForeignKey(Person, on_delete=models.SET_NULL, null=True)
    resourceId = models.ForeignKey(ResourceDetail, on_delete=models.SET_NULL, null=True)
    favorite = models.BooleanField()

    def __str__(self):
      return self.favorite

class TimeSlot(models.Model):
    startTime = models.TimeField()
    endTime = models.TimeField()

    def __str__(self):
        return str(self.startTime) + " to " + str(self.endTime)
    
class DayOfWeek(models.Model):
    dayOfWeek = models.CharField(max_length=255)

    def __str__(self):
        return self.dayOfWeek

class Person(models.Model):
    person = models.OneToOneField(User, on_delete=models.CASCADE)
    timeSlots = models.ManyToManyField(TimeSlot, through="AvailableTimeSlot")
    university = models.ForeignKey(University, on_delete=models.CASCADE, blank=True, null=True)
    # permissionLevel = models.ForeignKey(PermissionLevel, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.person.first_name + " " + self.person.last_name


class QueueLeaveReason(models.Model):
    leaveReason = models.CharField(max_length=255)

    def __str__(self):
        return self.leaveReason
    
class StudentQueue(models.Model):
    person = models.OneToOneField(User, on_delete=models.CASCADE)
    startTime = models.DateTimeField()
    endTime = models.DateTimeField(blank=True, null=True)
    leaveReason = models.ForeignKey(QueueLeaveReason, on_delete=models.SET_NULL, null=True, blank=True)
    notes = models.CharField(max_length=1048, blank=True, null=True)

    def __str__(self):
        return self.person.last_name + " " + str(self.startTime)
    
class AvailableTimeSlot(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    timeSlot = models.ForeignKey(TimeSlot, on_delete=models.SET_NULL, null=True)
    notes = models.CharField(blank=True, null=True, max_length=255)
    dayOfWeek = models.ForeignKey(DayOfWeek, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.person) + " - " + str(self.timeSlot.startTime)

class CalendarEvent(models.Model):
    title = models.CharField(max_length=255)
    eventLocation = models.CharField(max_length=255)
    backgroundColor = models.CharField(max_length=255)
    allDay = models.BooleanField()
    editable = models.BooleanField()
    oneDayEvent = models.BooleanField()
    start = models.DateTimeField(blank=True, null=True)
    end = models.DateTimeField(blank=True, null=True)
    organizerId = models.ForeignKey(Person, on_delete=models.SET_NULL, null=False)

class eventAttendee(models.Model):
    personId = models.ForeignKey(Person, on_delete=models.SET_NULL, null=False)
    eventId = models.ForeignKey(CalendarEvent, on_delete=models.SET_NULL, null=False)
    









