class Summoner {
    constructor(puuid = 0, id = 0, username = "", iconId = "", rank = {}, place = 0) {
        this.puuid = puuid;
        this.id = id;
        this.username = username;
        this.iconId = iconId;
        this.rank = rank;
        this.place = place;
    }
}
export default Summoner;