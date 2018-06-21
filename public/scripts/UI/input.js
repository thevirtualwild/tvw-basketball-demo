var inputFadeTime = 0.25;

var canvas = document.getElementById("canvas");
var inputForm = document.getElementsByClassName("form")[0];
var errorMessage = inputForm.getElementsByClassName("errorMessage")[0];
var passcodeInput = inputForm.getElementsByClassName("passcodeInput")[0];
errorMessage.style.opacity = 0;

var initPosY;
var body = document.body,
    html = document.documentElement;

var height = Math.max( body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight );

    passcodeInput.defaultValue = "";
    passcodeInput.focus();

function UIInputAnimateIn()
{
    passcodeInput.value = "";
    passcodeInput.focus();
    errorMessage.style.opacity = 0;
    inputPage.style.display = "block";
    customizePage.style.display = "none";
    gameoverPage.style.display = "none";
    TweenMax.to(inputForm, inputFadeTime*3.5, {delay:inputFadeTime, opacity:1});
    TweenMax.to(inputForm, inputFadeTime*3, {delay:inputFadeTime, top:height *.4, ease:Back.easeOut});
}

function UIInputAnimateOut()
{
    //console.log()
    initPosY = parseFloat(inputForm.style.top.substr(0, inputForm.style.top.length-2));
    errorMessage.style.opacity = 0;
    TweenMax.to(inputForm, inputFadeTime*3.5, {delay:inputFadeTime, opacity:0});
    TweenMax.to(inputForm, inputFadeTime*3, {delay:inputFadeTime, top:0, ease:Back.easeIn, onComplete: UICustomizeAnimateIn});
}

function UIInputErrorMessage(message)
{
    errorMessage.style.opacity = 1;
    errorMessage.style.color = "red";
    errorMessage.innerHTML = message;
}