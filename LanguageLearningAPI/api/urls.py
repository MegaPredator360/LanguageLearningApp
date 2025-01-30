from django.urls import path
from api.views.exercise_resource_view import ExerciseResourceView
from api.views.pairing_exercise_view import PairingExerciseView
from api.views.exercise_review_view import ExerciseReviewView
from api.views.exercise_view import ExerciseView
from api.views.selection_answer_view import SelectionAnswerView
from api.views.selection_exercise_view import SelectionExerciseView
from api.views.sentence_exercise_view import SentenceExerciseView
from api.views.category_view import CategoryView
from api.views.true_false_exercise_view import TrueFalseExerciseView
from api.views.user_view import UserView
from api.views.role_view import RoleView
from api.views.reading_view import ReadingView
from api.views.reading_review_view import ReadingReviewView
from api.views.language_view import LanguageView

# Url is created
urlpatterns = [
    # ---------- User Routes
    # Route,           View,          Name of View
    path('user/list/', UserView.list, name = 'user_list_view'),
    path('user/create/', UserView.create, name = 'user_create_view'),
    path('user/update/', UserView.update, name = 'user_update_view'),
    path('user/delete/', UserView.delete, name = 'user_delete_view'),
    path('user/login/', UserView.login, name = 'user_login_view'),
    path('user/logged/', UserView.logged, name = 'user_logged_view'),
    path('user/logout/', UserView.logout, name = 'user_logout_view'),

    # ---------- Role Routes
    path('role/list/', RoleView.list, name = 'role_list_view'),

    # ---------- Languages Routes
    path('language/list/', LanguageView.list, name = 'language_list_view'),
    path('language/create/', LanguageView.create, name = 'language_create_view'),

    # ---------- Categories Routes
    path('category/list/', CategoryView.list, name = 'category_list_view'),
    path('category/create/', CategoryView.create, name = 'category_create_view'),

    # ---------- Reading Routes
    path('reading/list/', ReadingView.list, name = 'reading_list_view'),
    path('reading/create/', ReadingView.create, name = 'reading_create_view'),
    path('reading/update_views/', ReadingView.updateViews, name = 'reading_updateViews_view'),
    path('reading/delete/<int:id>/', ReadingView.delete, name = 'reading_delete_view'),

    # ---------- Reading Reviews Routes
    path('reading_review/list/<int:id>/', ReadingReviewView.list, name = 'reading_review_list_view'),
    path('reading_review/create/', ReadingReviewView.create, name = 'reading_review_create_view'),
    path('reading_review/update/', ReadingReviewView.update, name = 'reading_review_update_view'),
    path('reading_review/delete/<int:id>/', ReadingReviewView.delete, name = 'reading_review_delete_view'),

    # ---------- Exercise Routes
    path('exercise/list/', ExerciseView.list, name = 'exercise_list_view'),
    path('exercise/create/', ExerciseView.create, name = 'exercise_create_view'),
    path('exercise/update/', ExerciseView.update, name = 'exercise_update_view'),
    path('exercise/delete/<int:id>/', ExerciseView.delete, name = 'exercise_delete_view'),

    # ---------- Exercise Reviews Routes
    path('exercise_review/list/', ExerciseReviewView.list, name = 'exercise_review_list_view'),
    path('exercise_review/create/', ExerciseReviewView.create, name = 'exercise_review_create_view'),
    path('exercise_review/update/', ExerciseReviewView.update, name = 'exercise_review_update_view'),
    path('exercise_review/delete/<int:id>/', ExerciseReviewView.delete, name = 'exercise_review_delete_view'),

    # ---------- Exercise Resource Routes
    path('exercise_resource/list/', ExerciseResourceView.list, name = 'exercise_resource_list_view'),
    path('exercise_resource/create/', ExerciseResourceView.create, name = 'exercise_resource_create_view'),
    path('exercise_resource/update/', ExerciseResourceView.update, name = 'exercise_resource_update_view'),
    path('exercise_resource/delete/<int:id>/', ExerciseResourceView.delete, name = 'exercise_resource_delete_view'),

    # ---------- Pairing Exercise Routes
    path('pairing_exercise/list/', PairingExerciseView.list, name = 'pairing_exercise_list_view'),
    path('pairing_exercise/create/', PairingExerciseView.create, name = 'pairing_exercise_create_view'),
    path('pairing_exercise/update/', PairingExerciseView.update, name = 'pairing_exercise_update_view'),
    path('pairing_exercise/delete/<int:id>/', PairingExerciseView.delete, name = 'pairing_exercise_delete_view'),

    # ---------- Sentence Exercise Routes
    path('sentence_exercise/list/', SentenceExerciseView.list, name = 'sentence_exercise_list_view'),
    path('sentence_exercise/create/', SentenceExerciseView.create, name = 'sentence_exercise_create_view'),
    path('sentence_exercise/update/', SentenceExerciseView.update, name = 'sentence_exercise_update_view'),
    path('sentence_exercise/delete/<int:id>/', SentenceExerciseView.delete, name = 'sentence_exercise_delete_view'),

    # ---------- True / False Exercise Routes
    path('true_false_exercise/list/', TrueFalseExerciseView.list, name = 'true_false_exercise_list_view'),
    path('true_false_exercise/create/', TrueFalseExerciseView.create, name = 'true_false_exercise_create_view'),
    path('true_false_exercise/update/', TrueFalseExerciseView.update, name = 'true_false_exercise_update_view'),
    path('true_false_exercise/delete/<int:id>/', TrueFalseExerciseView.delete, name = 'true_false_exercise_delete_view'),

    # ---------- Selection Exercise Routes
    path('selection_exercise/list/', SelectionExerciseView.list, name = 'selection_exercise_list_view'),
    path('selection_exercise/create/', SelectionExerciseView.create, name = 'selection_exercise_create_view'),
    path('selection_exercise/update/', SelectionExerciseView.update, name = 'selection_exercise_update_view'),
    path('selection_exercise/delete/<int:id>/', SelectionExerciseView.delete, name = 'selection_exercise_delete_view'),

    # ---------- Selection Answer Routes
    path('selection_answer/list/', SelectionAnswerView.list, name = 'selection_answer_list_view'),
    path('selection_answer/create/', SelectionAnswerView.create, name = 'selection_answer_create_view'),
    path('selection_answer/delete/<int:id>/', SelectionAnswerView.delete, name = 'selection_answer_delete_view'),
]