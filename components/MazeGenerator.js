'use client';

import { useEffect } from 'react';
import p5 from 'p5';

function removeWalls(current, next) {
  const x = current.i - next.i;
  if (x == 1) {
    current.walls.left = false;
    next.walls.right = false;
  }
  if (x == -1) {
    current.walls.right = false;
    next.walls.left = false;
  }
  const y = current.j - next.j;
  if (y == 1) {
    current.walls.top = false;
    next.walls.bottom = false;
  }
  if (y == -1) {
    current.walls.bottom = false;
    next.walls.top = false;
  }
}

const MazeGenerator = () => {
  useEffect(() => {
    window.DeviceOrientationEvent = null;
    window.DeviceMotionEvent = null;
    const sketch = (p) => {
      const w = 40; // Width and height of each cell in the grid
      let cols, rows;
      let current;
      let grid = [];
      let stack = [];

      function index(i, j) {
        if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
          return -1;
        }
        return i + j * cols;
      }

      p.setup = () => {
        p.createCanvas(400, 400);

        // ======<<<FRAME RATE>>>=====================================================
        // Adjust the frame rate to control the maze generation speed
        p.frameRate(50);
        // ===========================================================================
        cols = Math.floor(p.width / w);
        rows = Math.floor(p.height / w);
        // const grid = createEmptyGrid(rows, cols);
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const cell = new Cell(x, y);
            grid.push(cell);
          }
        }
        current = grid[0];
      };

      p.draw = () => {
        console.log(`Current: [col:${current.i},row:${current.j}]`);
        p.background(51);
        for (let x = 0; x < grid.length; x++) {
          grid[x].show();
        }
        current.visited = true;
        current.highlight();
        let next = current.checkNeighbors();
        if (next) {
          next.visited = true;

          stack.push(current);

          removeWalls(current, next);

          current = next;
        } else if (stack.length > 0) {
          current = stack.pop();

          console.log('Popped');
        } else {
          p.noLoop();
        }
      };

      class Cell {
        constructor(i, j) {
          this.i = i;
          this.j = j;
          this.walls = { top: true, right: true, bottom: true, left: true };

          this.highlight = function () {
            const x = this.i * w;
            const y = this.j * w;
            p.noStroke();
            p.fill(0, 255, 0);
            p.rect(x, y, w, w);
          };
          this.show = () => {
            let x = i * w;
            let y = j * w;
            p.stroke(255);

            if (this.walls.top) {
              p.line(x, y, x + w, y);
            }
            if (this.walls.right) {
              p.line(x + w, y, x + w, y + w);
            }
            if (this.walls.bottom) {
              p.line(x + w, y + w, x, y + w);
            }
            if (this.walls.left) {
              p.line(x, y + w, x, y);
            }
            if (this.visited) {
              p.noStroke();
              p.fill(255, 0, 255);
              p.rect(x, y, w, w);
            }
          };

          this.checkNeighbors = () => {
            let neighbors = [];

            let top = grid[index(i, j - 1)];
            let right = grid[index(i + 1, j)];
            let bottom = grid[index(i, j + 1)];
            let left = grid[index(i - 1, j)];

            if (top && !top.visited) {
              console.log('Push Top');
              neighbors.push(top);
            }
            if (right && !right.visited) {
              console.log('Push right');

              neighbors.push(right);
            }
            if (bottom && !bottom.visited) {
              console.log('Push Bottom');

              neighbors.push(bottom);
            }
            if (left && !left.visited) {
              console.log('Push Left');

              neighbors.push(left);
            }

            if (neighbors.length > 0) {
              const rand = Math.floor(
                Math.floor(Math.random(0, neighbors.length) * neighbors.length)
              );
              console.log('Random:', rand);
              // console.log('Neighbours:', neighbors[rand]);

              return neighbors[rand];
            } else {
              return undefined;
            }
          };
        }
      }
    };

    const canvas = new p5(sketch);

    return () => {
      canvas.remove();
    };
  }, []);
};

export default MazeGenerator;
