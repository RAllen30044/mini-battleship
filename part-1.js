var rs = require("readline-sync");

const gameOn = rs.keyIn("Press any key to start");

//  while(gameOn){
//       const endGame= rs.question('Press e to end game: ')
//       //Replace e with End game requirement
//       if(endGame === 'e'){
//             return ;
//       }
//  }

class gameMap {
  constructor(battleMap, mapSize, alphabet) {
    this.battleMap = battleMap;
    this.mapSize = mapSize;
    this.alphabet = alphabet;
  }

  mapping() {
    this.battleMap = {};
    const char = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
    this.alphabet = char.split("");
    this.mapSize = 4;
    for (let lat = 0; lat < this.mapSize; lat++) {
      for (let long = 1; long <= this.mapSize; long++) {
        let coordinate = this.alphabet[lat] + long;
        this.battleMap[`${coordinate}`] = null;
      }
    }

    return this.battleMap;
  }
}

class placement extends gameMap {
  constructor(ship, spot) {
    super();
    this.battleMap = this.mapping();
    this.ship = ship;
    this.spot = spot;
  }
  randomPlace() {
    const lat = this.alphabet[Math.floor(Math.random() * this.mapSize)];
    const long = Math.floor(Math.random() * this.mapSize + 1);
    const coordinate = lat + long;
    return coordinate;
  }
  place() {
    this.battleMap[this.randomPlace()] = "destroyer";
    this.battleMap[this.randomPlace()] = "battleship";
    return this.battleMap;
  }
  fieldMap(){
    return this.battleMap;
  }
}



class Strike extends placement {
  constructor(attack) {
    super();
    this.attack = attack;
    this.placer = this.fieldMap();
  }
  strike() {
    this.place();
   console.log(this.placer);

    this.attack = rs.question("Enter a location to strike ie A2: ");

    if (this.placer[this.attack.toUpperCase()] !== null) {
      
      this.placer[this.attack.toUpperCase()] = "O";
      return 'Hit';
     
    } else {
     
      this.placer[this.attack.toUpperCase()] = "X";
      return 'Miss';
    }

  
  }
  veiw(){
    return this.placer;
  }
}



const striker = new Strike();

console.log(striker.strike());
console.log(striker.veiw());