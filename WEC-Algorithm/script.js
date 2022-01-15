// Javascript Code implementation for above problem
var row = 4;
var column = 4;

function myFunction() {
	var x = document.getElementById("frm1");
	var text = "";
	var i;

	var start = "";
	var end = "";

	for (i = 0; i < x.length ;i++) {
	  text += x.elements[i].value + "<br>";
	}

	start = x.elements[0].value;
	end = x.elements[1].value;
	
	document.getElementById("demo").innerHTML = "Shortest path: " + minDistance(grid, start, end);
}


// QItem for current location and distance
// from source location
class TheMatrix {
	
	constructor(rows, columns, distance)
	{
		this.row = rows;
		this.col = columns;
		this.dist = distance;
	}
};

function minDistance(grid, start, end)
{
	var source = new TheMatrix(0, 0, 0);

	// To keep track of visited QItems. Marking
	// blocked cells as visited.
	var visited = Array.from(Array(row), ()=>Array(column).fill(0));

	var pathArray = [];

	for (var i = 0; i < row; i++) {
		for (var j = 0; j < column; j++)
		{
			if (grid[i][j] == 'X')
				visited[i][j] = true;
			else
				visited[i][j] = false;

			// Finding source
			if (grid[i][j] == start)
			{
			source.row = i;
			source.col = j;
			}
			
			pathArray.push(grid[i][j]);
		}
	}

	var string1 = pathArray.toString().split(start);
	var string2 = string1[1].toString().split(end);
	var string3 = string2[0].toString();
	var string4 = string3.replaceAll(",", " ");
	var string5 = string4.replaceAll("X", " ")

	document.getElementById("demo2").innerHTML = "All nodes traversed: " + string5;

	// applying BFS on matrix cells starting from source
	var q = [];
	q.push(source);
	visited[source.row][source.col] = true;
	while (q.length!=0) {
		var p = q[0];
		q.shift();

		// Destination found;
		if (grid[p.row][p.col] == end)
			return p.dist;

		// moving up
		if (p.row - 1 >= 0 &&
			visited[p.row - 1][p.col] == false) {
			q.push(new TheMatrix(p.row - 1, p.col, p.dist + 1));
			visited[p.row - 1][p.col] = true;

			// document.write(grid[p.row - 1][p.col]);
		}

		// moving down
		if (p.row + 1 < row &&
			visited[p.row + 1][p.col] == false) {
			q.push(new TheMatrix(p.row + 1, p.col, p.dist + 1));
			visited[p.row + 1][p.col] = true;

			// document.write(grid[p.row + 1][p.col]);
		}

		// moving left
		if (p.col - 1 >= 0 &&
			visited[p.row][p.col - 1] == false) {
			q.push(new TheMatrix(p.row, p.col - 1, p.dist + 1));
			visited[p.row][p.col - 1] = true;

			// document.write(grid[p.row][p.col - 1]);
		}

		// moving right
		if (p.col + 1 < column &&
			visited[p.row][p.col + 1] == false) {
			q.push(new TheMatrix(p.row, p.col + 1, p.dist + 1));
			visited[p.row][p.col + 1] = true;

			// document.write(grid[p.row][p.col + 1]);
		}
	}

	var notPossible = "not possible :("
	return notPossible;
}

// Driver code
var grid = [ [ 'X', 'a', 'b', 'c' ],
			[ 'd', 'X', 'e', 'f' ],
			[ 'X', 'g', 'h', 'i' ],
			[ 'j', 'k', 'l', 'm' ] ];

// print the array contents
for (var m = 0; m < grid.length; m++) {
  for(var n = 0; n < grid.length; n++){
    document.write(grid[m][n] + " ");
  }
  document.write("<br>");
}

document.write("<br>");
document.write("<br>");

// document.write(source);
// document.write(dest);

// This code is contributed by rrrtnx.

