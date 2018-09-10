# gulp-javascript-pl

That's a Gulp plugin whereby you can write JavaScript code in Polish.Transpiles a code written in JavaScript PL into code written in pure JavaScript, having replaced Polish keywords with JavaScript ones.

## JavaScript PL scripts

Keep in mind that when writing Polish code, the code still remains JavaScript code. Only difference is what keywords are in use.
An example code is shown below. Files containing Polish JavaScript code have extension `.jspl`.

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

The code above is to be transpiled to the form like below.

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

## Built-in dictionary

By default, the plugin provides a set of built-in keywords in Polish language.
All ones are listed in the attached table below.

| Input keyword (JavaScript PL) | Output keyword (JavaScript) |
|-------------------------------|-----------------------------|
| `zm`         | `var`      |
| `zmienna`    | `var`      |
| `zmienna_blokowa` | `let`   |
| `stała`      | `const`   |
