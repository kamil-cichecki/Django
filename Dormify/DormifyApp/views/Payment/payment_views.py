from django.http import JsonResponse
from DormifyApp.models import Payment

#manager ma widok ze wszystkimi uzytkownikami w zakładce payments - wyswietla mu się lista uzytkownikow i po prawo ma przycisk do zatwierdzania płatności. 
#w momencie gdy przejdzie przelew od uzytkownika X, znajduje go na liście i klika przycisk by zatwierdzić płatność od danego mieszkańca. Wtedy tworzy się obiekt typu Payment