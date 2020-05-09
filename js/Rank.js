class Rank {
    constructor(tier, rank, wins, losses) {
        this.tier = tier;
        this.rank = rank;
        this.wins = wins;
        this.losses = losses;
        this.winrate = Math.round(((this.wins / (this.wins + this.losses)) * 100) * 100) / 100;
        this.played = this.wins + this.losses;
    }
}
export default Rank;