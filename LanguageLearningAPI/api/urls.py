from django.urls import path
from api.views.userView import UserView
from api.views.roleView import RoleView
from api.views.postView import PostView
from api.views import postHistoryView
from api.views import postCommentsView
from api.views.languageView import LanguageView
from api.views.itemView import ItemView
from api.views.itemTagView import ItemTagView
from api.views import salesHistoryView

# Url is created
urlpatterns = [
    # ---------- User Routes
    # Route,           View,          Name of View
    path('user/list/', UserView.list, name = 'user_list_view'),
    path('user/create/', UserView.create, name = 'user_create_view'),
    path('user/update/', UserView.update, name = 'user_update_view'),
    path('user/delete/<int:id>/', UserView.delete, name = 'user_delete_view'),

    # ---------- Role Routes
    path('role/list/', RoleView.list, name = 'role_list_view'),

    # ---------- Item Routes
    path('item/list/', ItemView.list, name = 'item_list_view'),
    path('item/create/', ItemView.create, name = 'item_create_view'),
    path('item/update/', ItemView.update, name = 'item_update_view'),
    path('item/delete/<int:id>/', ItemView.delete, name = 'item_delete_view'),

    # ---------- Item Tag Routes
    path('itemTag/list/', ItemTagView.list, name = 'itemTag_list_view'),
    path('itemTag/create/', ItemTagView.create, name = 'itemTag_create_view'),

        # ---------- Languages Routes
    path('language/list/', LanguageView.list, name = 'language_list_view'),
    path('language/create/', LanguageView.create, name = 'language_create_view'),

    # ---------- Posts Routes
    path('post/list/', PostView.list, name = 'post_list_view'),
    path('post/create/', PostView.create, name = 'post_create_view'),
    path('post/delete/<int:id>/', PostView.delete, name = 'post_delete_view'),

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