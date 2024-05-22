from django.urls import path
from api.views import userView

# Url is created
urlpatterns = [
    # ---------- User Routes
    # Route,           View,                        Name of View
    path('user/list/', userView.UserList.as_view(), name='user_list_view'),
    path('user/create/', userView.UserCreate.as_view(), name='user_create_view'),
    path('user/update/<int:pk>/', userView.UserUpdate.as_view(), name='user_update_view'),
    path('user/delete/<int:pk>/', userView.UserDelete.as_view(), name='user_delete_view'),
]