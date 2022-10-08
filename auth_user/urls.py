from django.urls import path
from auth_user.views import login, register, delete, update, user

urlpatterns = [
    path('login/', login),
    path('register/', register),
    path('delete/', delete),
    path('update/', update),
    path('user/', user)
]