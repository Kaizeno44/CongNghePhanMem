# Generated by Django 5.1.3 on 2024-12-27 13:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("webbansua", "0004_rename_created_at_customuser_date_joined_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="customuser",
            old_name="date_joined",
            new_name="created_at",
        ),
    ]
