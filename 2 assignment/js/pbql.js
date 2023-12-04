'use strict';

/**
 * Телефонная книга
 */
const phoneBook = new Map();

/**
 * Вызывайте эту функцию, если есть синтаксическая ошибка в запросе
 * @param {number} lineNumber – номер строки с ошибкой
 * @param {number} charNumber – номер символа, с которого запрос стал ошибочным
 */
function syntaxError(lineNumber, charNumber) {
    throw new SyntaxError(`SyntaxError: Unexpected token at ${lineNumber}:${charNumber}`);
}

function createContact(name) {
    if (phoneBook.has(name)) {
        return;
    }
    phoneBook.set(name, {'phones': [], 'emails': []});
}


function deleteContact(name) {
    if (!phoneBook.has(name)) {
        return;
    }
    phoneBook.delete(name);
}


function addPhoneAndEmail(name, command) {
    if (!phoneBook.has(name)) {
        return;
    }
    let words = command.split(" ").slice(1);
    let index = 0;
    let numberPattern = /^\d{10}$/;

    // checkForSyntaxWithAnd(words);
    while (words[index] !== "для") {
        let word = words[index];
        if (word === "телефон") {
            let phone = words[index + 1];
            if (!numberPattern.test(phone)) {
                syntaxError(1, 1);
            }
            addPhoneTo(name, phone);
        }
        if (word === "почту") {
            let email = words[index + 1];
            let wordAfterEmail = words[index + 2];
            if (wordAfterEmail !== "для" && wordAfterEmail !== "и") {
                syntaxError(1, 1);
            }
            addEmailTo(name, email);
        }
        index++;
    }
}

function addPhoneTo(name, phone) {
    let personInfo = phoneBook.get(name);
    if (typeof personInfo !== 'undefined') {
        if (!personInfo["phones"].includes(phone)) {
            personInfo["phones"].push(phone)
        }
    }
}

function addEmailTo(name, email) {
    let personInfo = phoneBook.get(name);
    if (typeof personInfo !== 'undefined') {
        if (!personInfo["emails"].includes(email)) {
            personInfo["emails"].push(email)
        }
    }
}


function deletePhoneAndEmail(name, command) {
    if (!phoneBook.has(name)) {
        return;
    }
    let words = command.split(" ").slice(1);
    let index = 0;
    let numberPattern = /^\d{10}$/;

    // checkForSyntaxWithAnd(words);
    while (words[index] !== "для") {
        let word = words[index];
        if (word === "телефон") {
            let phone = words[index + 1];
            if (!numberPattern.test(phone)) {
                syntaxError(1, 1);
            }
            delPhoneFrom(name, phone);
        }
        if (word === "почту") {
            let email = words[index + 1];
            let wordAfterEmail = words[index + 2];
            if (wordAfterEmail !== "для" && wordAfterEmail !== "и") {
                syntaxError(1, 1);
            }
            delEmailFrom(name, email);
        }
        index++;
    }
}


function delPhoneFrom(name, phone) {
    let index;
    let personInfo = phoneBook.get(name);
    if (typeof personInfo !== 'undefined') {
        if (personInfo["phones"].includes(phone)) {
            index = personInfo["phones"].indexOf(phone);
            personInfo["phones"].splice(index, 1);
        }
    }
}

function delEmailFrom(name, email) {
    let index;
    let personInfo = phoneBook.get(name);
    if (typeof personInfo !== 'undefined') {
        if (personInfo["emails"].includes(email)) {
            index = personInfo["emails"].indexOf(email);
            personInfo["emails"].splice(index, 1);
        }
    }
}


function showInfo(command) {
    let parsedSentence = parseShowSentence(command)
    if (parsedSentence === null) {
        syntaxError(1, 1);
    }
    const entries = findEntriesBySubstring(parsedSentence[0]);
    const params = parsedSentence[1];
    let result = [];
    if (entries.length > 0) {
        entries.forEach(([key, value]) => {
            result.push(getNotesFor(params, key, value.phones, value.emails))
        });
    }
    return result;
}

function getNotesFor(params, name, phones, emails) {
    let result = []
    params.forEach((element) => {
        if (element === "имя") {
            result.push(name);
        }
        if (element === "почты") {
            result.push(emails.join(','));
        }
        if (element === "телефоны") {
            result.push(formatPhoneNumbers(phones));
        }
    });
    return result.join(";");
}

function formatPhoneNumbers(phoneNumbers) {
    return phoneNumbers.map(phoneNumber => {
        if (/^\d{10}$/.test(phoneNumber)) {
            const digits = phoneNumber.split('');
            return `+7 (${digits[0]}${digits[1]}${digits[2]}) ${digits[3]}${digits[4]}${digits[5]}-${digits[6]}${digits[7]}-${digits[8]}${digits[9]}`;
        } else {
            return phoneNumber;
        }
    });
}

