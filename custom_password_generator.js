// boop script for custom password generator
/**
{
    "api":1,
    "name":"Custom Password Generator",
    "description":"Generates a custom password.",
    "author":"sujeet",
    "icon":"quote",
    "tags":"boop,state,script,debug,new,create,password"
}
**/
function passwordGenerator(lengthOfPassword) {
    // password should contain at least one uppercase letter, one lowercase letter, one number and one special character
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialCharacters = "!@#$%^&*()_+";
    let password = "";
    let i = 0;
    while (i < lengthOfPassword) {
      password += uppercase[Math.floor(Math.random() * uppercase.length)];
      password += lowercase[Math.floor(Math.random() * lowercase.length)];
      password += numbers[Math.floor(Math.random() * numbers.length)];
      password += specialCharacters[Math.floor(Math.random() * specialCharacters.length)];
      i += 4;
    }
    return password.slice(0, lengthOfPassword);
}

function main(input) {
    // logic to check if the input is a valid number
    if (isNaN(input.text)) {
      input.text = "Please enter a valid number.";
    } else {
      const length = parseInt(input.text);
      if(length < 6) {
        input.text = "Password length should be at least 4.";
      }else {
        input.text = passwordGenerator(length);
      }
    }
}