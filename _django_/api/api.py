from rest_framework import generics, permissions

# from .serializers import UserSerializer, PostSerializer, PhotoSerializer
# from .models import Post, Photo, User
from .serializers import SparePartSerializer
from .models import SparePart
# from .permissions import PostAuthorCanEditPermission


from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.http import HttpResponse
import json, io


class SparePartList(generics.ListAPIView):
    model = SparePart
    queryset = SparePart.objects.all()
    serializer_class = SparePartSerializer
    permission_classes = [
        permissions.AllowAny
    ]


class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """

    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)


def file_send(request, file_name):
    sparepart = SparePart.objects.all()
    serializer = SparePartSerializer(sparepart, many=True)
    data = serializer.data

    with io.open('data.txt', 'w', encoding='utf-8') as f:
        f.write(unicode(json.dumps(data, ensure_ascii=False)))
        f.close()

    json_file = open('data.txt', 'rb')
    response = HttpResponse(content=json_file)
    response['Content-Type'] = 'application/json'
    response['Content-Disposition'] = 'attachment; filename=%s' % file_name
    return response


@csrf_exempt
def json_list(request):
    if request.method == 'POST':
        SparePart.objects.all().delete()
        data = JSONParser().parse(request)
        serializer = SparePartSerializer(data=data, many=True)
        if serializer.is_valid():
            try:
                serializer.save()
            except:
                return JSONResponse(serializer.errors, status=400)
            return JSONResponse(serializer.data, status=201)
        return JSONResponse(serializer.errors, status=400)


@csrf_exempt
def sparepart_list(request):
    """
    List all code Contacts, or create a new Contact.
    """
    if request.method == 'GET':
        sparepart = SparePart.objects.all()
        serializer = SparePartSerializer(sparepart, many=True)
        return JSONResponse(serializer.data)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = SparePartSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data, status=201)
        return JSONResponse(serializer.errors, status=400)


@csrf_exempt
def sparepart_detail(request, id):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        sparepart = SparePart.objects.get(id=id)
    except SparePart.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = SparePartSerializer(sparepart)
        return JSONResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = SparePartSerializer(sparepart, data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data)
        return JSONResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        sparepart.delete()
        return HttpResponse(status=204)



# class UserList(generics.ListAPIView):
#     model = User
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [
#         permissions.AllowAny
#     ]

#
# class UserDetail(generics.RetrieveAPIView):
#     model = User
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     lookup_field = 'username'
#
#
# class PostMixin(object):
#     model = Post
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer
#     permission_classes = [
#         PostAuthorCanEditPermission
#     ]
#
#     def pre_save(self, obj):
#         """Force author to the current user on save"""
#         obj.author = self.request.user
#         return super(PostMixin, self).pre_save(obj)
#
#
# class PostList(PostMixin, generics.ListCreateAPIView):
#     pass
#
#
# class PostDetail(PostMixin, generics.RetrieveUpdateDestroyAPIView):
#     pass
#
#
# class UserPostList(generics.ListAPIView):
#     model = Post
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer
#
#     def get_queryset(self):
#         queryset = super(UserPostList, self).get_queryset()
#         return queryset.filter(author__username=self.kwargs.get('username'))
#
#
# class PhotoList(generics.ListCreateAPIView):
#     model = Photo
#     queryset = Photo.objects.all()
#     serializer_class = PhotoSerializer
#     permission_classes = [
#         permissions.AllowAny
#     ]

#
# class PhotoDetail(generics.RetrieveUpdateDestroyAPIView):
#     model = Photo
#     queryset = Photo.objects.all()
#     serializer_class = PhotoSerializer
#     permission_classes = [
#         permissions.AllowAny
#     ]
#
#
# class PostPhotoList(generics.ListAPIView):
#     model = Photo
#     queryset = Photo.objects.all()
#     serializer_class = PhotoSerializer
#
#     def get_queryset(self):
#         queryset = super(PostPhotoList, self).get_queryset()
#         return queryset.filter(post__pk=self.kwargs.get('pk'))
