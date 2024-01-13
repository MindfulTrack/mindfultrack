from django.db import models

# Create your models here.
class Test(models.Model):
    id = models.BigAutoField(primary_key=True)
    student = models.CharField(blank=True, null=True)
    appointment = models.CharField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'test'