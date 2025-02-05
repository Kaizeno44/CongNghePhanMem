# Generated by Django 5.1.3 on 2024-12-29 03:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("webbansua", "0009_cart_cartitem_orderitem"),
    ]

    operations = [
        migrations.CreateModel(
            name="Promotion",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=255)),
                ("description", models.TextField(blank=True, null=True)),
                (
                    "discount_percent",
                    models.DecimalField(decimal_places=2, max_digits=5),
                ),
                ("start_date", models.DateField()),
                ("end_date", models.DateField()),
                (
                    "image",
                    models.ImageField(blank=True, null=True, upload_to="promotions/"),
                ),
            ],
        ),
    ]
