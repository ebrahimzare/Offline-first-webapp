# Generated by Django 2.2.3 on 2019-07-31 00:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('work_order_number', models.IntegerField(verbose_name='Work Order Number')),
                ('representative_name', models.CharField(max_length=255, verbose_name='Representative Name')),
                ('contact_info', models.CharField(max_length=20, null=True, verbose_name='Contact Info')),
                ('project_number', models.IntegerField(null=True, verbose_name='Project Number')),
                ('date', models.DateTimeField(auto_now_add=True, verbose_name='Date')),
                ('visit_reason', models.TextField(blank=True, null=True, verbose_name='Visit Reason')),
            ],
        ),
    ]
