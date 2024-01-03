// this will parse the collision array data, meaning it will divide it into rows?
Array.prototype.parse2D = function () {
  // this will store the rows from the collision array data
  const rows = [];
  // store the 16 values each time in a sub array from he collision array data
  for (let i = 0; i < this.length; i += 16) {
    rows.push(this.slice(i, i + 16));
  }
  return rows;
};

// after creating a 2 dimentional array, we can now create objects/collision blocks and place it correctly
Array.prototype.createObjectsFrom2D = function () {
  const objects = [];
  // row of sub arrays and y (index-y) meaning where in y axis is the collision boundaries
  this.forEach((row, y) => {
    row.forEach((symbol, x) => {
      // symbol is the value of from the collision array data meaning that is where the
      // limit is and x (index-x) meaning where in the x axis is the collision boundaries
      if (symbol === 292) {
        // push a new collision into collision blocks array
        objects.push(
          new CollisionBlock({
            position: {
              x: x * 64,
              y: y * 64,
            },
          })
        );
      }
    });
  });
  return objects;
};
