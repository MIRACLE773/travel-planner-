from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from .serializers import RegisterSerializer


@method_decorator(csrf_exempt, name="dispatch")
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)

        return Response({
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
            },
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)


@method_decorator(csrf_exempt, name="dispatch")
class LoginView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("username_or_email")
        password = request.data.get("password")

        if not email or not password:
            return Response(
                {"error": "Please provide both email and password."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 🔥 FIX: username=email (NOT email=email)
        user = authenticate(request, username=email, password=password)

        if not user:
            return Response(
                {"error": "Invalid credentials."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        refresh = RefreshToken.for_user(user)

        return Response({
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
            },
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }, status=status.HTTP_200_OK)
