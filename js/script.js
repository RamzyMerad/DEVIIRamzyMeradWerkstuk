import Summoner from "./Summoner.js";
import Match from "./Match.js";
import Rank from "./Rank.js";
import apikey from "./setup.js";
// import Match from "./Match.js";


//code

let search = document.getElementById('searchbar');
let searchAction = document.getElementById('searchlogo');
searchAction.addEventListener('click', getSummonerName);
let summoner;
let matches = [];

async function getSummonerName() {
    let profil = document.getElementById("profilId");
    profil.innerHTML = "";
    console.log(search.value);
    let summonerName = search.value
    let result = await (await fetch(`https://euw1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${summonerName}?api_key=${apikey}`)).json()
    summoner = new Summoner(result.puuid, result.id, result.name, result.profileIconId);
    console.log(summoner);


    let divProfilImage = document.createElement("div");
    divProfilImage.id = "pi";
    divProfilImage.className = "profil_image";
    divProfilImage.style.backgroundImage = `url('../assets/dragon/data/profileicon/${summoner.iconId}.png')`;


    let divProfilInfo = document.createElement("div");
    divProfilInfo.className = "profil_info";

    let h1Username = document.createElement("h1");
    let h1UsernameText = document.createTextNode(summoner.username);
    h1Username.id = "username";
    h1Username.appendChild(h1UsernameText);

    let buttonUpdate = document.createElement("button");
    let buttonUpdateText = document.createTextNode("update");
    buttonUpdate.id = "update";
    buttonUpdate.appendChild(buttonUpdateText);



    divProfilInfo.appendChild(h1Username);
    divProfilInfo.appendChild(buttonUpdate);
    profil.appendChild(divProfilImage);
    profil.appendChild(divProfilInfo);

    getMatchHistory();
    getMastery();
}

async function getMatchHistory() {
    let SH = document.getElementById('SH');
    SH.innerHTML = "";
    let puuid = summoner.puuid;
    let result = await (await fetch(`https://europe.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?count=15&api_key=${apikey}`)).json();
    result.forEach(async (element) => {
        let matchResult = await (await fetch(`https://europe.api.riotgames.com/tft/match/v1/matches/${element}?api_key=${apikey}`)).json();

        let found = matchResult.info.participants.find(el => el.puuid == puuid)
        matchResult.info.game_length = Math.round((matchResult.info.game_length / 60) * 100) / 100 + " min";
        let match = new Match(found.puuid, element, found.companion, found.traits, found.units, matchResult.info.game_length, found.placement);
        matches.push(match);
        // console.log(match.units[0].character_id);


        //Append to html
        match.units.forEach(element => {
            let herosArray = element.character_id.split(["_"]);
            let imageHero = document.createElement("img");
            imageHero.setAttribute("src", `../assets/dragon/champions/${herosArray[1]}.png`)

        });




        let divMatch = document.createElement("div");
        divMatch.className = "match";

        let divMinipp = document.createElement("div");
        divMinipp.className = "minipp";
        divMinipp.style.backgroundImage = `url('../assets/dragon/data/profileicon/${summoner.iconId}.png')`;

        let divMatchInfo = document.createElement("div");
        divMatchInfo.className = "match_info";

        let h2Placement = document.createElement("h2");
        let h2PlacementText = document.createTextNode(match.placement);
        if (match.placement == 1) {
            h2Placement.id = "first_place"
        } else if (match.placement == 2) {
            h2Placement.id = "second_place"
        } else if (match.placement == 3) {
            h2Placement.id = "third_place"
        } else {
            h2Placement.id = "placement"
        }

        let h3Time = document.createElement("h3");
        h3Time.id = "time";
        let h3TimeText = document.createTextNode(match.time);

        let divMatchHeros = document.createElement("div");
        divMatchHeros.className = "matchheros";
        match.units.forEach(element => {
            let herosArray = element.character_id.split(["_"]);
            let imageHero = document.createElement("img");
            imageHero.setAttribute("src", `../assets/dragon/champions/${herosArray[1]}.png`)
            divMatchHeros.appendChild(imageHero);
        });


        divMatchInfo.appendChild(h2Placement);
        h2Placement.appendChild(h2PlacementText);
        h3Time.appendChild(h3TimeText);
        divMatchInfo.appendChild(h3Time);


        divMatch.appendChild(divMinipp);
        divMatch.appendChild(divMatchInfo);
        divMatch.appendChild(divMatchHeros);



        let SH = document.getElementById('SH');
        SH.appendChild(divMatch);


    });

}
async function getMastery() {
    let divRank = document.getElementById("rank");
    divRank.innerHTML = "";

    let result = await (await fetch(`https://euw1.api.riotgames.com/tft/league/v1/entries/by-summoner/${summoner.id}?api_key=${apikey}`)).json();
    console.log(result);
    let rankParent = document.getElementById("boxbox");
    result = result[0];
    let rank = new Rank(result.tier, result.rank, result.wins, result.losses);
    console.log(rank);



    let imageMastery = document.createElement("img");
    imageMastery.setAttribute("src", `../assets/dragon/emblems/Emblem_${rank.tier}.png`);

    let h2Rank = document.createElement("h2");
    let h2RankText = document.createTextNode(`Rank: ${rank.tier} ${rank.rank}`);
    h2Rank.appendChild(h2RankText);

    let h2WinRatio = document.createElement("h2");
    let h2WinRatioText = document.createTextNode(`Win ratio: ${rank.winrate} %`);
    h2WinRatio.appendChild(h2WinRatioText);

    divRank.appendChild(imageMastery);
    divRank.appendChild(h2Rank);
    divRank.appendChild(h2WinRatio);
    rankParent.appendChild(divRank);

}
export default apikey;