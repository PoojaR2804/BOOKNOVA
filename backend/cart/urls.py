from django.urls import path
from . import views

urlpatterns = [
    path("add/", views.add_to_cart),
    path("", views.view_cart),
    path("remove/<int:id>/", views.remove_from_cart),
]