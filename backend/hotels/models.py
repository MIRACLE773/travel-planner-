from django.db import models
from django.conf import settings

class HotelBooking(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    hotel_id = models.IntegerField()
    hotel_name = models.CharField(max_length=200)
    city = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)
    check_in = models.DateField(null=True, blank=True)
    check_out = models.DateField(null=True, blank=True)
    price = models.FloatField()

    def __str__(self):
        return f"{self.hotel_name} - {self.user}"

