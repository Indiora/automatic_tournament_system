# Generated by Django 4.1.2 on 2023-01-03 12:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tournaments', '0004_alter_bracket_tournament'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bracket',
            name='type',
            field=models.CharField(choices=[('SE', 'Single elimination'), ('DE', 'Double elimination'), ('RR', 'Round robin')], default='SE', max_length=255),
        ),
    ]
