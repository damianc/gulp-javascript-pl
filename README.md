# gulp-javascript-pl

Wtyczka do Gulpa pozwalająca pisać kod JavaScript po polsku.
Tłumaczy kod JavaScript PL na czysty kod JavaScript, przekładając słowa zapisane w języku polskim na słowa zapisane w języku JavaScript.

## Skrypty JavaScript PL

Należy pamiętać, że pisząc polski kod JavaScript cały czas piszemy jednak w JS a jedyną modyfikacją jest zapis słów kluczowych.
Przykładowy kod został zaprezentowany poniżej. Pliki z polskim kodem JavaScript posiadają rozszerzenie `.jspl`.

```
zm fibbonaci = generator () {
    zm pre = 0,
       cur = 1;

	podczas (tak) {
        pre = [cur, cur += pre][0];
        dostarcz cur;
    }
}

zm f = fibonacci();
console.log(f.next().value);
```

Powyższe zostanie przetłumaczone na postać taką jak poniżej.

```
var fibbonaci = function* () {
	var pre = 0,
	   cur = 1;

	while (true) {
		pre = [cur, cur += pre][0];
		yield cur;
	}
}
```

## Zmienne i stałe

```
zm a = 1,
   b = 2;

stała C = 3;
```

## Funkcje i instrukcje warunkowe

```
funkcja liczba(x) {
	jeśli (x > 9) zwróć tak;
	inaczej zwróć nie;
}
```

## Instrukcja `switch`

```
przełącz (x) {
	gdy 1:
	    console.log('Jeden');
	    wyjdź;
	gdy 2:
	    console.log('Dwa');
	    wyjdź;
	domyślnie:
	    console.log('Inna liczba')
}
```