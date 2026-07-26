import razorpay

from django.conf import settings
from django.views.decorators.csrf import csrf_exempt

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from books.models import Book
from cart.models import Cart

from .models import Order, OrderItem
from .serializers import OrderSerializer


client = razorpay.Client(
    auth=(
        settings.RAZORPAY_KEY_ID,
        settings.RAZORPAY_KEY_SECRET
    )
)


# ---------------- CREATE RAZORPAY PAYMENT ---------------- #

@csrf_exempt
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_payment(request):

    try:

        checkout_type = request.data.get("checkoutType")

        # ---------------- BUY NOW ---------------- #

        if checkout_type == "buyNow":

            book_id = request.data.get("book_id")

            if not book_id:
                return Response(
                    {"error": "Book ID is required."},
                    status=400
                )

            try:
                book = Book.objects.get(id=book_id)
            except Book.DoesNotExist:
                return Response(
                    {"error": "Book not found."},
                    status=404
                )

            total = book.price

        # ---------------- CART ---------------- #

        else:

            cart_items = Cart.objects.filter(user=request.user)

            if not cart_items.exists():
                return Response(
                    {"error": "Cart is empty"},
                    status=400
                )

            total = sum(
                item.book.price * item.quantity
                for item in cart_items
            )

        razorpay_order = client.order.create({

            "amount": int(total * 100),
            "currency": "INR",
            "payment_capture": 1

        })

        return Response({

            "id": razorpay_order["id"],
            "amount": razorpay_order["amount"],
            "currency": razorpay_order["currency"],
            "key": settings.RAZORPAY_KEY_ID

        })

    except Exception as e:

        print(e)

        return Response(
            {
                "error": str(e)
            },
            status=400
        )


# ---------------- SAVE ORDER AFTER PAYMENT ---------------- #
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def save_order(request):

    print("========== SAVE ORDER CALLED ==========")
    print(request.data)

    checkout_type = request.data.get("checkoutType")
    payment_id = request.data.get("payment_id")
    address = request.data.get("address")
    phone = request.data.get("phone")

    # rest of your code...
    # ---------------- BUY NOW ---------------- #

    if checkout_type == "buyNow":

        try:
            book = Book.objects.get(
                id=request.data.get("book_id")
            )

        except Book.DoesNotExist:

            return Response(
                {
                    "error": "Book not found."
                },
                status=404
            )

        order = Order.objects.create(

            user=request.user,
            total=book.price,
            address=address,
            phone=phone,
            payment_id=payment_id,
            payment_status="Paid"

        )

        OrderItem.objects.create(

            order=order,
            book=book,
            quantity=1,
            price=book.price

        )

    # ---------------- CART ---------------- #

    else:

        cart_items = Cart.objects.filter(
            user=request.user
        )

        if not cart_items.exists():

            return Response(
                {
                    "error": "Cart is empty."
                },
                status=400
            )

        total = sum(
            item.book.price * item.quantity
            for item in cart_items
        )

        order = Order.objects.create(

            user=request.user,
            total=total,
            address=address,
            phone=phone,
            payment_id=payment_id,
            payment_status="Paid"

        )

        for item in cart_items:

            OrderItem.objects.create(

                order=order,
                book=item.book,
                quantity=item.quantity,
                price=item.book.price

            )

        cart_items.delete()

    return Response({

        "message": "Order saved successfully."

    })


# ---------------- GET USER ORDERS ---------------- #

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def orders(request):

    orders = Order.objects.filter(
        user=request.user
    ).order_by("-created_at")

    serializer = OrderSerializer(
        orders,
        many=True
    )

    return Response(serializer.data)