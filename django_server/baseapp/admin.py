from django.contrib import admin
from baseapp.models import Test, PermissionLevel, University, ResourceCategory, Resource
from baseapp.models import TimeSlot, DayOfWeek, Person, StudentQueue, AvailableTimeSlot
from baseapp.models import QueueLeaveReason

# Register your models here.
admin.site.register(Test)
admin.site.register(PermissionLevel)
admin.site.register(University)
admin.site.register(ResourceCategory)
admin.site.register(Resource)
admin.site.register(TimeSlot)
admin.site.register(DayOfWeek)
admin.site.register(Person)
admin.site.register(StudentQueue)
admin.site.register(AvailableTimeSlot)
admin.site.register(QueueLeaveReason)