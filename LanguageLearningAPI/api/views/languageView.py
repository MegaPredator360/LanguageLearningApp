from django.shortcuts import render
from rest_framework import generics
from api.models.language import Language
from api.serializers.languageSerializer import LanguageSerializer

# Obtain the list of languages availables
class LanguageList(generics.ListAPIView):

    # SQL Query
    queryset = Language.objects.all()

    # Serializer
    serializer_class = LanguageSerializer

# Add a support to a new Language
class LanguageCreate(generics.CreateAPIView):

    # Serializer
    serializer_class = LanguageSerializer