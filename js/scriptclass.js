import apikey from "./setup.js";
import Summoner from "./Summoner.js";
import Rank from "./Rank.js";

console.log(apikey);
getRanking();
let challengers = [];
async function getRanking() {


    let result = await (await fetch(`https://euw1.api.riotgames.com/tft/league/v1/challenger?api_key=${apikey}`)).json();
    result = result.entries;
    for (let i = 0; i < 20; i++) {
        let pp = await (await fetch(`https://euw1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${result[i].summonerName}?api_key=${apikey}`)).json();
        console.log(pp);
        let summoner = new Summoner(0, result[i].summonerId, result[i].summonerName, pp.profileIconId, new Rank("challenger", result[i].rank, result[i].wins, result[i].losses), i + 1);
        challengers.push(summoner);



    }

    challengers.forEach(summoner => {
        //info in html plaatsen
        let divClassements = document.getElementById("class_info");

        let divClassplayer = document.createElement("div");
        divClassplayer.className = "classplayer";

        let divPlace = document.createElement("div");
        divPlace.className = "place";

        let divPlayername = document.createElement("div");
        divPlayername.className = "playername";
        let divPlayernameImage = document.createElement("img");
        divPlayernameImage.setAttribute("src", `../assets/dragon/data/profileicon/${summoner.iconId}.png`);
        divPlayername.appendChild(divPlayernameImage);

        let divTier = document.createElement("div");
        divTier.className = "tier";

        let divWin = document.createElement("div");
        divWin.className = "win";

        let divTotal = document.createElement("div");
        divTotal.className = "total"

        let h3place = document.createElement("h3");
        h3place.id = "place";
        let h3placeText = document.createTextNode(summoner.place);


        let h3Playername = document.createElement("h3");
        h3Playername.id = "playername";
        let h3PlayernameText = document.createTextNode(summoner.username);

        let h3Tier = document.createElement("h3");
        h3Tier.id = "tier";
        let h3TierText = document.createTextNode(summoner.rank.tier + " " + summoner.rank.rank);

        let h3Win = document.createElement("h3");
        h3Win.id = "win";
        let h3WinText = document.createTextNode(summoner.rank.wins);

        let h3Total = document.createElement("h3");
        h3Total.id = "total";
        let h3TotalText = document.createTextNode(summoner.rank.played);


        h3place.appendChild(h3placeText);
        h3Tier.appendChild(h3TierText);
        h3Playername.appendChild(h3PlayernameText);
        h3Win.appendChild(h3WinText);
        h3Total.appendChild(h3TotalText);

        divPlace.appendChild(h3place);
        divPlayername.appendChild(h3Playername);
        divTier.appendChild(h3Tier);
        divWin.appendChild(h3Win);
        divTotal.appendChild(h3Total);

        divClassplayer.appendChild(divPlace);
        divClassplayer.appendChild(divPlayername);
        divClassplayer.appendChild(divTier);
        divClassplayer.appendChild(divWin);
        divClassplayer.appendChild(divTotal);


        divClassements.appendChild(divClassplayer);


    });

    console.log(challengers);
}