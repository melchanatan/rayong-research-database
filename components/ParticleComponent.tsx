"use client";
import React, { createElement, useEffect, useState } from "react";
import Sketch from "react-p5";

class Particle {
  x: number;
  y: number;
  r: number;
  xSpeed: number;
  ySpeed: number;
  p5: any;

  constructor(p5: any) {
    this.x = p5.random(1, p5.width);
    this.y = p5.random(1, p5.height);
    this.r = p5.random(2, 2);
    this.xSpeed = p5.random(-0.1, 0.1);
    this.ySpeed = p5.random(-0.1, 0.1);
    this.p5 = p5;
  }

  createParticle() {
    this.p5.noStroke();
    this.p5.fill("rgba(200,169,169,0.5)");
    this.p5.circle(this.x, this.y, this.r);
  }

  moveParticle() {
    if (this.x < 0 || this.x > this.p5.width) this.xSpeed *= -1;
    if (this.y < 0 || this.y > this.p5.height) this.ySpeed *= -1;
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  joinParticles(particles: any) {
    particles.forEach((element: any) => {
      let dis = this.p5.dist(this.x, this.y, element.x, element.y);
      if (dis < 300) {
        this.p5.stroke("rgba(200,169,169,0.3)");
        this.p5.line(this.x, this.y, element.x, element.y);
      }
    });
  }
}

// an array to add multiple particles
function ParticleComponent({ className }: { className: string }) {
  let particles: any = [];
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") setWidth(window.innerWidth);
    {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    }
  }, []);

  const setup = (p5: any, canvasParentRef: any) => {
    p5.createCanvas(width, height).parent(canvasParentRef);

    for (let i = 0; i < 6; i++) {
      particles.push(new Particle(p5));
    }
  };

  const draw = (p5: any) => {
    for (let i = 0; i < particles.length; i++) {
      p5.background("0,0,0");
      particles[i].createParticle();
      particles[i].moveParticle();
      particles[i].joinParticles(particles.slice(i));
      // p5.clear();
    }
    // particles = [];
  };

  // Resize canvas when window size changes
  const windowResized = (p5: any) => {
    p5.resizeCanvas(window.innerWidth, window.innerHeight);
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      windowResized={windowResized}
      className={className}
    />
  );
}

export default ParticleComponent;
