from django.shortcuts import render
from rest_framework import generics
from api.models.sales_history import SalesHistory
from api.serializers.salesHistorySerializer import SalesHistorySerializer

# Obtain the list of sales history
class SalesHistoryList(generics.ListAPIView):

    # SQL Query
    queryset = SalesHistory.objects.all()

    # Serializer
    serializer_class = SalesHistorySerializer

# Add sales to the history
class SalesHistoryCreate(generics.CreateAPIView):

    # Serializer
    serializer_class = SalesHistorySerializer