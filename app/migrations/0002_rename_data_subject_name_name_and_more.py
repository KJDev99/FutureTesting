# Generated by Django 4.0.5 on 2022-06-11 12:27

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='subject_name',
            old_name='data',
            new_name='name',
        ),
        migrations.AddField(
            model_name='subject_name',
            name='description',
            field=ckeditor.fields.RichTextField(blank=True),
        ),
    ]
