from rest_framework import serializers

from morgoth.addons.models import Addon, AddonGroup


class AddonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Addon
        fields = [
            'id',
            'name',
            'version',
            'ftp_url',
        ]


class AddonGroupSerializer(serializers.ModelSerializer):
    addons = serializers.PrimaryKeyRelatedField(many=True, queryset=Addon.objects.all(),
                                                required=False)

    class Meta:
        model = AddonGroup
        fields = [
            'id',
            'channel_name',
            'browser_version',
            'addons',
        ]
