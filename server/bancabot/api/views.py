from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Bet
from .serializer import BetSerializer


@api_view(['GET'])
def get_bets(request):
    bets = Bet.objects.all()
    serializedData = BetSerializer(bets, many=True).data
    return Response(serializedData)

@api_view(['POST'])
def create_bet(request):
    data = request.data
    serializer = BetSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def edit_bet(request, pk):
    try:
        bet = Bet.objects.get(pk=pk)
    except Bet.DoesNotExist:
        return Response({"detail": "Aposta não encontrada."}, status=status.HTTP_404_NOT_FOUND)

    serializer = BetSerializer(bet, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_bet(request, pk):
    try:
        bet = Bet.objects.get(pk=pk)
    except Bet.DoesNotExist:
        return Response({"detail": "Aposta não encontrada."}, status=status.HTTP_404_NOT_FOUND)

    bet.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
