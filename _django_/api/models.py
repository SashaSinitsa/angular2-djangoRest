from __future__ import unicode_literals
from django.db import models

from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    followers = models.ManyToManyField('self', related_name='followees', symmetrical=False)


# class Post(models.Model):
#     author = models.ForeignKey(User, related_name='posts')
#     title = models.CharField(max_length=255)
#     body = models.TextField(blank=True, null=True)


# class Photo(models.Model):
#     post = models.ForeignKey(Post, related_name='photos')
#     image = models.ImageField(upload_to="%Y/%m/%d")


class SparePart(models.Model):
    auto_increment_id = models.AutoField(primary_key=True)
    id = models.IntegerField(unique=True)
    number = models.CharField('catalogue number', max_length=30, blank=True)
    manufacturer = models.CharField('manufacturer', max_length=30, blank=True)
    title = models.CharField('title', max_length=100)
    presence = models.CharField('presence', max_length=30, blank=True)
    unit = models.CharField('unit', max_length=30, blank=True)
    price = models.CharField('price', max_length=30, blank=True)
    # shown = models.CharField('shown', max_length=30, blank=True)
