from django.contrib import admin
from .models import PortfolioProject

@admin.register(PortfolioProject)
class PortfolioProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "owner", "is_published", "created_at")
    list_filter = ("is_published", "created_at")
    search_fields = ("title", "description", "tags")
