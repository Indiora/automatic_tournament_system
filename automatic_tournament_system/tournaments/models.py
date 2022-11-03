from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _


class Tournament(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    slug = models.SlugField(max_length=255, unique=True)
    # prize = models.FloatField()
    # participants = models.TextField()
    # poster = models.ImageField(upload_to='photos/media/%Y/%m/%d/', blank=True)
    # streams = 
    # game =

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Bracket(models.Model):

    tournament = models.ForeignKey('Tournament', on_delete=models.CASCADE)
    # bracket = models.JSONField(blank=True)
    # start_time = models.DateTimeField()

    class BracketType(models.TextChoices):
        SINGLEELIMINATION = 'SE', _('Single elimination')
        ROUNDROBIN = 'RR', _('Round robin')

    type = models.CharField(
        max_length=255,
        # choices=BracketType.choices,
        # default=BracketType.SINGLEELIMINATION,
    )

    def __str__(self):
        return self.type


