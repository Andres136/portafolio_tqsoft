from rest_framework import serializers
from .models import ContactMessage

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ("id", "name", "email", "service", "message", "created_at")
