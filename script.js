class Card {
    constructor(suit, rank, value) {
        this.suit = suit
        this.rank = rank
        this.value = value
    }
}

class Deck {
    constructor() {
        this.cards = []
        this.createDeck()
    }

    createDeck() {
        let suits = ["♠", "♡", "♢", "♣"]
        let ranks = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King']

        for (let i = 0; i<suits.length; i++) {
            for (let j=0; j<ranks.length; j++) {
                this.cards.push(new Card(suits[i], ranks[j], j+1))
            }
        }

        this.shuffle()
    }

    shuffle() { // One shuffling method, there are many!
        this.cards = this.cards.sort((a,b) => 0.5 - Math.random())
    }
}

class GameOfWar {
    constructor() { 
        this.p1 = []
        this.p2 = []
        this.hand1 = []
        this.hand2 = []
        this.init()
        this.battle()
        this.declareWinner()
    }

    init() { // Split the deck in half between the two players
        let deck = new Deck()
        const splitDeck = Math.ceil(deck.cards.length / 2) 
        // The index for half of the deck
        let p1Half = deck.cards.splice(0, splitDeck)
        this.p1.push(...p1Half) // Now p1 has half
        this.p2.push(...deck.cards) // And p2 has what is left
    }

    battle() { // This is what it means to take a turn.
        while (this.p1.length > 0 && this.p2.length > 0) {
            this.hand1 = [this.p1.shift()]
            this.hand2 = [this.p2.shift()]
            if (this.hand1[0].value > this.hand2[0].value) { // p1 wins a round
                this.p1.push(...this.hand2, ...this.hand1)
                console.log("P1 wins this round!")
                this.hand1 = []
                this.hand2 = []
            } else if (this.hand1[0].value < this.hand2[0].value) { // p2 wins a round
                this.p2.push(...this.hand1, ...this.hand2)
                console.log("P2 wins this round!")
                this.hand1 = []
                this.hand2 = []
            } else {
                console.log("Go to war!") // this starts war!
                this.goToWar()
                this.hand1 = []
                this.hand2 = []
            }
        }
    }

    goToWar() {
        let h1war = this.p1.splice(0, 4) //Creates a new array that takes from p1's pile
        let h2war = this.p2.splice(0, 4) //Creates a new array that takes from p2's pile 
        this.hand1.push(...h1war) //Adds it to the hand aka the active cards being played
        this.hand2.push(...h2war) //Adds it to the hand aka the active cards being played
        let h1L = this.hand1.length 
        let h2L = this.hand2.length
        if (this.p1.length < 4) {
            this.p1.push(...this.hand2, ...this.hand1)
            console.log("P1 wins!")
        } else if(this.p2.length < 4) {
            this.p2.push(...this.hand1, ...this.hand2)
            console.log("P2 wins!")
        } else if (this.hand1[h1L-1].value > this.hand2[h2L-1].value) { // p1 wins the war
            this.p1.push(...this.hand2, ...this.hand1)
            console.log("P1 wins the war!")
            this.hand1 = []
            this.hand2 = []
        } else if (this.hand1[h1L-1].value < this.hand2[h2L-1].value) { // p2 wins the war
            this.p2.push(...this.hand1, ...this.hand2)
            console.log("P2 wins the war!")
            this.hand1 = []
            this.hand2 = []
        } else {
            console.log("Go to war again!") // Go to war again
            this.goToWar()
            this.hand1 = []
            this.hand2 = []
        }
    }
    declareWinner () {
        if (this.p1.length === 0) {
            console.log("P2 wins!")
        } else if(this.p2.length === 0) {
            console.log("P1 wins!")
        }
    }
}

let game1 = new GameOfWar()

// console.log(game1)
// console.log(game1.p1.length)
// console.log(game1.p2.length)