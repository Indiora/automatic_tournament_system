from django.contrib import admin
from .models import Tournament, Bracket


class TournamentAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title",)}


class BracketAdmin(admin.ModelAdmin):
    list_display = ['id', 'type']


admin.site.register(Tournament, TournamentAdmin)
admin.site.register(Bracket, BracketAdmin)
