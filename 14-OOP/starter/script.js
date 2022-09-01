'use strict';
function Car(make, speed) {
	this.make = make;
	this.speed = speed;
}
Car.prototype.accelerate = function () { this.speed++; console.log(this.speed); }
Car.prototype.brake = function () { this.speed--; console.log(this.speed); }
let car1 = new Car('BMW', 120);
let car2 = new Car('Mercedes', 95);
car1.accelerate();
car1.brake();