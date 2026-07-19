from rest_framework import serializers
from .models import Cart


class CartSerializer(serializers.ModelSerializer):

    book_title = serializers.CharField(
        source="book.title",
        read_only=True
    )

    book_image = serializers.CharField(
        source="book.image",
        read_only=True
    )

    book_price = serializers.IntegerField(
        source="book.price",
        read_only=True
    )

    class Meta:
        model = Cart
        fields = [
            "id",
            "book",
            "book_title",
            "book_image",
            "book_price",
            "quantity",
            "added_at"
        ]