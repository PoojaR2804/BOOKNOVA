from rest_framework import serializers
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source="book.title")
    author = serializers.CharField(source="book.author")
    image = serializers.CharField(source="book.image")
    category = serializers.CharField(source="book.category")

    class Meta:
        model = OrderItem
        fields = [
            "title",
            "author",
            "image",
            "category",
            "price",
            "quantity",
        ]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = "__all__"