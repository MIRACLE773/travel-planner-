from django.urls import path
from .views import HotelListView, HotelBookView

urlpatterns = [
    path("list/", HotelListView.as_view()),
    path("book/", HotelBookView.as_view()),
]
