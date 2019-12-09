function process() {
    event.preventDefault();

    var x_start;
    var x_end;
    var y_start;
    var y_end;
    var mult_table;
    var increment;
    var x_array = [];
    var y_array = [];

    //find the beginning and end of each axis whether they are in order or not
    if (document.getElementById('x_first_number').value <= document.getElementById('x_second_number').value) {
        x_start = document.getElementById('x_first_number').value;
        x_end = document.getElementById('x_second_number').value;
    } else {
        x_start = document.getElementById('x_second_number').value;
        x_end = document.getElementById('x_first_number').value;
    }

    if (document.getElementById('y_first_number').value <= document.getElementById('y_second_number').value) {
        y_start = document.getElementById('y_first_number').value;
        y_end = document.getElementById('y_second_number').value;
    } else {
        y_start = document.getElementById('y_second_number').value;
        y_end = document.getElementById('y_first_number').value;
    }

    mult_table = document.getElementById('table1');

    //deletes the old table if there is any table element existing
    if (mult_table.hasChildNodes()) {
        while (mult_table.hasChildNodes()) {
            mult_table.removeChild(mult_table.childNodes[0]);
        }
    }

    //make the x and y arrays with all of the in between numbers
    x_array.push(x_start);
    x_start++;
    for(increment = x_start; increment <= x_end; increment++) {
        x_array.push(increment);
    }

    y_array.push(y_start);
    y_start++;
    for(increment = y_start; increment <= y_end; increment++) {
        y_array.push(increment);
    }

    //do a special addRow at the start that populates the top row with the x array
    add_row_first(mult_table, x_array);

    //call addRow a number of times equal to how many numbers lie from y_start and y_end
    for(increment = 0; increment < y_array.length; increment++) {
        add_row(mult_table, x_array, y_array, y_array[increment]);
    }
}

function add_row_first(table, array1) { //just for populating the inital x axis. Skips the first cell and then populates through the x array
    var trow = document.createElement('tr');
    var incrementer;

    //blank cell in the top left of the table
    add_cell(trow, " ");

    //populates the rest of the first row with all of the numbers ranging from x_start to x_end
    for (incrementer = 0; incrementer < array1.length; incrementer++) {
        add_cell(trow, array1[incrementer]);
    }

    table.appendChild(trow);
}

function add_row(table, array1, array2, multiplicand) { //change the passed data to be the two arrays
    var trow = document.createElement('tr');
    var incremented;
    var product;

    //call addCell a number of times equal to how many numbers lie from x_start and x_end
    //only pass a number from the array for the first add cell then do the multiplication for the value passed
    add_cell(trow, multiplicand);

    for(incremented = 0; incremented < array1.length; incremented++) {
        product = multiplicand * array1[incremented];
        add_cell(trow, product);
    }

    table.appendChild(trow)
}

function add_cell(trow, value) {
    var tcell = document.createElement('td');

    tcell.innerHTML = value;

    trow.appendChild(tcell)
}
