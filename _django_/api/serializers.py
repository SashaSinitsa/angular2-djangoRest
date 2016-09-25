from rest_framework import serializers

# from .models import User, Post, Photo
from .models import SparePart


class SparePartSerializer(serializers.ModelSerializer):

    class Meta:
        model = SparePart
        fields = ('id', 'number', 'manufacturer', 'title', 'presence', 'unit', 'price')


# class SparePartSerializer(serializers.Serializer):
#     pk = serializers.IntegerField(read_only=True)
#     number = serializers.CharField(required=False, max_length=30)
#     manufacturer = serializers.CharField(required=False, max_length=30)
#     title = serializers.CharField( max_length=30)
#     unit = serializers.CharField(required=False, max_length=30)
#     price = serializers.CharField(required=False, max_length=30)
#     presence = serializers.CharField(required=False, max_length=30)
#     shown = serializers.CharField(required=False, max_length=30)
#
#     def create(self, validated_data):
#         """
#         Create and return a new `Snippet` instance, given the validated data.
#         """
#         return SparePart.objects.create(**validated_data)
#
#     def update(self, instance, validated_data):
#         """
#         Update and return an existing `Snippet` instance, given the validated data.
#         """
#         instance.number = validated_data.get('number', instance.title)
#         instance.manufacturer = validated_data.get('manufacturer', instance.code)
#         instance.title = validated_data.get('title', instance.linenos)
#         instance.unit = validated_data.get('unit', instance.language)
#         instance.price = validated_data.get('price', instance.style)
#         instance.presence = validated_data.get('presence', instance.style)
#         instance.shown = validated_data.get('shown', instance.style)
#         instance.save()
#         return instance


# class UserSerializer(serializers.ModelSerializer):
#     posts = serializers.HyperlinkedIdentityField(view_name='userpost-list', lookup_field='username')
#
#     class Meta:
#         model = User
#         fields = ('id', 'username', 'first_name', 'last_name', 'posts',)
#
#
# class PostSerializer(serializers.ModelSerializer):
#     author = UserSerializer(required=False, read_only=True, default=serializers.CurrentUserDefault())
#     photos = serializers.HyperlinkedIdentityField(view_name='postphoto-list')
#     # author = serializers.HyperlinkedRelatedField(view_name='user-detail', lookup_field='username')
#
#     def get_validation_exclusions(self, *args, **kwargs):
#         # Need to exclude `user` since we'll add that later based off the request
#         exclusions = super(PostSerializer, self).get_validation_exclusions(*args, **kwargs)
#         return exclusions + ['author']
#
#
#     class Meta:
#         model = Post
#
#
# class PhotoSerializer(serializers.ModelSerializer):
#     image = serializers.ReadOnlyField(source='image.url')
#
#     class Meta:
#         model = Photo
