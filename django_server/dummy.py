from faker import Faker
from .models import *
from django.contrib.auth.models import User

fake = Faker()

# Create Universities
for _ in range(10):
    University.objects.create(
        name=fake.name(),
        addressLineOne = fake.street_address(),
        city = fake.city(),
        state = fake.state_abbr(),
        zipCode = fake.postcode(),
        )

## Create Students
## 1000 in queue, 500, left, 50 signed up but never joined queue
for _ in range(1550):
    user = User.objects.create_user(
        first_name = fake.first_name(),
        last_name = fake.last_name(),
        email=fake.email(),
        password=fake.password(),
        username=fake.username(),
    )
    Person.object.create(
        person=user,
        university_id=fake.random_int(min=1, max=10)
    )
    
    for _ in range(fake.random_int(min=1, max=5)):
        FavoriteResource.objects.create(
            person=user,
            resourceDetail_id = fake.random_int(min=1, max=21),
            favorite = True
        )


# Create Queue Entries Current
for _ in range(1000):
    StudentQueue.objects.create(
     person_id=fake.random_int(min=1, max=1000),
     startTime=fake.date_time_this_month(before_today = True, after_today= True, tzinfo="MST"),
     notes=fake.text()
     )

# Have Left Queue
for _ in range(500):
    StudentQueue.objects.create(
     person_id=fake.random_int(min=1001, max=1500),
     startTime=fake.date_time_this_month(before_today = True, after_today= False, tzinfo="MST"),
     endTime=fake.date_time_this_month(before_today = False, after_today= True, tzinfo="MST"),
     leaveReason_id=fake.random_int(min=1, max=4),
     notes=fake.text()
     )



