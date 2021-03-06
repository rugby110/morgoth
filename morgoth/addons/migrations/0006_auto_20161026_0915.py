# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-10-26 09:15
from __future__ import unicode_literals

from django.db import migrations
import morgoth.addons.models


class Migration(migrations.Migration):

    dependencies = [
        ('addons', '0005_auto_20161019_0458'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='addongroup',
            options={'ordering': ('-id',)},
        ),
        migrations.AddField(
            model_name='addongroup',
            name='browser_version_tmp',
            field=morgoth.addons.models.VersionNumberField(default=0),
            preserve_default=False,
        ),
    ]
