from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Cart
from .serializers import CartSerializer
from books.models import Book


# Add book to cart
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_to_cart(request):

    book_id = request.data.get("book_id")

    try:
        book = Book.objects.get(id=book_id)

        cart_item, created = Cart.objects.get_or_create(
            user=request.user,
            book=book
        )

        if not created:
            cart_item.quantity += 1
            cart_item.save()

        return Response(
            {"message": "Book added to cart"},
            status=status.HTTP_201_CREATED
        )

    except Book.DoesNotExist:
        return Response(
            {"error": "Book not found"},
            status=status.HTTP_404_NOT_FOUND
        )


# View cart
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def view_cart(request):

    cart = Cart.objects.filter(user=request.user)

    # Debugging
    print("Logged in user:", request.user)
    print("Cart items:", cart)

    serializer = CartSerializer(cart, many=True)

    return Response(serializer.data)


# Remove book from cart
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def remove_from_cart(request, id):
    try:
        cart_item = Cart.objects.get(
            id=id,
            user=request.user
        )

        cart_item.delete()

        return Response(
            {"message": "Book removed from cart successfully."},
            status=status.HTTP_200_OK
        )

    except Cart.DoesNotExist:
        return Response(
            {"error": "Cart item not found."},
            status=status.HTTP_404_NOT_FOUND
        )