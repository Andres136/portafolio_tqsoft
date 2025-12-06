from django.urls import path
from .views import PortfolioListCreateView

urlpatterns = [
    path("", PortfolioListCreateView.as_view(), name="portfolio-list-create"),
]
