# Generated by Django 5.1.3 on 2025-01-08 03:59

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("webbansua", "0013_customuser_phone_number_order_phone_number_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="order",
            name="voucher",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="webbansua.voucher",
            ),
        ),
    ]
