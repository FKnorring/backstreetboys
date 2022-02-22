var logIn = document.getElementById("button2");
var signUp = document.getElementById("button1");
var subText = document.getElementById("subtext");
var buttonContainer = document.getElementById("buttonContainer");

function onLoad() {
  //If we want something when the site loads
  setTimeout(moveLoga, 200);
  setTimeout(showButtons, 1200);
}

function moveLoga() {
  var logo = document.getElementById("logo");
  logo.style.top = "2em";
}

function showButtons() {
  logIn.style.opacity = "1";
  signUp.style.opacity = "1";
  subText.style.opacity = "1";
}

function loginButton() {
  buttonContainer.textContent = "";
  buttonContainer.style.background = "transparent";
  buttonContainer.style.boxShadow = "none";
  buttonContainer.style.cursor = "default";
  logIn.style.opacity = "0";
  signUp.style.opacity = "0";

  let form = document.createElement("form");
  let loginbox = document.createElement("div");
  loginbox.setAttribute("class", "loginbox");
  let email = document.createElement("input");
  email.setAttribute("type", "email");
  email.setAttribute("placeholder", " Email");
  let password = document.createElement("input");
  password.setAttribute("type", "password");
  password.setAttribute("placeholder", " Enter password");
  let submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "Login");
  let lostPass = document.createElement("a");
  lostPass.setAttribute("href", "#");
  lostPass.textContent = "Forgot you password?";
  let toggleBox = document.createElement("span");
  toggleBox.setAttribute("class","togglebox");
  let remember = document.createElement("p");
  remember.textContent = "Remember me?"
  let toggle = document.createElement("label");
  toggle.setAttribute("class","switch");
  let toggleInput = document.createElement("input");
  toggleInput.setAttribute("type","checkbox");
  let toggleSlider = document.createElement("span");
  toggleSlider.setAttribute("class","slider round")

  buttonContainer.appendChild(loginbox);
  loginbox.appendChild(form);
  form.appendChild(email);
  form.appendChild(password);
  form.appendChild(toggleBox);
  toggleBox.appendChild(toggle);
  toggleBox.appendChild(remember);
  toggle.appendChild(toggleInput);
  toggle.appendChild(toggleSlider);
  form.appendChild(submit);
  form.appendChild(lostPass);
}

function unlockButton(){
  if(document.getElementById("signup").disabled == false){
    document.getElementById("signup").disabled = true;
  }else{
    document.getElementById("signup").disabled = false;
  }
}

function checkPassword(input){
  var password = document.getElementById("pword");
  if (input.value != password.value) {
    input.setCustomValidity('Password Must be Matching.');
  } else {
    input.setCustomValidity('');
  }
}

function termsAndServices(){
  var textBox = document.getElementById("terms");
  textBox.style.display = "block";
}