var logIn = document.getElementById("button2");
var signUp = document.getElementById("button1");
var subText = document.getElementById("subtext");

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
    logIn.style.position = "absolute";
    logIn.style.height = "300px";
    logIn.style.width = "300px";
    logIn.textContent = "";
    logIn.style.background = "transparent";
    logIn.style.boxShadow = "none";
    logIn.style.cursor = "default";
    signUp.style.opacity = "0";
    let form = document.createElement('form');
    let loginbox = document.createElement('div');
    loginbox.setAttribute('class', "loginbox");
    let email = document.createElement('input');
    let password = document.createElement('input');
    let submit = document.createElement('input');
    let lostPass = document.createElement('a');
    logIn.appendChild(loginbox);
    loginbox.appendChild(form);
    form.appendChild(email);
    form.appendChild(password);
    form.appendChild(submit);
    form.appendChild(lostPass);
    email.setAttribute('type',"email");
    email.setAttribute('placeholder'," Email");
    password.setAttribute('type',"password");
    password.setAttribute('placeholder'," Enter password");
    submit.setAttribute('type',"submit");
    submit.setAttribute('value',"Login");
    lostPass.setAttribute('href',"#");
    lostPass.innerText("Lost your password?");
}
