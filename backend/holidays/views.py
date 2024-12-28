# holidays/views.py
import requests
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.cache import cache

class HolidayList(APIView):
    def get(self, request, country, year):
        # Check if data is cached
        cache_key = f"holidays_{country}_{year}"
        cached_data = cache.get(cache_key)

        if cached_data:
            return Response(cached_data)

        api_url = f"https://calendarific.com/api/v2/holidays?api_key={settings.CALENDARIFIC_API_KEY}&country={country}&year={year}"
        response = requests.get(api_url)

        if response.status_code != 200:
            return Response({"error": "Unable to fetch data"}, status=status.HTTP_400_BAD_REQUEST)

        holidays = response.json().get('response', {}).get('holidays', [])
        
        # Cache the response for 24 hours
        cache.set(cache_key, holidays, timeout=86400)

        return Response(holidays)

