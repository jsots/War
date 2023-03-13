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
        let suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds']
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
        let hand1 = []
        let hand2 = []
        hand1 = this.p1.shift()
        hand2 = this.p2.shift()
        if (hand1.value > hand2.value) {
            this.p1.push(hand1, hand2)
            console.log("p1 wins!")
        } else if (hand1.value < hand2.value) {
            this.p2.push(hand1, hand2)
            console.log("p2 wins!")
        } else {
            console.log("it's a tie")
        }
    }
}

let game1 = new GameOfWar()

console.log(game1)
console.log(game1.p1.length)
console.log(game1.p2.length)