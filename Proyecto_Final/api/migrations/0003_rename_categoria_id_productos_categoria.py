# Generated by Django 5.1.2 on 2024-11-20 20:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_rename_categoria_productos_categoria_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='productos',
            old_name='Categoria_id',
            new_name='Categoria',
        ),
    ]
