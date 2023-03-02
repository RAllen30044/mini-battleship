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
  constructor(battleMap) {
  this.battleMap= battleMap;
  
  }

mapping(){
  this.battleMap ={};
  const char = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
  let alphabet = char.split("");
  const mapSize = 4;
  for (let lat = 0; lat < mapSize; lat++) {
    for (let long = 1; long <= mapSize; long++) {
      let coordinate = alphabet[lat] + long;
      this.battleMap[`${coordinate}`] = null;
    }
  }
 
  return this.battleMap;
}
};

class Strike extends gameMap {
constructor(){
 super();
this.battleMap= this.mapping();
}
strike(){
this.battleMap.A1 ='X';
  return this.battleMap;
}
}


 new gameMap();

const striker= new Strike;


console.log(striker.strike());
