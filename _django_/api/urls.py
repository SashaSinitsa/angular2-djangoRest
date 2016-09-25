from django.conf.urls import url, include

# from .api import UserList, UserDetail
# from .api import PostList, PostDetail, UserPostList
# from .api import PhotoList, PhotoDetail, PostPhotoList, SparePartList
from .api import sparepart_list, sparepart_detail, json_list, file_send

spare_part_urls = [
    url(r'^/(?P<id>[0-9]+)$', sparepart_detail),
    url(r'^/json$', json_list, name='json-list'),
    url(r'^/csv/(?P<file_name>[a-zA-Z0-9]+([a-zA-Z\_0-9\.-]*))$', file_send, name='csv'),
    url(r'^$', sparepart_list, name='spare-part-list'),
]


# user_urls = [
#     url(r'^/(?P<username>[0-9a-zA-Z_-]+)/posts$', UserPostList.as_view(), name='userpost-list'),
#     url(r'^/(?P<username>[0-9a-zA-Z_-]+)$', UserDetail.as_view(), name='user-detail'),
#     url(r'^$', UserList.as_view(), name='user-list')
# ]
#
# post_urls = [
#     url(r'^/(?P<pk>\d+)/photos$', PostPhotoList.as_view(), name='postphoto-list'),
#     url(r'^/(?P<pk>\d+)$', PostDetail.as_view(), name='post-detail'),
#     url(r'^$', PostList.as_view(), name='post-list')
# ]
#
# photo_urls = [
#     url(r'^/(?P<pk>\d+)$', PhotoDetail.as_view(), name='photo-detail'),
#     url(r'^$', PhotoList.as_view(), name='photo-list')
# ]

urlpatterns = [
    url(r'^/spare-parts', include(spare_part_urls)),
    # url(r'^users', include(user_urls)),
    # url(r'^posts', include(post_urls)),
    # url(r'^photos', include(photo_urls)),
]
