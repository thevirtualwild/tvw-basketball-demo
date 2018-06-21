var textFadeTime = .5;

var canvas = document.getElementById("canvas");

var footer = document.querySelector("footer");
var footerLeft = document.getElementById("footerLeft");
var footerCenter = document.getElementById("footerCenter");
var playNow= document.getElementById("playNow");
var comboBadge= document.getElementById("comboBadge");
var comboNumText = document.getElementById("comboNum");
var streak = document.getElementById("streak");
var sparkle = comboBadge.getElementsByClassName("sparkle")[0];

var gameplayLeft = document.getElementById("footerLeft").getElementsByClassName("gameplayLeft")[0];
var gameplayRight = document.getElementById("footerCenter").getElementsByClassName("gameplayRight")[0];
var scoreText = gameplayLeft.getElementsByClassName("textScore")[0];
var scoreLabel = gameplayLeft.getElementsByClassName("textScoreLabel")[0];
var firstName = gameplayRight.getElementsByClassName("textGameplayFirst")[0];
var lastName = gameplayRight.getElementsByClassName("textGameplayLast")[0];
var footerWidth;

function UIGameplayAnimateIn()
{
    footerWidth = initWaitingLeftWidth;
    footerCenter.style.width = initWaitingLeftWidth + "px";
    //console.log(footerWidth);
    initLeftPos = firstName.style.left;
    //console.log(initLeftPos);
    waitingLeft.style.display = "none";
    waitingRight.style.display = "none";

    gameplayLeft.style.display = "inline";
    gameplayRight.style.display = "inline"

    gameplayLeft.style.opacity = 0;
    firstName.style.opacity = 0;
    lastName.style.opacity = 0;
    firstName.style.left = "0px";
    lastName.style.left = "0px";

    scoreText.style.opacity= 0;
    scoreLabel.style.lineHeight = 0;

    //console.log(initWaitingLeftWidth);
    //TweenMax.to(scoreLabel, textFadeTime, {lineHeight:40});
    TweenMax.to(gameplayLeft, textFadeTime, {opacity:1, delay: textFadeTime});
    TweenMax.to(scoreText, textFadeTime, {opacity:1, delay: textFadeTime});


    TweenMax.to(firstName, textFadeTime, {opacity:1, delay: textFadeTime, left:(canvas.width * .09) - initWaitingLeftWidth/4});
    TweenMax.to(lastName, textFadeTime, {opacity:1, delay: textFadeTime, left: canvas.width * .09 - initWaitingLeftWidth/4});
}

function UIGameplayAnimateOut()
{
    footer.style.backgroundPositionY = "0";
    footerLeft.style.top = "0";
    footerCenter.style.top = "0";

    TweenMax.to(footer, textFadeTime, {backgroundPositionY:200, delay:2});
    TweenMax.to(footerLeft, textFadeTime, {top:200, delay:2});
    TweenMax.to(footerCenter, textFadeTime, {top:200, onComplete: turnOffDisplay, delay:2});
    TweenMax.to(firstName, textFadeTime, {opacity:1, delay: 2.1, left:footerWidth + 300});
    TweenMax.to(lastName, textFadeTime, {opacity:1, delay: 2.2, left:footerWidth + 300});
}

function UIGameplayUpdateScore(scoreInput)
{
    scoreText.innerHTML = scoreInput.toString();
    TweenMax.to(scoreText, 0.1, {scaleX:1.2, scaleY:1.2, repeat: 1, yoyo:true});
}

function UIGameplayUpdateName(name)
{
    firstName.innerHTML = name.substr(0, name.indexOf(' '));
    lastName.innerHTML = name.substr(name.indexOf(' ') + 1);
}

function UIGameplayAnimateBadgeOn(comboNum)
{
    comboNumText.innerHTML = comboNum.toString();


    if(comboNum == 2)
    {
        TweenMax.to(comboNumText, 0.1, {opacity: 1});
        TweenMax.to(comboBadge, 0.1, {opacity: 1});
    }

    TweenMax.to(comboNumText, 0.1, {scaleX:1.2, scaleY:1.2, repeat: 1, yoyo:true});

    TweenMax.to(sparkle, 0.01, {rotation:0});
    TweenMax.to(sparkle, 0.3, {scaleX:1, scaleY:1, ease:Back.easeOut});
    TweenMax.to(sparkle, .7, {delay: 0.1, rotation:180, ease:Power2.easeNone});
    TweenMax.to(sparkle, 0.3, {delay: 0.5, scaleX:0, scaleY:0});
}

function UIGameplayAnimateBadgeOff()
{
    TweenMax.to(comboBadge, 0.1, {opacity: 0});
}

function turnOffDisplay()
{
    gameplayLeft.style.display = "none";
    gameplayRight.style.display = "none";

    UIResultsAnimateIn();
}

