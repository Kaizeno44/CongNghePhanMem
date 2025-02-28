# Generated by Django 5.1.3 on 2025-01-08 11:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("webbansua", "0014_order_voucher"),
    ]

    operations = [
        migrations.AlterField(
            model_name="product",
            name="category",
            field=models.CharField(
                blank=True,
                choices=[
                    ("sua_bot_dinh_duong", "Sữa bột dinh dưỡng"),
                    ("ta_bim_cho_be", "Tả bỉm cho bé"),
                ],
                max_length=50,
                null=True,
            ),
        ),
        migrations.AddField(
            model_name="product",
            name="sale_price",
            field=models.DecimalField(
                blank=True, decimal_places=2, max_digits=10, null=True
            ),
        ),
        migrations.AddField(
            model_name="product",
            name="status",
            field=models.CharField(
                choices=[
                    ("available", "Available"),
                    ("out_of_stock", "Out of Stock"),
                    ("discontinued", "Discontinued"),
                ],
                default="available",
                max_length=20,
            ),
        ),
        migrations.DeleteModel(
            name="ProductCategory",
        ),
    ]
