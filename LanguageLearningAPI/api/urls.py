from django.urls import path
from api.views import userView
from api.views import roleView
from api.views import postView
from api.views import postHistoryView
from api.views import postCommentsView
from api.views import languageView
from api.views import itemView
from api.views import itemTagView
from api.views import salesHistoryView

# Url is created
urlpatterns = [
    # ---------- User Routes
    # Route,           View,                        Name of View
    path('user/list/', userView.UserList.as_view(), name='user_list_view'),
    path('user/create/', userView.UserCreate.as_view(), name='user_create_view'),
    path('user/update/<int:pk>/', userView.UserUpdate.as_view(), name='user_update_view'),
    path('user/delete/<int:pk>/', userView.UserDelete.as_view(), name='user_delete_view'),

    # ---------- Role Routes
    path('role/list/', roleView.RoleList.as_view(), name='role_list_view'),

    # ---------- Item Routes
    path('item/list/', itemView.ItemList.as_view(), name='item_list_view'),
    path('item/create/', itemView.ItemCreate.as_view(), name='item_create_view'),
    path('item/update/<int:pk>/', itemView.ItemUpdate.as_view(), name='item_update_view'),
    path('item/delete/<int:pk>/', itemView.ItemDelete.as_view(), name='item_delete_view'),

    # ---------- Item Tag Routes
    path('itemTag/list/', itemTagView.ItemTagList.as_view(), name='itemTag_list_view'),
    path('itemTag/create/', itemTagView.ItemTagCreate.as_view(), name='itemTag_create_view'),

        # ---------- Languages Routes
    path('language/list/', languageView.LanguageList.as_view(), name='language_list_view'),
    path('language/create/', languageView.LanguageCreate.as_view(), name='language_create_view'),

    # ---------- Posts Routes
    path('post/list/', postView.PostList.as_view(), name='post_list_view'),
    path('post/create/', postView.PostCreate.as_view(), name='post_create_view'),
    path('post/delete/<int:pk>/', postView.PostDelete.as_view(), name='post_delete_view'),

        # ---------- Posts History Routes
    path('postHistory/list/', postHistoryView.PostHistoryList.as_view(), name='postHistory_list_view'),
    path('postHistory/create/', postHistoryView.PostHistoryCreate.as_view(), name='postHistory_create_view'),

        # ---------- Post Comments Routes
    path('postComments/list/', postCommentsView.PostCommentsList.as_view(), name='postComments_list_view'),
    path('postComments/create/', postCommentsView.PostCommentsCreate.as_view(), name='postComments_create_view'),
    path('postComments/update/<int:pk>/', postCommentsView.PostCommentsUpdate.as_view(), name='postComments_update_view'),
    path('postComments/delete/<int:pk>/', postCommentsView.PostCommentsDelete.as_view(), name='postComments_delete_view'),

            # ---------- Sales History Routes
    path('salesHistory/list/', salesHistoryView.SalesHistoryList.as_view(), name='salesHistory_list_view'),
    path('salesHistory/create/', salesHistoryView.SalesHistoryCreate.as_view(), name='salesHistory_create_view'),
]