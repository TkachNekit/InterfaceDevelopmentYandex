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
    throw new Error(`SyntaxError: Unexpected token at ${lineNumber}:${charNumber}`);
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
                throw new SyntaxError();                                                          //// Syntax
            }
            addPhoneTo(name, phone);
        }
        if (word === "почту") {
            let email = words[index + 1];
            let wordAfterEmail = words[index + 2];
            if (wordAfterEmail !== "для" && wordAfterEmail !== "и") {
                throw new SyntaxError();                                                          //// Syntax
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
                throw new SyntaxError();                                                          //// Syntax
            }
            delPhoneFrom(name, phone);
        }
        if (word === "почту") {
            let email = words[index + 1];
            let wordAfterEmail = words[index + 2];
            if (wordAfterEmail !== "для" && wordAfterEmail !== "и") {
                throw new SyntaxError();                                                          //// Syntax
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


// function showInfo(name, command)


/**
 * Выполнение запроса на языке pbQL
 * @param {string} query
 * @returns {string[]} - строки с результатами запроса
 */
function run(query) {
    let commandList = query.split(";");
    for (let i = 0; i < commandList.length; i++) {
        let command = commandList[i];
        if (command.startsWith("Создай")) {
            let name = command.substring(command.lastIndexOf(" ") + 1);
            createContact(name);
        }
        if (command.startsWith("Удали контакт")) {
            let name = command.substring(command.lastIndexOf(" ") + 1);
            deleteContact(name);
        }
        if (command.startsWith("Добавь")) {
            let name = command.substring(command.lastIndexOf(" ") + 1);
            addPhoneAndEmail(name, command);
        }
        if (command.startsWith("Удали телефон") || command.startsWith("Удали почту")) {
            let name = command.substring(command.lastIndexOf(" ") + 1);
            deletePhoneAndEmail(name, command);
        }
        if (command.startsWith("Покажи")) {
            showInfo(command);
        }
        console.log(phoneBook);
    }
    return [];
}

run("Создай контакт Григорий;Удали контакт Григорий;Создай контакт Григорий;" +
    "Добавь телефон 5556667788 и телефон 5556667788 и почту grisha@example.com и почту grisha@example.com для контакта Григорий;" +
    "Создай контакт Гоша;Добавь телефон 1234567890 и почту почта@yandex.ru для контакта Гоша;" +
    "Удали телефон 5556667788 для контакта Григорий;Удали телефон 1234567890 и почту почта@yandex.ru для контакта Гоша;")
module.exports = {phoneBook, run};