from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include("accounts.urls")),
    path("api/contact/", include("contact.urls")),
    path("api/portfolio/", include("portfolio.urls")),
    path("api/", include("courses.urls")),

]
