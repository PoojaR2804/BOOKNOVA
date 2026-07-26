from django.urls import path
from .views import create_payment, save_order, orders

urlpatterns = [
    path("create-payment/", create_payment),
    path("save-order/", save_order),
    path("", orders),
]