var main = function(){
    var $select = $("<select class='wepSelection'>"),
        $rock = $("<option value='rock'>").text("rock"),
        $paper = $("<option value='paper'>").text("paper"),
        $scissors = $("<option value='scissors'>").text("scissors"),
        $lizard = $("<option value='lizard'>").text("lizard"),
        $spock = $("<option value='spock'>").text("spock"),
        $playButton = $("<button>").text("Play");
        $outcome = $("<p>").text("outcome: ");
        $wins = $("<p>").text("wins: ");
        $losses = $("<p>").text("losses: ");
        $ties = $("<p>").text("ties: ");
        $.getJSON("/play/noplay", function(res){
            document.getElementById("info").innerHTML = "outcome: "+res.outcome+"<br>wins: "+res.wins+"<br>losses: "+res.losses+"<br>ties: "+res.ties;
        });

    $("main .content").append($select);
    $("main .wepSelection").append($rock);
    $("main .wepSelection").append($paper);
    $("main .wepSelection").append($scissors);
    $("main .wepSelection").append($lizard);
    $("main .wepSelection").append($spock);
    $("main .content").append($playButton);

    $playButton.on("click", function(){
        var wep = $select.val();
        $.getJSON("/play/" + wep, function(res){
            document.getElementById("info").innerHTML = "outcome: "+res.outcome+"<br>wins: "+res.wins+"<br>losses: "+res.losses+"<br>ties: "+res.ties;
        });
    });
}

$(document).ready(function(){
    main();
});