from django.urls import path
from .views import get_bets, create_bet, edit_bet, delete_bet

urlpatterns = [
    path('bets/', get_bets, name='get_bets'),
    path('bets/create/', create_bet, name='create_bet'),
    path('bets/update/<int:pk>/', edit_bet, name='update_bet'),
    path('bets/delete/<int:pk>/', delete_bet, name='delete_bet'),
]
