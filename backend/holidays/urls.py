from django.urls import path
from .views import HolidayList

urlpatterns = [
    path('holidays/<str:country>/<int:year>/', HolidayList.as_view(), name='holiday-list'),
]
