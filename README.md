# gulp-javascript-pl

That's a Gulp plugin whereby you can write JavaScript code in Polish.
Transpiles a code written in JavaScript PL into code written in pure JavaScript, having replaced Polish keywords with JavaScript ones.

## JavaScript PL scripts

Keep in mind that when writing Polish code, the code still remains JavaScript code. Only difference is what keywords are in use.
An example code is shown below. Files containing Polish JavaScript code have extension `.jspl`.

```
zm fibbonaci = generator () {
    zm pre = 0;
    zm cur = 1;

    dopóki (tak) {
        pre = [cur, cur += pre][0];
        dostarcz cur;
    }
}
```

The code above is to be transpiled to the form like below.

```
var fibbonaci = function* () {
    var pre = 0;
    var cur = 1;

    while (true) {
        pre = [cur, cur += pre][0];
        yield cur;
    }
}
```

## Specifying a custom language

By default, the plugin uses a standard built-in dictionary in which Polish keyword reside.
You can add custom one. To do so, follow the below steps:

* add an object with a vocabulary within the `lang` directory and name this file, for example `fr.js`

```
module.exports = {
    'retour': 'return',
    // ...
};
```

* pass the filename (without the `.js` extension) to the `jspl()` call in gulpfile

```
gulp.task('jspl:fr', function () {
    return gulp.src('french-jspl/*.jspl')
        .pipe(jspl('fr'))
        .pipe(gulp.dest('produced-js'));
});
```


## Built-in dictionary

By default, the plugin provides a set of built-in keywords in Polish language.
All ones are listed in the attached table below.

| Input keyword (JavaScript PL) | Output keyword (JavaScript) |
|-------------------------------|-----------------------------|
| `zm`         | `var`      |
| `zmienna`    | `var`      |
| `zmienna_blokowa` | `let`   |
| `stała`      | `const`   |
| `funkcja` | `function`   |
| `zwróć`   | `return`     |
| `argumenty` | `arguments` |
| `parametry` | `arguments` |
| `generator` | `function*` |
| `dostarcz`  | `yield`    |
| `deleguj`   | `yield*`  |
| `jeśli`    | `if`   |
| `jeżeli`   | `if`   |
| `inaczej`  | `else` |
| `przełączaj` | `switch` |
| `gdy`  | `case`  |
| `domyślnie`  | `default`  |
| `przez` | `for` |
| `dla`   | `for` |
| `w`     | `in`  |
| `z`     | `of`  |
| `rób`   | `do`  |
| `wykonuj` | `do`  |
| `dopóki`  | `while` |
| `podczas` | `while` |
| `wyjdź`   | `break` |
| `kontynuuj` | `continue` |
| `spróbuj` | `try` |
| `złap` | `catch` |
| `ostatecznie` | `finally` |
| `finalnie` | `finally` |
| `rzuć` | `throw` |
| `zgłoś` | `throw` |
| `mając` | `with` |
| `prawda`   | `true` |
| `tak`    | `true` |
| `fałsz`    | `false` |
| `nie`    | `false` |
| `nic` | `null` |
| `nieskończoność` | `Infinity` |
| `nieliczba`, `nie_liczba` | `NaN` |
| `typ` | `typeof` |
| `instancja` | `instanceof` |
| `klasa` | `class` |
| `interfejs` | `interface` |
| `rozszerza` | `extends` |
| `rzuca` | `throws` |
| `nowy`, `nowa`, `nowe` | `new` |
| `usuń` | `delete` |
| `konstruktor` | `constructor` |
