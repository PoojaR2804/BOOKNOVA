from django.urls import path
from .views import create_order, orders

urlpatterns = [
    path("orders/create/", create_order),
    path("orders/", orders),
]