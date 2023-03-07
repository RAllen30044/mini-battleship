var rs = require("readline-sync");

const gameOn = rs.keyIn("Press any key to start");

//  while(gameOn){
//     const endGame= rs.keyInYN('Would you like to play again? ');
//       //Replace e with End game requirement
//       if(endGame === 'N'){
//             return ;
//       }
//  }

class gameMap {
  constructor(battleMap, mapSize, alphabet) {
    battleMap, mapSize, (alphabet = this);
  }

  mapping() {
    this.battleMap = [];
    const char = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
    this.alphabet = char.split("");
    this.mapSize = 4;
    for (let lat = 0; lat < this.mapSize; lat++) {
      for (let long = 1; long <= this.mapSize; long++) {
        this.battleMap[`${this.alphabet[lat] + long}`] = null;
      }
    }

    return this.battleMap;
  }
}
// const game = new gameMap();
// console.log(game.mapping());

class placement extends gameMap {
  constructor(coordinate) {
    super();
    this.battleMap = this.mapping();
    this.coordinate = coordinate;
    this.shipsFighting = [];
  }
  randomPlace() {
    const lat = this.alphabet[Math.floor(Math.random() * this.mapSize)];
    const long = Math.floor(Math.random() * this.mapSize + 1);
    this.coordinate = lat + long;
    if (this.battleMap[this.coordinate] !== null) {
      while (this.battleMap[this.coordinate] !== null) {
        const lats = this.alphabet[Math.floor(Math.random() * this.mapSize)];
        const longs = Math.floor(Math.random() * this.mapSize + 1);
        console.log(this.battleMap[this.coordinate]);
        console.log(this.coordinate + " me");
        this.coordinate = lats + longs;
      }
    }
    return this.coordinate;
  }
  postRandomPlaceCheck(ship) {
    let target = this.randomPlace();
    this.battleMap[target] = ship;
    console.log(target);
    console.log(ship);
  }
  place() {
    this.postRandomPlaceCheck("destroyer");
    this.postRandomPlaceCheck("battleship");
    this.postRandomPlaceCheck("cruiser");
    this.postRandomPlaceCheck("carrier");
    this.postRandomPlaceCheck("submarine");
    return this.battleMap;
  }
  shipsview() {
    return this.shipsFighting;
  }
  fieldMap() {
    return this.battleMap;
  }
}
const place = new placement();
// console.log(place.randomPlace());
console.log(place.place());
// // console.log(place.shipsview());

class Strike extends placement {
  constructor(attack) {
    super();
    this.attack = attack;
    this.placer = this.fieldMap();
    this.battleships = ["battleship"];
    this.destroyers = ["destroyer"];
    this.shipsFighting = this.shipsview();
  }
  veiw() {
    return this.place();
  }
  //   strike() {
  //     const placesAttacked = [];
  //     this.place();
  //     console.log(this.placer);
  //     while (this.destroyers.length > 0 || this.battleships.length > 0) {
  //       this.attack = rs.question("Enter a location to strike ie A2: ");
  //         if(placesAttacked.includes(theSpot)){
  //           console.log('Already selected that coordinate.Miss');
  //           return;
  //         }
  //       if (
  //         this.placer[this.attack] === "X" ||
  //         this.placer[this.attack] === "O"
  //       ) {
  //         console.log("Selection invalid, try again");
  //         this.attack = rs.question("Enter a coordinate to strike (ie... A2): ");
  //       }
  //       let theSpot = this.attack.toUpperCase();
  //       if (this.placer[theSpot] !== null) {
  //         switch (this.placer[theSpot]) {
  //           case "destroyer":
  //             this.destroyers.pop();
  //             break;
  //           case "battleship":
  //             this.battleships.pop();
  //             break;

  //           default:
  //             console.log(`error`);
  //             break;
  //         }

  //         this.placer[theSpot] = "O";
  //         console.log("Hit");
  //       } else {
  //         this.placer[theSpot] = "X";
  //         console.log("Miss");
  //       }
  //     }
  //     placesAttacked.push(theSpot)
  //     console.log(this.veiw());
  //   }
  //   veiw() {
  //     return this.placer;
  //   }
}
//const striker = new Strike();
// console.log(striker.strike());
//console.log(striker.veiw());
