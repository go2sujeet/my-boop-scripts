/**
	{
		"api":1,
		"name":"Hello Script",
		"description":"Returns a Hello with the name.",
		"author":"sujeet",
		"icon":"quote",
		"tags":"boop,state,script,debug,new,create"
	}
**/
function sayHello(string) {
    return "Hello," + string + "!";
}
  
  function main(input) {
    // logic to check if the input is empty using try catch
    if (input.text == "") {
      input.text = "Please enter your name.";
    } else {
      input.text = sayHello(input.text);
    }
  }