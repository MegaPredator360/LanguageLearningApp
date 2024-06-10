from django.urls import path
from api.views.exercise_resource_view import ExerciseResourceView
from api.views.pairing_exercise_view import PairingExerciseView
from api.views.practice_review_view import PracticeReviewView
from api.views.practice_view import PracticeView
from api.views.selection_answer_view import SelectionAnswerView
from api.views.selection_exercise_view import SelectionExerciseView
from api.views.sentence_exercise_view import SentenceExerciseView
from api.views.topic_view import TopicView
from api.views.true_false_exercise_view import TrueFalseExerciseView
from api.views.user_view import UserView
from api.views.role_view import RoleView
from api.views.lecture_view import LectureView
from api.views.lecture_review_view import LectureReviewView
from api.views.language_view import LanguageView

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

    # ---------- Languages Routes
    path('language/list/', LanguageView.list, name = 'language_list_view'),
    path('language/create/', LanguageView.create, name = 'language_create_view'),

    # ---------- Topics Routes
    path('topic/list/', TopicView.list, name = 'topic_list_view'),
    path('topic/create/', TopicView.create, name = 'topic_create_view'),

    # ---------- Lecture Routes
    path('lecture/list/', LectureView.list, name = 'lecture_list_view'),
    path('lecture/create/', LectureView.create, name = 'lecture_create_view'),
    path('lecture/delete/<int:id>/', LectureView.delete, name = 'lecture_delete_view'),

    # ---------- Lecture Reviews Routes
    path('lecture_review/list/', LectureReviewView.list, name = 'lecture_review_list_view'),
    path('lecture_review/create/', LectureReviewView.create, name = 'lecture_review_create_view'),
    path('lecture_review/update/', LectureReviewView.update, name = 'lecture_review_update_view'),
    path('lecture_review/delete/<int:id>/', LectureReviewView.delete, name = 'lecture_review_delete_view'),

    # ---------- Practice Routes
    path('practice/list/', PracticeView.list, name = 'practice_list_view'),
    path('practice/create/', PracticeView.create, name = 'practice_create_view'),
    path('practice/update/', PracticeView.update, name = 'practice_update_view'),
    path('practice/delete/<int:id>/', PracticeView.delete, name = 'practice_delete_view'),

    # ---------- Practice Reviews Routes
    path('practice_review/list/', PracticeReviewView.list, name = 'practice_review_list_view'),
    path('practice_review/create/', PracticeReviewView.create, name = 'practice_review_create_view'),
    path('practice_review/update/', PracticeReviewView.update, name = 'practice_review_update_view'),
    path('practice_review/delete/<int:id>/', PracticeReviewView.delete, name = 'practice_review_delete_view'),

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