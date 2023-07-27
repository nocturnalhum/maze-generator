'use client';
import React, { useEffect } from 'react';

const P5Sketch = () => {
  useEffect(() => {
    // Dynamic import p5.js only on the client-side
    import('p5').then((p5) => {
      const sketch = (p) => {
        const gridSize = 10;

        p.setup = () => {
          p.createCanvas(400, 400);
        };

        p.draw = () => {
          p.background(255);
          for (let x = 0; x < p.width; x += gridSize) {
            for (let y = 0; y < p.height; y += gridSize) {
              p.stroke(0);
              p.fill(150);
              p.rect(x, y, gridSize, gridSize);
            }
          }
        };
      };

      new p5.default(sketch);
    });
  }, []);

  return <div></div>;
};

export default P5Sketch;
