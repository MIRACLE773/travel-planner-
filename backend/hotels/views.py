from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
import random

# Dummy hotel data
HOTELS = [
    {
        "id": 1,
        "name": "Eko Hotel & Suites",
        "rooms": [
            {"type": "Single", "price": 120},
            {"type": "Double", "price": 200},
            {"type": "Suite", "price": 450},
        ]
    },
    {
        "id": 2,
        "name": "Radisson Blu Lagos",
        "rooms": [
            {"type": "Single", "price": 150},
            {"type": "Double", "price": 230},
            {"type": "Suite", "price": 500},
        ]
    },
    {
        "id": 3,
        "name": "Transcorp Hilton Abuja",
        "rooms": [
            {"type": "Single", "price": 130},
            {"type": "Double", "price": 210},
            {"type": "Suite", "price": 480},
        ]
    }
]


class HotelListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({"hotels": HOTELS})


class HotelBookView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        hotel_name = request.data.get("hotel_name")
        room_type = request.data.get("room_type")
        price = request.data.get("price")

        return Response({
            "message": f"🎉 Congratulations! You booked a {room_type} room at {hotel_name} for ${price}"
        })
