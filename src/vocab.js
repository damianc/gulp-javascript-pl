var vocab = {};

/*
 Basic JS statements.
 */
Object.assign(vocab, {
    'zm': 'var',
    'zmienna': 'var',
    'zmienna_blokowa': 'let',
    'stała': 'const',
    'tak': 'true',
    'nie': 'false',
    'prawda': 'true',
    'fałsz': 'false'
});

/**
 * Function thing statements.
 */
Object.assign(vocab, {
    'funkcja': 'function',
    'zwróć': 'return',
    'argumenty': 'arguments',
    'parametry': 'argumenty'
});

/**
 * Generator thing statements.
 */
Object.assign(vocab, {
    'generator': 'function*',
    'dostarcz': 'yield'
});

/**
 * Conditional thing statements.
 */
Object.assign(vocab, {
    'jeśli': 'if',
    'jeżeli': 'if',
    'inaczej': 'else'
});

/**
 * Loop thing statements.
 */
Object.assign(vocab, {
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
Object.assign(vocab, {
    'przełącz': 'switch',
    'gdy': 'case',
    'domyślnie': 'default'
});

/**
 * Exception thing statements.
 */
Object.assign(vocab, {
    'spróbuj': 'try',
    'złap': 'catch',
    'obsłuż': 'catch',
    'ostatecznie': 'finally',
    'finalnie': 'finally'
});

/**
 * OOP thing statements.
 */
Object.assign(vocab, {
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
Object.assign(vocab, {
    'z': 'with'
});

module.exports = vocab;
