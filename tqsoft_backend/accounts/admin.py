# admin.py
from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin


class CustomUserAdmin(UserAdmin):
    list_display = ("id", "username", "email", "first_name", "last_name", "is_staff", "is_superuser")
    search_fields = ("username", "email", "first_name", "last_name")


# quitamos el admin por defecto y registramos el nuestro
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
