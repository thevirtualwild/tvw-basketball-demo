var gameplayFadeTime = 0.5;

var pages = document.getElementsByClassName("pages")[0];
var canvas = document.getElementById("canvas");
var inputForm = document.getElementsByClassName("form")[0];
var customizeForm = document.getElementsByClassName("form")[1];
var gameoverForm = document.getElementsByClassName("form")[2];
var refreshLogo = document.getElementById("refreshLogo");
var refreshImg = document.getElementById("refresh");
var inputPage = document.getElementsByClassName("passcode page")[0];
var customizePage = document.getElementsByClassName("player page")[0];
var gameplayPage = document.getElementsByClassName("gameplay page")[0];
var gameoverPage = document.getElementsByClassName("gameover page")[0];

var headerInstructions = document.getElementById("headerInstructions");
var background = document.getElementById("background");

var body = document.body,
    html = document.documentElement;

var height = Math.max( body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight );

function UIGameplayAnimateIn()
{
    background.style.pointerEvents = "none";
    inputPage.style.pointerEvents = "none";
    customizePage.style.pointerEvents = "none";
    gameoverPage.style.pointerEvents = "none";

    TweenMax.to(headerInstructions, customizeFadeTime, {delay:customizeFadeTime, top:50});
    TweenMax.to(headerInstructions, customizeFadeTime, {delay:customizeFadeTime*2, opacity:1});
}

function UIGameplayAnimateOut()
{
    TweenMax.to(headerInstructions, customizeFadeTime, {delay:customizeFadeTime, top:50});
    TweenMax.to(headerInstructions, customizeFadeTime, {delay:customizeFadeTime, opacity:0, onComplete: UIGameoverAnimateIn});
}
