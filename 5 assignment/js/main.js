var student = { name: 'Ivan'};

Object.defineProperty(student, 'type', {
    enumerable: false,
    value: 'student'
});

console.log(student.hasOwnProperty('name'));
console.log(student.hasOwnProperty('type'));
console.log(student.hasOwnProperty('toString'));
console.log('type' in student);
console.log('toString' in student)