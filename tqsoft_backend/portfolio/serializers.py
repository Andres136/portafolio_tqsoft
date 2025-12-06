from rest_framework import serializers
from .models import PortfolioProject

class PortfolioProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioProject
        fields = "__all__"
        read_only_fields = ("id", "owner", "created_at")
