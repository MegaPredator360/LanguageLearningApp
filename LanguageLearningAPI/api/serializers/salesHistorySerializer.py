from rest_framework import serializers
from api.models.sales_history import SalesHistory

class SalesHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SalesHistory
        fields = ['id', 'id_item', 'id_user', 'sale_date', 'quantity']