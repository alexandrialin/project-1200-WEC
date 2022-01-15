const attractions = ["Rollercoaster", "Swings", "Funhouse", "Cotton-Candy", "Screaming-Clowns","Bumper-Cars","Ferris-Wheel", "Carousel","Mechanical-Bull","Log-Flume","The-Scrambler","Tilt-a-Whirl","The-Wipeout","Tunnel-of-Love","The-Whip","Wave-Swinger","Shoot-The-Chute","Helter-Skelter","Loop-O-Plane"];

var emptyImg = new Image(100, 100);
emptyImg.src = 'images/square.png'; 

var obImg = new Image(100, 100); 
obImg.src = '/images/obstacle.png'; 

var attImg = new Image(100, 100); 
attImg.src = '/images/ferris.png'; 

var size = 5;
var start = "Tunnel-of-Love";
var userStops = 6;
var end = "Rollercoaster";

//GetUserInput();

var matrix = new Array(size);
var attractionListLength = attractions.length;
var stops = userStops;
var obstacles = 5;
var check = 0;
var matrixSize = size * size;
var positions = new Array(matrixSize);

if(stops > attractionListLength){
    stops = attractionListLength;
}

// Create 2D array
for(var i = 0; i < matrix.length; i++) {
  matrix[i] = new Array(size);
}

// Create 2D array
for(var i = 0; i < 2; i++) {
  positions[i] = new Array(25);
}

// populate the array top
for(var j = 0; j < matrixSize; j++) {
    positions[0][j] = "";
}

// populate the array ids
for(var j = 0; j < matrixSize; j++) {
    positions[1][j] = 0;
}

PopulateSpace();

//getting list of used attractions
var listOfStops = new Array(4);
  
// Create 2D array
for(var i = 0; i < 4; i++) {
  listOfStops[i] = new Array(stops);
}
  
//populate top
for(var i = 0; i < stops; i++) {
  listOfStops[0][i] = positions[0][i];
}

///populate mid
for(var i = 0; i < stops; i++) {
  //convert id to coords
  id = positions[1][i];
  
  //first num
  listOfStops[1][i] = Math.floor(Math.sqrt(id))-1;
  
  //second num
  var secondNumCheck = (id % size) -1;
  if (secondNumCheck == -1) {listOfStops[2][i] = 4;}
  else {listOfStops[2][i] = (id % size) -1;}
}

//populate bottom(id)
for(var i = 0; i < stops; i++) {
  listOfStops[3][i] = positions[1][i];
}

var listOfStops = new Array(4);
  
// Create 2D array
for(var i = 0; i < 4; i++) {
  listOfStops[i] = new Array(stops);
}
  
//populate top
for(var i = 0; i < stops; i++) {
  listOfStops[0][i] = positions[0][i];
}

//populate mid
for(var i = 0; i < stops; i++) {
  //convert id to coords
  id = positions[1][i];
  //first num
  listOfStops[1][i] = Math.floor(Math.sqrt(id))-1;
  //second num
  var secondNumCheck = (id % size) -1;
  if (secondNumCheck == -1) {listOfStops[2][i] = 4;}
  else {listOfStops[2][i] = (id % size) -1;}
}

//populate bottom(id)
for(var i = 0; i < stops; i++) {
  listOfStops[3][i] = positions[1][i];
}

MakeTable();

ShortestPath();

/**********functions below here*********************/


function GetUserInput() {
  size = document.getElementById("size").value;
  start = document.getElementById("start").value;
  userStops = document.getElementById("stops").value;
  end = document.getElementById("end").value;

  if(!(listOfStops[0].includes(start))){
    return "Please enter an attraction that is in the list: " + listOfStops[0];
  }

  else if(!(listOfStops[0].includes(end))){
    return "Please enter an attraction that is in the list: " + listOfStops[0];
  }
};

function ShortestPath(){

}

function PopulateSpace(){
  // populate the array attractions
  positions[0][0] = start;
  positions[0][1] = end;
  for(var j = 2; j < stops; j++) {
      positions[0][j] = RandomAttraction();
  }

  // populate the array with obstacles
  for(var j = (stops); j < (stops+obstacles); j++){
      positions[0][j] = "obstacle";
  }

  // populate the rest of array with open spaces
  for(var j = ((stops*2)); j < matrixSize; j++) {
      positions[0][j] = "empty";
  }

  // populate the array stop Ids
  for(var j = 0; j < matrixSize; j++) {
      positions[1][j] = RandomID();
  }

  // populate the array
  for(var j = 0; j < size; j++) {
    for (var k = 0; k < size; k++) {
      let check = ((size*j)+1+k);
      for (var i = 0; i < matrixSize; i++) {
        if (check == positions[1][i]){
          matrix[j][k] = positions[0][i];
        }
      }
    }
  }
};

// make HTML table of array contents
function MakeTable() {
  var tableData = matrix;
  var table = document.createElement('table');
  var row = {};
  var cell = {};

  tableData.forEach(function(rowData) {
    row = table.insertRow(-1); // [-1] for last position in Safari
    rowData.forEach(function(cellData) {
      cell = row.insertCell();

      cell.textContent = cellData;
    });
  });
  document.body.appendChild(table);
}


function RandomAttraction(){

  var num = 0;
  var randomAttract = "";

  do {
    num = Math.floor(Math.random() * attractionListLength);
    randomAttract = attractions[num];

  }while(InAttractList(randomAttract));

  return randomAttract;
};

function RandomID(){
  var randomid = 0;
  do {
    randomid = (Math.floor(Math.random() * matrixSize+1));

  } while(InIDList(randomid));

  return randomid;
};

function InIDList(randomid) {
  // check the ids to make sure it is not already in it
  for(var j = 0; j < matrixSize; j++) {
    if (positions[1][j] == randomid){
      return true;
    }
  }
  return false;
};

function InAttractList(randomAttract) {
  // check the list to make sure it is not already in it
  for(var j = 0; j < stops; j++) {
    if (positions[0][j] == randomAttract){
      return true;
    }
  }
  return false;
};
