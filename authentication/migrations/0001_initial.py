# Generated by Django 2.1.5 on 2021-05-30 12:58

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User_info',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=100, unique=True)),
                ('image1', models.ImageField(blank=True, upload_to='authentication/images/')),
                ('image2', models.ImageField(blank=True, upload_to='authentication/images/')),
            ],
        ),
    ]
