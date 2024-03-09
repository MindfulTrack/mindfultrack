import random
from faker import Faker
from baseapp.models import *
from django.db import transaction
from django.contrib.auth.models import User, Group
from django.core.management.base import BaseCommand
# Colleges within a university and their majors
colleges_within_university = [
    {
        "name": "College of Life Sciences",
        "majors": ["Biochemistry", "Genetics", "Ecology"]
    },
    {
        "name": "College of Arts and Humanities",
        "majors": ["English Literature", "History", "Philosophy"]
    },
    {
        "name": "College of Engineering",
        "majors": ["Mechanical Engineering", "Civil Engineering", "Chemical Engineering"]
    },
    {
        "name": "Business School",
        "majors": ["Finance", "Marketing", "Entrepreneurship"]
    },
    {
        "name": "College of Health Sciences",
        "majors": ["Nursing", "Public Health", "Physical Therapy"]
    },
    {
        "name": "Fine Arts College",
        "majors": ["Fine Arts", "Music", "Theater Arts"]
    },
    {
        "name": "Environmental Studies Institute",
        "majors": ["Environmental Science", "Conservation Biology", "Geology"]
    },
    {
        "name": "College of Mathematics and Computer Science",
        "majors": ["Mathematics", "Statistics", "Data Science", "Computer Science"]
    }
]
college_major_dict = {college["name"]: college["majors"] for college in colleges_within_university}

class Command(BaseCommand):
    help = "Execute custom script"

    def handle(self, *args, **options):
        with transaction.atomic():
            fake = Faker()

            # Create Universities
            for _ in range(10):
                University.objects.create(
                    name="University of " + fake.name(),
                    addressLineOne=fake.street_address(),
                    city=fake.city(),
                    state=fake.state_abbr(),
                    zipCode=fake.postcode(),
                )

            # Staff
            counselorObjects = []
            for _ in range(30):
                user = User.objects.create_user(
                    first_name=fake.first_name(),
                    last_name=fake.last_name(),
                    email=fake.email(),
                    password=fake.password(),
                    username=fake.unique.user_name(),
                )
                my_group = Group.objects.get(name="Staff")

                # Add the user to the group
                my_group.user_set.add(user)

                Person.objects.create(person=user, university_id=fake.random_int(min=1, max=10))
                counselorObjects.append(user.person)

            ## Create Students
            count = 1
            ## 1000 in queue, 500, left, 50 signed up but never joined queue
            for _ in range(1550):
                user = User.objects.create_user(
                    first_name=fake.first_name(),
                    last_name=fake.last_name(),
                    email=fake.email(),
                    password=fake.password(),
                    username=fake.unique.user_name(),
                )

                my_group = Group.objects.get(name="Student")

                # Add the user to the group
                my_group.user_set.add(user)

                random_college = random.choice(list(college_major_dict.keys()))
                random_major = random.choice(college_major_dict[random_college])

                Person.objects.create(
                    person=user, 
                    university_id=fake.random_int(min=1, max=10),
                    college=random_college,
                    major=random_major,
                    gender = random.choice(['M', 'F'])
                    )
                
                ## ADD AVAILBILITY
                for _ in range(20):
                    AvailableTimeSlot.objects.create(
                            person=user,
                            timeSlot_id=fake.random_int(min=1, max=24),
                            dayOfWeek=random.choice(
                                [
                                    "Monday",
                                    "Tuesday",
                                    "Wednesday",
                                    "Thursday",
                                    "Friday",
                                    "Saturday",
                                    "Sunday",
                                ]
                            ),
                        )

                if count <= 500:
                    time1 = fake.date_time_this_month(
                            before_now=True, after_now=False
                        )
                    time2 = fake.date_time_this_month(
                            before_now=False, after_now=True
                        )
                    daysBetween = time2 - time1
                    StudentQueue.objects.create(
                        person=user,
                        startTime=time1,
                        endTime=time2,
                        queueTime=daysBetween.days,
                        leaveReason_id=fake.random_int(min=1, max=4),
                        notes=fake.text(),
                    )

                    ### ADD IN CALENDAR EVENT
                    calendar = CalendarEvent.objects.create(
                        title=fake.text(),
                        eventLocation=fake.address(),
                        allDay=fake.pybool(),
                        oneDayEvent=fake.pybool(),
                        editable=fake.pybool(),
                    )

                    calendar.person_set.add(user.person)
                    calendar.person_set.add(random.choice(counselorObjects))
                    calendar.organizer = random.choice(counselorObjects)
                    calendar.save()

                elif count > 500 and count <= 1500:

                    StudentQueue.objects.create(
                        person=user,
                        startTime=fake.date_time_this_month(
                            before_now=True, after_now=True
                        ),
                        notes=fake.text(),
                    )

                    

                count += 1
