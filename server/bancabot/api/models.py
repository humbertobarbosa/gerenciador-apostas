from django.db import models

class Bet(models.Model):
    name = models.CharField(max_length=500)
    tipster = models.CharField(max_length=50)
    date = models.DateField(verbose_name="Data", default="2024-01-01")
    match = models.CharField(max_length=100, default="Sem partida")
    odd = models.FloatField(verbose_name="Odd", default=1.0)
    stake = models.FloatField(verbose_name="Stake", default=0.0)
    RESULT_CHOICES = [
        ('Pendente', 'Pendente'),
        ('Ganhou', 'Ganhou'),
        ('Perdeu', 'Perdeu'),
        ('Empatou', 'Empatou'),
    ]
    result = models.CharField(max_length=10, choices=RESULT_CHOICES, default='Pendente')

    def __str__(self):
        return f"{self.name} - {self.match} ({self.date})"