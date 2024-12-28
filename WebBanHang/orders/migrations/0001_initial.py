# Generated by Django 5.1.4 on 2024-12-18 14:45

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('customer_name', models.CharField(max_length=100)),
                ('product_name', models.CharField(max_length=100)),
                ('quantity', models.IntegerField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('status', models.CharField(choices=[('Pending', 'Chờ xác nhận'), ('Confirmed', 'Đã xác nhận'), ('Shipped', 'Đang vận chuyển'), ('Delivered', 'Đã giao'), ('Cancelled', 'Đã hủy')], default='Pending', max_length=50)),
                ('order_date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]