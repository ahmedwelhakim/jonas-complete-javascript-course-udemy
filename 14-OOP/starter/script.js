'use strict';
function Car(make, speed) {
	this.make = make;
	this.speed = speed;
}
Car.prototype.accelerate = function () { this.speed++; console.log(this.speed); }
Car.prototype.brake = function () { this.speed--; console.log(this.speed); }
let car1 = new Car('BMW', 120);
let car2 = new Car('Mercedes', 95);
//car1.accelerate();
//car1.brake();

function EV(make, speed, charge) {
	Car.call(this, make, speed);
	this.charge = charge;
}
EV.prototype = Object.create(Car.prototype);
EV.prototype.accelerate = function () {
	this.speed += 20;
	this.charge--;
	console.log(`${this.make} is moving at ${this.speed} km/hr, with a charge ${this.charge}`);
}
EV.prototype.brake = function () {
	this.speed -= 20;
	this.charge--;
	console.log(`${this.make} is moving at ${this.speed} km/hr, with a charge ${this.charge}`);
}
EV.prototype.chargeBattery = function (chargeTo) {
	this.charge = chargeTo;
	console.log(`${this.make} is moving at ${this.speed} km/hr, with a charge ${this.charge}`);
}
let elecCar = new EV('Tesla', 120, 23);
//elecCar.accelerate();
//elecCar.chargeBattery(90);

// Challenge 4
class CarCl {
	constructor(make, speed) {
		this.make = make;
		this.speed = speed;
	}
	accelerate() {
		this.speed += 20;
		this.print();
		return this;
	}
	brake() {
		this.speed -= 20;
		this.print();
		return this;
	}
	print() {
		console.log(`${this.make} going at ${this.speed} km/h`);
	}
}
class EvCl extends CarCl {
	#charge;
	constructor(make, speed, charge) {
		super(make, speed);
		this.#charge = charge;
	}
	accelerate() {
		super.accelerate();
		this.#charge--;
		return this;
	}
	chargeBattery(batt) {
		this.#charge += batt;
		this.print();
		return this;
	}
	print() {
		console.log(`${this.make} going at ${this.speed} km/h, with charge of ${this.#charge}%`);
	}

}
const rivian = new EvCl('Rivian', 100, 23);
rivian.accelerate().accelerate().chargeBattery(20);

