from rest_framework import generics, permissions
from .models import PortfolioProject
from .serializers import PortfolioProjectSerializer

class PortfolioListCreateView(generics.ListCreateAPIView):
    serializer_class = PortfolioProjectSerializer

    def get_permissions(self):
        if self.request.method == "POST":
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_queryset(self):
        return PortfolioProject.objects.filter(is_published=True)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
