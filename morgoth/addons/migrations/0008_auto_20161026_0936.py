# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-10-26 09:36
from __future__ import unicode_literals

from django.db import migrations
import morgoth.addons.models


class Migration(migrations.Migration):

    dependencies = [
        ('addons', '0007_auto_20161026_0916'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='addongroup',
            name='browser_version',
        ),
        migrations.AlterField(
            model_name='addongroup',
            name='browser_version_tmp',
            field=morgoth.addons.models.VersionNumberField(unique=True),
        ),
    ]
