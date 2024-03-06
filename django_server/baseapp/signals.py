from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth.models import User, Group


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        instance.groups.add(Group.objects.get(name='Student'))