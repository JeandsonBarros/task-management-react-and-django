from django.urls import path
from task.views import TaskListAndCreateView, TaskRetrieverUpdateAndDelete
 
urlpatterns = [
    path('', TaskListAndCreateView.as_view()),
    path('<int:pk>/', TaskRetrieverUpdateAndDelete.as_view()),
]