from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from django.db.models.signals import post_save
from django.dispatch import receiver
from tournaments.models import Tournament


class CustomUser(AbstractUser):
    email = models.EmailField(_('email address'), unique=True)
    email_verify = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ["username"]

    def get_name(self):
        return self.username


class Profile(models.Model):
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
    tournaments = models.ManyToManyField(Tournament)

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=CustomUser)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(
            user=instance
        )