from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Order
from .serializers import OrderSerializer

from cart.models import Cart


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_order(request):

    cart_items = Cart.objects.filter(user=request.user)

    if not cart_items.exists():
        return Response({"error": "Cart is empty"}, status=400)

    total = sum(item.book.price * item.quantity for item in cart_items)

    order = Order.objects.create(
        user=request.user,
        total=total,
        address=request.data.get("address"),
        phone=request.data.get("phone"),
    )

    cart_items.delete()

    return Response({
        "message": "Order placed successfully"
    })


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def orders(request):

    data = Order.objects.filter(user=request.user)

    serializer = OrderSerializer(data, many=True)

    return Response(serializer.data)