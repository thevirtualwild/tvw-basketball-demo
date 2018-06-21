var textFadeTime = 0.25;

var canvas = document.getElementById("canvas");


var footerLeft = document.getElementById("footerLeft");
var footerCenter = document.getElementById("footerCenter");
var playNow= document.getElementById("playNow");
var comboBadge= document.getElementById("comboBadge");
var results = document.getElementById("results");
var inner = document.getElementById("inner");

var attractLeftStep1 = document.getElementById("footerLeft").getElementsByClassName("attractLeft")[0];
var attractRightStep1 = document.getElementById("footerLeft").getElementsByClassName("attractRight")[0];

var attractLeftStep2 = document.getElementById("footerCenter").getElementsByClassName("attractLeft")[0];
var attractRightStep2 = document.getElementById("footerCenter").getElementsByClassName("attractRight")[0];

var waitingLeft = document.getElementById("footerLeft").getElementsByClassName("waitingLeft")[0];
var waitingRight = document.getElementById("footerCenter").getElementsByClassName("waitingRight")[0];
var textWaiting = waitingRight.getElementsByClassName("textWaiting")[0];

var initFooterLeftWidth;
var initFooterCenterWidth;
var initWaitingLeftWidth;
var attractLeftStepNum = document.getElementById("footerLeft").getElementsByClassName("stepNum");
var initAttractLoad = true;
var attractIsAnimating = false;
function UIAttractAnimateIn()
{
    if(!attractIsAnimating)
    {
        turnOnAttract();
        attractIsAnimating = true;
        console.log("UIATTRACTANIMATEIN");
        inner.style.backgroundColor = "transparent";
        results.style.display = "none";
        TweenMax.from(footer, textFadeTime, {backgroundPositionY:200});
        TweenMax.from(footerLeft, textFadeTime, {top:200});
        TweenMax.from(footerCenter, textFadeTime, {top:200});
        TweenMax.from(playNow, textFadeTime * 3, {opacity: 1, repeat: -1,  ease:Power2.easeIn, yoyo:true});
        TweenMax.from(attractLeftStep1, textFadeTime, {delay: 2*textFadeTime, opacity:0});
        TweenMax.from(attractRightStep1, textFadeTime, {delay: 2*textFadeTime, opacity:0});
        TweenMax.from(attractLeftStep2, textFadeTime, {delay: 2*textFadeTime, opacity:0});
        TweenMax.from(attractRightStep2, textFadeTime, {delay: 2*textFadeTime, opacity:0, onComplete:animatingOff});
    }

}

function UIAttractAnimateOut()
{
    TweenMax.to(attractLeftStep1, textFadeTime, {opacity:0});
    TweenMax.to(attractRightStep1, textFadeTime, {opacity:0});
    TweenMax.to(attractLeftStep2, textFadeTime, {opacity:0});
    TweenMax.to(attractRightStep2, textFadeTime, {opacity:0});

    TweenMax.to(playNow, textFadeTime, {opacity:0});
    TweenMax.to(comboBadge, textFadeTime, {opacity:0});

    TweenMax.to(footerLeft, textFadeTime, {delay: textFadeTime*2, width:202, onComplete: turnOffAttract});
}

function turnOnAttract()
{
    attractLeftStep1.style.display = "inline";
    attractRightStep1.style.display = "inline";
    attractLeftStep2.style.display = "inline";
    attractRightStep2.style.display = "inline";

    attractLeftStep1.style.opacity = 1;
    attractLeftStep2.style.opacity = 1;
    attractRightStep1.style.opacity = 1;
    attractRightStep2.style.opacity = 1;

    footer.style.backgroundPositionY = 0;
    footerLeft.style.top = 0;
    footerCenter.style.top = 0;

    playNow.style.opacity = 0;
    comboBadge.style.opacity = 0;

    if(initAttractLoad)
    {
        initWaitingLeftWidth = waitingLeft.offsetWidth;
        initAttractLoad = false;
    }
    else
    {
        footerLeft.style.width = "auto";
        footerCenter.style.width = "auto";
    }
    waitingLeft.style.display = "none";
    waitingRight.style.display = "none";
}

function turnOffAttract()
{
    attractLeftStep1.style.display = "none";
    attractRightStep1.style.display = "none";
    attractLeftStep2.style.display = "none";
    attractRightStep2.style.display = "none";

    UIWaitingAnimateIn();
}

function UIAttractUpdateCourtName(name)
{
    attractRightStep2.innerHTML = "<h2>THEN ENTER</h2><h2>CODE '<span id=\"courtCode\">" + name + "</span>'</h2>";
}

function animatingOff()
{
    attractIsAnimating = false;
}