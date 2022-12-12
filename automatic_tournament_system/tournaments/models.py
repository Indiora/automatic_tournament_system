from django.db import models
from django.urls import reverse
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _
import random

class Tournament(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    slug = models.SlugField(max_length=255, unique=True)
    participants = models.TextField()
    poster = models.ImageField(upload_to='photos/media/%Y/%m/%d/', blank=True)
    game = models.CharField(max_length=255)
    prize = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    # streams = 
    # start_time = models.DateTimeField()

    # def __init__(self, * args, ** kwargs):
    #     super().__init__(* args, ** kwargs)
    #     self.poster = f'tournament_def_{random.randint(1, 13)}.png'

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        if not self.poster:
            self.poster = f'tournament_def_{random.randint(1, 13)}.png'
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('tournament', kwargs={'slug': self.slug})

class Bracket(models.Model):

    tournament = models.ForeignKey('Tournament', on_delete=models.CASCADE, null=True)
    bracket = models.JSONField(blank=True)
    # start_time = models.DateTimeField()

    class BracketType(models.TextChoices):
        SINGLEELIMINATION = 'SE', _('Single elimination')
        ROUNDROBIN = 'RR', _('Round robin')

    type = models.CharField(
        max_length=255,
        choices=BracketType.choices,
        default=BracketType.SINGLEELIMINATION,
    )

    def __str__(self):
        return self.type


