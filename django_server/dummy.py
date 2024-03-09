from faker import Faker
from .models import *
from django.contrib.auth.models import User, Group

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
        username=fake.username(),
    )
    my_group = Group.objects.get(name="Staff")

    # Add the user to the group
    my_group.user_set.add(user)

    Person.object.create(person=user, university_id=fake.random_int(min=1, max=10))
    counselorObjects.append(user)

## Create Students
count = 1
## 1000 in queue, 500, left, 50 signed up but never joined queue
for _ in range(1550):
    user = User.objects.create_user(
        first_name=fake.first_name(),
        last_name=fake.last_name(),
        email=fake.email(),
        password=fake.password(),
        username=fake.username(),
    )

    ## CREATE FAVORITE RESOURCES
    FavoriteResource.objects.create(
        person=user, resourceDetail_id=fake.random_int(min=1, max=21), favorite=True
    )

    my_group = Group.objects.get(name="Student")

    # Add the user to the group
    my_group.user_set.add(user)

    Person.object.create(person=user, university_id=fake.random_int(min=1, max=10))
    
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
        StudentQueue.objects.create(
            person=user,
            startTime=fake.date_time_this_month(
                before_today=True, after_today=False, tzinfo="MST"
            ),
            endTime=fake.date_time_this_month(
                before_today=False, after_today=True, tzinfo="MST"
            ),
            leaveReason_id=fake.random_int(min=1, max=4),
            notes=fake.text(),
        )

        ### ADD IN CALENDAR EVENT
        calendar = CalendarEvent.objects.create(
            title=faker.text(),
            eventLocatin=faker.address(),
            allDay=faker.pybool(),
            oneDayEvent=faker.pybool(),
            editable=faker.pybool(),
        )

        calendar.persons.add(user)
        calendar.persons.add(random.choice(counselorObjects))
        calendar.organizer = random.choice(counselorObjects)
        calendar.save()

    elif count > 500 and count <= 1500:

        StudentQueue.objects.create(
            person=user,
            startTime=fake.date_time_this_month(
                before_today=True, after_today=True, tzinfo="MST"
            ),
            notes=fake.text(),
        )

        

    count += 1
