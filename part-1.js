var rs = require("readline-sync");



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
    return this.battleMap;
  }

  fieldMap() {
    return this.battleMap;
  }
}


class Strike extends placement {
  constructor(attack, theSpot) {
    super();
    attack, (theSpot = this);
    this.placer = this.fieldMap();
    this.battleships = ["battleship"];
    this.destroyers = ["destroyer"];
    this.cruisers = ["cruiser"];
    this.carriers = ["carrier"];
    this.submarines = ["submarine"];
    // this.shipsFighting = this.shipsview();
  }
  veiw() {
    return this.place();
  }
  strike() {
    const placesAttacked = [];
    this.place();
    // console.log(this.placer);
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
        placesAttacked.push(this.theSpot);
        console.log(this.veiw());
      } else {
        this.placer[this.theSpot] = "X";
        console.log("Miss");
        placesAttacked.push(this.theSpot);
        console.log(this.veiw());
      }
    }
    placesAttacked.push(this.theSpot);
  
  }
 veiw() {
    return this.placer;
   }
}


const gameOn = rs.keyIn("Press any key to start");

 while(gameOn){
const striker = new Strike();
console.log(striker.strike());
  const endGame= rs.keyInYN('Would you like to play again? ');
  //Replace e with End game requirement
  
  if(endGame === false){
        return ;
  }
}


