var textFadeTimeResults = .5;

var canvas = document.getElementById("canvas");

var footer = document.querySelector("footer");
var footerLeft = document.getElementById("footerLeft");
var footerCenter = document.getElementById("footerCenter");
var playNow= document.getElementById("playNow");
var comboBadge= document.getElementById("comboBadge");
var inner = document.getElementById("inner");
var results = document.getElementById("results");
var topScore = document.getElementById("topScore");
var yourScore = document.getElementById("yourScore");

var topFirstName = topScore.getElementsByClassName("scoreContainer")[0].getElementsByClassName("playerName")[0].getElementsByClassName("firstName")[0];
var topLastName = topScore.getElementsByClassName("scoreContainer")[0].getElementsByClassName("playerName")[0].getElementsByClassName("lastName")[0];

var yourFirstName = yourScore.getElementsByClassName("scoreContainer")[0].getElementsByClassName("playerName")[0].getElementsByClassName("firstName")[0];
var yourLastName = yourScore.getElementsByClassName("scoreContainer")[0].getElementsByClassName("playerName")[0].getElementsByClassName("lastName")[0];

var gameplayRight = document.getElementById("footerCenter").getElementsByClassName("gameplayRight")[0];

var yourScoreText = yourScore.getElementsByClassName("scoreContainer")[0].getElementsByClassName("scoreNum")[0];
var topScoreText = topScore.getElementsByClassName("scoreContainer")[0].getElementsByClassName("scoreNum")[0];

var team1Name = document.getElementById("team1").getElementsByClassName("teamName")[0];
var team2Name = document.getElementById("team2").getElementsByClassName("teamName")[0];
var team3Name = document.getElementById("team3").getElementsByClassName("teamName")[0];

var team1Score = document.getElementById("team1").getElementsByClassName("scoreNum")[0];
var team2Score = document.getElementById("team2").getElementsByClassName("scoreNum")[0];
var team3Score = document.getElementById("team3").getElementsByClassName("scoreNum")[0];

var teamScores = document.getElementById("teamScores");

var team1 = document.getElementById("team1");
var team2 = document.getElementById("team2");
var team3 = document.getElementById("team3");

//UIResultsAnimateIn();
//UIResultsAnimateOut();

var body = document.body,
    html = document.documentElement;

var height = Math.max( body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight );

var width = Math.max(
    document.documentElement["clientWidth"],
    document.body["scrollWidth"],
    document.documentElement["scrollWidth"],
    document.body["offsetWidth"],
    document.documentElement["offsetWidth"]
);

var winner = false;

var widthTweenDistance;
var heightTweenDistance;

yourFirstName.innerHTML = "";
yourLastName.innerHTML = "";

topFirstName.innerHTML = "";
topLastName.innerHTML = "";

topScoreText.innerHTML = "21";
yourScoreText.innerHTML = "12";

var animating = false;
var currentScore;
var currentName;
function UIResultsAnimateIn()
{
    console.log("ANIMATE RESULTS IN");
    animating = false;
    yourScore.style.opacity = 0;
    topScore.style.opacity = 0;
    playNow.style.opacity = 0;
    comboBadge.style.opacity = 0;

    team1Name.style.color = primaryTeam.colorHex;
    team2Name.style.color = secondaryTeam.colorHex;
    team3Name.style.color = tertiaryTeam.colorHex;

    teamScores.style.opacity = 0;
    team1.style.opacity = 0;
    team2.style.opacity = 0;
    team3.style.opacity = 0;

    topScore.style.marginLeft = (width + "px").toString();
    yourScore.style.marginRight = (width + "px").toString();

    team1.style.marginTop = (height + "px").toString();
    team2.style.marginTop = (height + "px").toString();
    team3.style.marginTop = (height + "px").toString();

    footer.style.backgroundPositionY = "200px";
    footerLeft.style.top = "200px";
    footerCenter.style.top = "200px";

    results.style.display = "inline";

    inner.style.backgroundColor = "transparent";

    TweenMax.to(inner, textFadeTime, {backgroundColor: "rgba(0,0,0,0.8)"});

    TweenMax.to(topScore, textFadeTimeResults, {delay: textFadeTimeResults, marginLeft: 0, ease:Back.easeOut});
    TweenMax.to(topScore, textFadeTimeResults*2, {delay: textFadeTimeResults, opacity: 1});

    if(!winner)
    {
        console.log("TWEENING IN YOUR LOSER SCORE");
        TweenMax.to(yourScore, textFadeTimeResults, {delay: textFadeTimeResults*2, marginRight: 0, ease:Back.easeOut});
        TweenMax.to(yourScore, textFadeTimeResults*2, {delay: textFadeTimeResults*2, opacity: 1});
    }

    TweenMax.to(teamScores, textFadeTimeResults, {delay: textFadeTimeResults*3, opacity: 1});

    TweenMax.to(team1, textFadeTimeResults, {delay: textFadeTimeResults*3.5, marginTop: 0, ease:Back.easeOut});
    TweenMax.to(team1, textFadeTimeResults*2, {delay: textFadeTimeResults*3.5, opacity: 1});

    TweenMax.to(team2, textFadeTimeResults, {delay: textFadeTime*3.7, marginTop: 0, ease:Back.easeOut});
    TweenMax.to(team2, textFadeTimeResults*2, {delay: textFadeTime*3.7, opacity: 1});

    TweenMax.to(team3, textFadeTimeResults, {delay: textFadeTimeResults*3.9, marginTop: 0, ease:Back.easeOut});
    TweenMax.to(team3, textFadeTimeResults*2, {delay: textFadeTimeResults*3.9, opacity: 1});
}

