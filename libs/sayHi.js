function sayHi(person) {
  const name = person.name;
  setTimeout(() => {
    console.log("こんにちは, name: " + name);
    console.log("こんにちは, person.name: " + person.name);
  }, 3000);
}

let someone = { name: "Dan" };
sayHi(someone);

someone.name = "Yuzhi";
sayHi(someone);

someone = { name: "Dominic" };
sayHi(someone);

// ❯ node libs/sayHi.js
// こんにちは,name: Dan
// こんにちは, person.name: Yuzhi
// こんにちは,name: Yuzhi
// こんにちは, person.name: Yuzhi
// こんにちは,name: Dominic
// こんにちは, person.name: Dominic
