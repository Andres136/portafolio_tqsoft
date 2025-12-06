from django.db import models
from django.contrib.auth.models import User

class PortfolioProject(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="projects")
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    image_url = models.URLField(blank=True)
    repo_url = models.URLField(blank=True)
    demo_url = models.URLField(blank=True)
    tags = models.CharField(max_length=300, blank=True)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title
