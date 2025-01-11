# Migration after editing to rollback Brand model and restore voucher.brand field

from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ("webbansua", "0018_remove_voucher_brand_id_voucher_brand"),
    ]

    operations = [
        # Restore the 'brand' field in Voucher model
        migrations.AddField(
            model_name="voucher",
            name="brand",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        # Remove the creation of the 'Brand' model
        # No need to add anything here, as it's already removed
    ]
