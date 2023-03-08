var rs = require("readline-sync");

class gameMap {
  constructor(battleMap, mapSize, newGrid) {
    battleMap, mapSize, (newGrid = this);
    this.char = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
    this.alphabet = this.char.split("");
  }

  mapping() {
    this.battleMap = [];

    this.mapSize = 10;
    for (let lat = 0; lat < this.mapSize; lat++) {
      for (let long = 1; long <= this.mapSize; long++) {
        this.battleMap[`${this.alphabet[lat] + long}`] = null;
      }
    }

    return this.battleMap;
  }

  grid(number) {
    let longs = [];
    this.newGrid=[];
    for (let i = 1; i <= number; i++) {
      longs.push(i);
    }
    for (let i = 0; i < number; i++) {
      this.newGrid.push(longs);
    }
    console.table(this.newGrid);
  }
}
const gaming = new gameMap();
console.log(gaming.grid(10));

class placement extends gameMap {
  constructor(coordinate) {
    super();
    this.battleMap = this.mapping();
    this.coordinate = coordinate;
  }
  randomPlace() {
    const lat = this.alphabet[Math.floor(Math.random() * this.mapSize)];
    const long = Math.floor(Math.random() * this.mapSize + 1);
    this.coordinate = lat + long;
    while (this.battleMap[this.coordinate] !== null) {
      const lats = this.alphabet[Math.floor(Math.random() * this.mapSize)];
      const longs = Math.floor(Math.random() * this.mapSize + 1);
      console.log(this.battleMap[this.coordinate]);
      console.log(this.coordinate + " me");
      this.coordinate = lats + longs;
    }
    return this.coordinate;
  }
  postRandomPlaceCheck(ship) {
    let target = this.randomPlace();
    this.battleMap[target] = ship;
  }
  place() {
    this.postRandomPlaceCheck("destroyer");
    this.postRandomPlaceCheck("battleship");
    this.postRandomPlaceCheck("cruiser");
    this.postRandomPlaceCheck("carrier");
    this.postRandomPlaceCheck("submarine");
  }

  fieldMap() {
    return this.battleMap;
  }
}

class Strike extends placement {
  constructor(attack, theSpot, shipsAmount) {
    super();
    attack, theSpot, (shipsAmount = this);
    this.placer = this.fieldMap();
    this.battleships = ["battleship", "battleship", "battleship", "battleship"];
    this.destroyers = ["destroyer", "destroyer"];
    this.cruisers = ["cruiser", "cruiser", "cruiser"];
    this.carriers = ["carrier", "carrier", "carrier", "carrier", "carrier"];

    this.submarines = ["submarine", "submarine", "submarine"];
  }

  strike() {
    const placesAttacked = [];
    this.place();
    this.shipsAmount = 5;
    console.log(this.veiw());
    while (
      this.destroyers.length > 0 ||
      this.battleships.length > 0 ||
      this.cruisers.length > 0 ||
      this.submarines.length > 0 ||
      this.carriers.length > 0
    ) {
      this.attack = rs.question("Enter a location to strike ie A2: ");
      this.theSpot = this.attack.toUpperCase();

      while (placesAttacked.includes(this.theSpot)) {
        console.log("Already selected that coordinate.....Miss!!");
        this.attack = rs.question("Enter a location to strike ie A2: ");
        this.theSpot = this.attack.toUpperCase();
      }
      while (!Object.keys(this.veiw()).includes(this.theSpot)) {
        console.log("Coordinate Out of Bounds");
        this.attack = rs.question("Enter a location to strike ie A2: ");
        this.theSpot = this.attack.toUpperCase();
      }
      if (this.placer[this.theSpot] !== null) {
        switch (this.placer[this.theSpot]) {
          case "destroyer":
            this.destroyers.pop();
            break;
          case "battleship":
            this.battleships.pop();
            break;
          case "cruiser":
            this.cruisers.pop();
            break;
          case "submarine":
            this.submarines.pop();
            break;
          case "carrier":
            this.carriers.pop();
            break;

          default:
            console.log(`error`);
            break;
        }

        this.placer[this.theSpot] = "O";
        console.log("Hit");

        if (
          this.destroyers.length === 0 &&
          this.battleships.length === 0 &&
          this.cruisers.length === 0 &&
          this.submarines.length === 0 &&
          this.carriers.length === 0
        ) {
          return `You have sunken all of my ships!!!`;
        }
        if (
          this.destroyers.length === 0 ||
          this.battleships.length === 0 ||
          this.cruisers.length === 0 ||
          this.submarines.length === 0 ||
          this.carriers.length === 0
        ) {
          console.log(`You have sunken one of my ships!!!`);
          this.shipsAmount--;
          console.log(`${this.shipsAmount} ships remaining `);
        }

        placesAttacked.push(this.theSpot);
        console.log(this.veiw());
      } else {
        this.placer[this.theSpot] = "X";
        console.log("Miss");
        placesAttacked.push(this.theSpot);
        console.log(this.veiw());
      }
    }
  }
  veiw() {
    return this.placer;
  }
}

// const gameOn = rs.keyIn("Press any key to start");

// while (gameOn) {
//   const striker = new Strike();
//   console.log(striker.strike());
//   const endGame = rs.keyInYN("Would you like to play again? ");

//   if (endGame === false) {
//     return;
//   }
// }
