from django.contrib import admin
from baseapp.models import *

# Register your models here.
admin.site.register(Test)
admin.site.register(University)
admin.site.register(ResourceCategory)
admin.site.register(ResourceDetail)
admin.site.register(TimeSlot)
admin.site.register(DayOfWeek)
admin.site.register(Person)
admin.site.register(StudentQueue)
admin.site.register(AvailableTimeSlot)
admin.site.register(QueueLeaveReason)