var fields = document.querySelectorAll("form-user-create [name]");
var user = {};

fields.forEach(function (field, index) {
   
  if (field.name == "gender") {

    if (field.checked === true) {

      user[field.name] = field.value;

    }

  } else {

      user[field.name] = field.value;

  }
});

console.log('Pasou');
console.log('JSON ' , user);
