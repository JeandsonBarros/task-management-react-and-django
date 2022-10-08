from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from auth_user.serializers import UserSerializer

#https://medium.com/quick-code/token-based-authentication-for-django-rest-framework-44586a9a56fb

#@csrf_exempt
@swagger_auto_schema(methods=['post'],
                         request_body=openapi.Schema(
                             type=openapi.TYPE_OBJECT,
                             required=['version'],
                             properties={
                                 'username': openapi.Schema(type=openapi.TYPE_STRING),
                                 'password': openapi.Schema(type=openapi.TYPE_STRING)
                             },
                         ),
                         operation_description='User authentication, in the username name field you can use your own username or email')  
@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):

    username = request.data.get("username")
    password = request.data.get("password")

    if username is None or password is None:
        return Response({'error': 'Please provide both username and password'},
                        status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)

    if not user:
        return Response({'error': 'Invalid Credentials'},
                        status=status.HTTP_404_NOT_FOUND)

    token, bool = Token.objects.get_or_create(user=user)

    print(bool)

    return Response({'token': token.key}, status=status.HTTP_200_OK)

@swagger_auto_schema(
        methods=['post'],
        request_body=UserSerializer,
        operation_description="Save user")
@api_view(["POST"])
@permission_classes((AllowAny,))
def register(request):
    user = UserSerializer(data=request.data)

    if user.is_valid():
        user.save()
        return Response(status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(
        methods=['delete'],
        response=204,
        operation_description="Delete user")
@api_view(["DELETE"])
def delete(request):
        try:
            request.user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except NameError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(
        methods=['patch'],
        request_body=UserSerializer,
        operation_description="Update user")
@api_view(["patch"])
def update(request):
        userSerializer = UserSerializer(request.user, data=request.data, partial=True)
        if userSerializer.is_valid():
            userSerializer.save()
            return Response(userSerializer.data)
        return Response(userSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(
        methods=['get'],
        operation_description="Get user")
@api_view(["get"])
def user(request):
    try:
        userSerializer = UserSerializer(request.user)
        return Response(userSerializer.data)

    except:
        return Response(userSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
   