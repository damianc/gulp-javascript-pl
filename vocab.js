var vocab = {},
    extend;

extend = function (target) {
    var sources = [].slice.call(arguments, 1);

    sources.forEach(function (source) {
        for (var prop in source) {
            target[prop] = source[prop];
        }
    });

    return target;
};

/**
 * Basic JS statements.
 */
extend(vocab, {
    'zm': 'var',
    'zmienna': 'var',
    'stała': 'const',
    'tak': 'true',
    'nie': 'false',
    'prawda': 'true',
    'fałsz': 'false'
});

/**
 * Function thing statements.
 */
extend(vocab, {
    'funkcja': 'function',
    'zwróć': 'return',
    'argumenty': 'arguments',
    'parametry': 'argumenty'
});

/**
 * Generator thing statements.
 */
extend(vocab, {
    'generator': 'function*',
    'dostarcz': 'yield'
});

/**
 * Conditional thing statements.
 */
extend(vocab, {
    'jeśli': 'if',
    'jeżeli': 'if',
    'inaczej': 'else'
});

/**
 * Loop thing statements.
 */
extend(vocab, {
    'przez': 'for',
    'dla': 'for',
    'w': 'in',
    'podczas': 'while',
    'dopóki': 'while',
    'rób': 'do',
    'zrób': 'do',
    'wykonaj': 'do',
    'wykonuj': 'do',
    'wyjdź': 'break',
    'jedź': 'continue',
    'kontynuuj': 'continue'
});

/**
 * Switching thing statements.
 */
extend(vocab, {
    'przełącz': 'switch',
    'gdy': 'case',
    'domyślnie': 'default'
});

/**
 * Exception thing statements.
 */
extend(vocab, {
    'spróbuj': 'try',
    'złap': 'catch',
    'obsłuż': 'catch',
    'ostatecznie': 'finally',
    'finalnie': 'finally'
});

/**
 * OOP thing statements.
 */
extend(vocab, {
    'klasa': 'class',
    'interfejs': 'interface',
    'rozszerza': 'extends',
    'rzuca': 'throws',
    'wyrzuca': 'throws',
    'nowy': 'new',
    'nowa': 'new',
    'nowe': 'new',
    'usuń': 'delete'
});

/**
 * Additional statements.
 */
extend(vocab, {
    'z': 'with'
});

module.exports = vocab;