function findEntriesBySubstring(substring) {
    const result = [];
    for (const [key, value] of phoneBook) {
        let phones = value.phones.join(" ")
        let emails = value.emails.join(" ")
        if (key.includes(substring) || phones.includes(substring) || emails.includes(substring)) {
            result.push([key, value]);
        }
    }
    return result;
}

function parseShowSentence(sentence) {
    // Регулярное выражение для поиска шаблона "Покажи <поля> для контактов, где есть <запрос>"
    var pattern = /Покажи ((?:почты|телефоны|имя)(?: и (?:почты|телефоны|имя))*) для контактов, где есть ([^;]+)/;

    // Поиск совпадений в предложении
    var match = sentence.match(pattern);

    if (match) {
        // Извлечение полей из совпадения
        var fieldsStr = match[1];
        var query = match[2];
        // Разделение строк полей и удаление лишних пробелов
        var fields = fieldsStr.split(' и ').map(function (field) {
            return field.trim();
        });

        return [query, fields];
    } else {
        return null;
    }
}


function parseDeleteSentence(sentence) {
    var pattern = /Удали контакты, где есть ([^;]+)/;
    var match = sentence.match(pattern);
    if (match) {
        return match[1]
    }
    else {
        return null;
    }
}

function findAndDeleteFromContacts(command) {

    let phrase = parseDeleteSentence(command);
    if (phrase === null) {
        syntaxError(1, 1);
    }
    const entries = findEntriesBySubstring(phrase);
    entries.forEach(([key, value]) => {
        deleteContact(key);
    })
}

function reformatShowList(showList) {
    return showList.flat(1)
}


/**
 * Выполнение запроса на языке pbQL
 * @param {string} query
 * @returns {string[]} - строки с результатами запроса
 */
function run(query) {
    let commandList = query.split(";");
    let showList = []
    for (let i = 0; i < commandList.length; i++) {
        let command = commandList[i];
        if (command.startsWith("Создай")) {
            let name = command.substring(command.lastIndexOf(" ") + 1);
            createContact(name);
        } else if (command.startsWith("Удали контакт")) {
            let name = command.substring(command.lastIndexOf(" ") + 1);
            deleteContact(name);
        } else if (command.startsWith("Добавь")) {
            let name = command.substring(command.lastIndexOf(" ") + 1);
            addPhoneAndEmail(name, command);
        } else if (command.startsWith("Удали телефон") || command.startsWith("Удали почту")) {
            let name = command.substring(command.lastIndexOf(" ") + 1);
            deletePhoneAndEmail(name, command);
        } else if (command.startsWith("Покажи")) {
            let infoArray = showInfo(command);
            if (infoArray.length > 0) {
                showList.push(infoArray);
            }
        } else if (command.startsWith("Удали контакты")) {
            findAndDeleteFromContacts(command);
        }
    }
    return reformatShowList(showList);
}

module.exports = {phoneBook, run};


// Пример 1
// console.log(run('Покажи имя для контактов, где есть ий;'))
/*
    []
*/

// Пример 2
// console.log(run(
//     'Создай контакт Григорий;' +
//     'Создай контакт Василий;' +
//     'Создай контакт Иннокентий;' +
//     'Покажи имя для контактов, где есть ий;'
// ))
/*
    [
        'Григорий',
        'Василий',
        'Иннокентий'
    ]
*/

// Пример 3
// console.log(run(
//     'Создай контакт Григорий;' +
//     'Создай контакт Василий;' +
//     'Создай контакт Иннокентий;' +
//     'Покажи имя и имя и имя для контактов, где есть ий;'
// ))
/*
    [
        'Григорий;Григорий;Григорий',
        'Василий;Василий;Василий',
        'Иннокентий;Иннокентий;Иннокентий'
    ]
*/
// Пример 4
// console.log(run(
//     'Создай контакт Григорий;' +
//     'Покажи имя для контактов, где есть ий;' +
//     'Покажи имя для контактов, где есть ий;'
// ))
/*
    [
        'Григорий',
        'Григорий'
    ]
*/

// Пример 5
// console.log(run(
//     'Создай контакт Григорий;' +
//     'Удали контакт Григорий;' +
//     'Покажи имя для контактов, где есть ий;'
// ))
/*
    []
*/

// Пример 6
// console.log(run(
//     'Создай контакт Григорий;' +
//     'Добавь телефон 5556667787 для контакта Григорий;' +
//     'Добавь телефон 5556667788 и почту grisha@example.com для контакта Григорий;' +
//     'Покажи имя и телефоны и почты для контактов, где есть ий;'
// ))
/*
    [
        'Григорий;+7 (555) 666-77-87,+7 (555) 666-77-88;grisha@example.com'
    ]
*/

// Пример 7
// console.log(run(
//     'Создай контакт Григорий;' +
//     'Добавь телефон 5556667788 для контакта Григорий;' +
//     'Удали телефон 5556667788 для контакта Григорий;' +
//     'Покажи имя и телефоны для контактов, где есть ий;'
// ))
/*
    [
        'Григорий;'
    ]
*/
