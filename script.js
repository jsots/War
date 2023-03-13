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
        this
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
    constructor() { // Split deck in half between the two players.
        this.p1 = []
        this.p2 = []
        this.hand1 = []
        this.hand2 = []
        this.init()
        this.battle()
    }

    init() {
        let deck = new Deck()
        const splitDeck = Math.ceil(deck.cards.length / 2)
        let p1Half = deck.cards.splice(0, splitDeck)
        this.p1.push(...p1Half)
        this.p2.push(...deck.cards)
    }

    battle() {
        this.hand1 = [this.p1.shift()]
        this.hand2 = [this.p2.shift()]
        console.log(this.hand1[0].value)
        if (this.hand1[0].value > this.hand2[0].value) {
            this.p1.push(...this.hand1, ...this.hand2)
            console.log("p1 wins!")
        } else if (this.hand1[0].value < this.hand2[0].value) {
            this.p2.push(...this.hand1, ...this.hand2)
            console.log("p2 wins!")
        } else {
            console.log("Go to war!")
            this.goToWar()
        }
    }

    goToWar() {
        let h1war = this.p1.splice(0, 4)
        let h2war = this.p2.splice(0, 4)
        this.hand1.push(...h1war)
        this.hand2.push(...h2war)
        let h1L = this.hand1.length
        let h2L = this.hand2.length
        if (this.hand1[h1L-1].value > this.hand2[h2L-1].value) {
            this.p1.push(...this.hand1, ...this.hand2)
            console.log("p1 wins the war!")
        } else if (this.hand1[h1L-1].value < this.hand2[h2L-1].value) {
            this.p2.push(...this.hand1, ...this.hand2)
            console.log("p2 wins the war!")
        } else {
            console.log("Go to war!")
            this.goToWar()
        }
    }
}

let game1 = new GameOfWar()

console.log(game1)
console.log(game1.p1.length)
console.log(game1.p2.length)