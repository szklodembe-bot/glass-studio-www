# Dodawanie zdjec do galerii

Galeria jest zbudowana tak, zeby pozniej mozna bylo dodawac prawdziwe zdjecia realizacji bez zmiany kodu strony.

## Gdzie wrzucac zdjecia

Zdjecia dodaj do folderu:

```text
images/galeria/
```

Najlepiej uzywac prostych nazw bez polskich znakow i spacji, np.:

```text
lustro-lazienka-01.jpg
szklo-kuchnia-lacobel-01.jpg
ramka-aluminiowa-01.jpg
```

## Jak dopisac zdjecie do strony

Po wgraniu pliku dopisz pozycje w:

```text
data/galeria.json
```

Przyklad:

```json
{
  "photos": [
    {
      "title": "Lustro na wymiar do lazienki",
      "category": "Lustra",
      "src": "images/galeria/lustro-lazienka-01.jpg",
      "alt": "Lustro na wymiar zamontowane w lazience",
      "description": "Lustro srebrne przygotowane pod wymiar klienta."
    }
  ]
}
```

## Kategorie

Kategorie moga byc np.:

- Lustra
- Szklo kuchenne
- Szklo meblowe
- Lacobel
- Ramki aluminiowe
- Obrobka

Strona sama zrobi filtry z kategorii wpisanych w pliku JSON.

## Uwaga

Nie dodawaj zdjec przypadkowych ani pogladowych jako realizacji Glass Studio. Lepiej zostawic galerie pusta niz pokazywac material, ktory nie jest prawdziwa realizacja firmy.
