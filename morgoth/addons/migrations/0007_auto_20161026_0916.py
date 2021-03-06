# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-10-26 09:16
from __future__ import unicode_literals

from django.db import migrations, models


def remap_versions(apps, schema_editor):
    AddonGroup = apps.get_model('addons', 'AddonGroup')

    for addon_group in AddonGroup.objects.all():
        addon_group.browser_version_tmp = addon_group.browser_version
        addon_group.save()


def undo_remap_versions(apps, schema_editor):
    AddonGroup = apps.get_model('addons', 'AddonGroup')

    for addon_group in AddonGroup.objects.all():
        addon_group.browser_version = str(addon_group.browser_version_tmp)
        addon_group.save()


class Migration(migrations.Migration):

    dependencies = [
        ('addons', '0006_auto_20161026_0915'),
    ]

    operations = [
        migrations.AlterField(
            model_name='addongroup',
            name='browser_version',
            field=models.CharField(max_length=32, null=True),
        ),
        migrations.RunPython(remap_versions, undo_remap_versions),
    ]
