from django.urls import path
from .views import CourseListView, CourseDetailView   # 👈 solo estas

urlpatterns = [
    path("courses/", CourseListView.as_view(), name="courses-list"),
    path("courses/<slug:slug>/", CourseDetailView.as_view(), name="course-detail"),
]
