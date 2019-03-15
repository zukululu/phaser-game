# Phaser 3 Game

## Table of Contents
* Description
* Features
* Technologies Used
* Installation Instruction

## Description
This is a game I've created while learning Phaser 3, which is a HTML5 Game Engine. Phaser 3 is very robust and can cover a multitude of game development aspects: such as groups, states, and scenes. 

DISCLAIMER: Sprites were provided by [Phaser 3](https://phaser.io/), [itch.io](https://itch.io/game-assets/tag-cave), and [Egee](https://www.youtube.com/watch?v=88DS3Z8nOdY&t=346s)

<img src=https://media.giphy.com/media/5w0zKAugGiabXZqtH0/giphy.gif />

## Features
* Achieved
  * Create multiple enemy types.
  * Able to fire projectiles that destroy enemies.
  * Enemy fires projectiles.
  * Player death on collision with enemy.
  * Able to climb rope.
  * Multiple platform types.
  * Transition scenes on impact.
  
* Features to Add
  * Player health.
  * Larger, slower enemy with more health.
  * Create replay menu on death.
  * Revise start menu.
  * Create new room that houses a boss and interactable objects.
  
## Technologies Used
* Phaser
* Photoshop
* HTML
* Javascript

## Installation Instructions
* Fork/Clone repo
* Open code in text editor or open folder in terminal
* Run npm install
* Run npm start

## Known Bugs
* Player can fly infinitely after climbing rope as long as they do not touch a platform.
* Enemies only chase after player if they are on same platform. This _DOES NOT_ include players jumping. If the player jumps, they will not chase.
