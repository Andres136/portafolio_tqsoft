from django.contrib import admin
from .models import Course


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "level", "is_active", "created_at")
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ("title", "slug")
    list_filter = ("level", "is_active")

