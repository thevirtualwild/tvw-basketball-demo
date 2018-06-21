var textFadeTime = .5;

var canvas = document.getElementById("canvas");
var transitioned = false;

var footerLeft = document.getElementById("footerLeft");
var footerCenter = document.getElementById("footerCenter");
var playNow= document.getElementById("playNow");
var comboBadge= document.getElementById("comboBadge");

//var waitingLeft = document.getElementById("footerLeft").getElementsByClassName("waitingLeft")[0];
//var waitingRight = document.getElementById("footerCenter").getElementsByClassName("waitingRight")[0];
var countdown = waitingLeft.getElementsByClassName("textCountdown")[0];
//var textWaiting = waitingRight.getElementsByClassName("textWaiting")[0];
var initWaitingLeftTextPos;

function UIWaitingAnimateIn()
{
    //initWaitingLeftTextPos = textWaiting.style.left;
    console.log(initWaitingLeftTextPos);
    transitioned = false;
    turnOnWaiting();

    //textWaiting.style.left = footerWidth + "px";
    TweenMax.from(countdown, textFadeTime, {opacity:0});
    TweenMax.from(textWaiting, textFadeTime, {opacity:0});
}

function turnOnWaiting()
{
    waitingLeft.style.display = "inline";
    waitingRight.style.display = "inline"
    countdown.style.opacity = 1;
    textWaiting.style.opacity = 1;
    textWaiting.style.left = "9%";
}

function UIWaitingAnimateOut()
{
    TweenMax.to(countdown, textFadeTime, {opacity:0, delay: textFadeTime, onComplete: UIGameplayAnimateIn});
    TweenMax.to(textWaiting, textFadeTime/2, {opacity:0, delay: textFadeTime});
    TweenMax.to(textWaiting, textFadeTime, {left: initWaitingLeftWidth + 300 , delay: textFadeTime})
}

function UIWaitingUpdateClock(time)
{
    countdown.innerHTML = (Math.ceil(time.toFixed(2)) + 1).toString();

    if(time+1  <= 0 && transitioned == false)
    {
        transitioned=  true;
        countdown.innerHTML = "0";
        if(hasplayer)
        UIWaitingAnimateOut();
    }
    else if(time+1<0)
    {
        countdown.innerHTML = "0";
    }
}