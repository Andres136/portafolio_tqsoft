from django.db import models


class Course(models.Model):
    LEVEL_CHOICES = [
        ("basico", "Básico"),
        ("intermedio", "Intermedio"),
        ("avanzado", "Avanzado"),
    ]

    title = models.CharField("Título", max_length=200)
    slug = models.SlugField("Slug", unique=True)
    description = models.TextField("Descripción", blank=True)

    level = models.CharField(
        "Nivel",
        max_length=20,
        choices=LEVEL_CHOICES,
        blank=True,
    )
    duration_min = models.PositiveIntegerField(
        "Duración (minutos)", null=True, blank=True
    )
    lessons_count = models.PositiveIntegerField(
        "Número de lecciones", null=True, blank=True
    )

    image_url = models.URLField("URL de la imagen", blank=True)
    video_url = models.URLField("URL de video", blank=True)

    is_active = models.BooleanField("Activo", default=True)
    created_at = models.DateTimeField("Creado", auto_now_add=True)
    updated_at = models.DateTimeField("Actualizado", auto_now=True)

    class Meta:
        ordering = ["title"]
        verbose_name = "Curso"
        verbose_name_plural = "Cursos"

    def __str__(self):
        return self.title