function UIResultsAnimateOut()
{
    if(animating) return;

    TweenMax.to(topScore, textFadeTimeResults, {delay: textFadeTimeResults, marginLeft: width, ease:Back.easeOut});
    TweenMax.to(topScore, textFadeTimeResults, {delay: textFadeTimeResults, opacity: 0});
    TweenMax.to(yourScore, textFadeTimeResults, {delay: textFadeTimeResults, marginRight: width, ease:Back.easeOut});
    TweenMax.to(yourScore, textFadeTimeResults, {delay: textFadeTimeResults, opacity: 0});

    TweenMax.to(teamScores, textFadeTimeResults, {delay: textFadeTimeResults, opacity: 0});

    TweenMax.to(team1, textFadeTimeResults, {delay: textFadeTimeResults, marginTop: height, ease:Back.easeOut});
    TweenMax.to(team1, textFadeTimeResults, {delay: textFadeTimeResults, opacity: 0});

    TweenMax.to(team2, textFadeTimeResults, {delay: textFadeTimeResults, marginTop: height, ease:Back.easeOut});
    TweenMax.to(team2, textFadeTimeResults, {delay: textFadeTimeResults, opacity: 0});

    TweenMax.to(team3, textFadeTimeResults, {delay: textFadeTimeResults, marginTop: height, ease:Back.easeOut});
    TweenMax.to(team3, textFadeTimeResults, {delay: textFadeTimeResults, opacity: 0});

    TweenMax.to(inner, textFadeTimeResults, {backgroundColor: "rgba(0,0,0,0.0)", delay:textFadeTimeResults});

    animating = true;

    currentScore = 0;
}

function UIResultsUpdateName(name)
{
    currentName = name;
    yourFirstName.innerHTML = name.substr(0, name.indexOf(' '));
    yourLastName.innerHTML = name.substr(name.indexOf(' ') + 1);
}

function UIResultsUpdateScore(playerScore)
{
    if(playerScore === undefined){
        currentScore = 0;
        yourScoreText.innerHTML = currentScore.toString();
    }
    else {
        currentScore = playerScore;
        yourScoreText.innerHTML = playerScore.toString();
    }

}

function UIResultsSetData(data) {
    if(data.resultsdata.highscorer === undefined)
    {
        winner = true;
        topScoreText.innerHTML = currentScore.toString();
        topFirstName.innerHTML = currentName.substr(0, currentName.indexOf(' '));
        topLastName.innerHTML = currentName.substr(currentName.indexOf(' ') + 1);
        yourScore.style.display = "none";
        console.log("HI SCORER IS UNDEFINED");
    }
    else
    {

        if(currentScore === undefined){
            currentScore = 0;
            yourScoreText.innerHTML = currentScore.toString();
        }


        if(currentScore >= data.resultsdata.highscorer.score)
        {
            winner = true;
            topScoreText.innerHTML = currentScore.toString();
            topFirstName.innerHTML = currentName.substr(0, currentName.indexOf(' '));
            topLastName.innerHTML = currentName.substr(currentName.indexOf(' ') + 1);
            yourScore.style.display = "none";

            console.log("YOU ARE HIGH SCORER " + currentScore + " top score " + data.resultsdata.highscorer.score);

        }
        else
        {
            winner = false;
            var name = data.resultsdata.highscorer.player.username;
            topFirstName.innerHTML = name.substr(0, name.indexOf(' '));
            topLastName.innerHTML = name.substr(name.indexOf(' ') + 1);
            topScoreText.innerHTML = data.resultsdata.highscorer.score;
            yourScoreText.innerHTML = currentScore.toString();
            yourScore.style.display = "block";
            console.log("YOU LOST TO HIGH SCORER " + currentScore + " top score " + data.resultsdata.highscorer.score);

        }
    }

    for (ateam in data.resultsdata.teamscores) {
        if(primaryTeam.name == data.resultsdata.teamscores[ateam].name) {
            team1Name.innerHTML = data.resultsdata.teamscores[ateam].name;
            team1Score.innerHTML = data.resultsdata.teamscores[ateam].score;
        }
        else if(secondaryTeam.name == data.resultsdata.teamscores[ateam].name) {
            team2Name.innerHTML = data.resultsdata.teamscores[ateam].name;
            team2Score.innerHTML = data.resultsdata.teamscores[ateam].score;
        }
        else if(tertiaryTeam.name == data.resultsdata.teamscores[ateam].name) {
            team3Name.innerHTML = data.resultsdata.teamscores[ateam].name;
            team3Score.innerHTML = data.resultsdata.teamscores[ateam].score;
        }
    }
}