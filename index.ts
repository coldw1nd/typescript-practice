import { ScooterStatus, ScooterID, Scooter } from './types';
import ElecticScooter from './scooterClass';

const myScooter: Scooter = {
    id: 1,
    battery: 90,
    brand: "myBrand",
    currentUser: null,
    status: ScooterStatus.FREE,
    lastCoordinates: [55.75, 37.61]
};

let cityFleet: Scooter[] = [];

cityFleet.push(myScooter);

const scooter1 = new ElecticScooter(1, "Xiaomi", 95);
const scooter2 = new ElecticScooter(2, "Ninebot", 5);

scooter1.rent("Дмитрий");
scooter2.rent("Иван");

scooter1.brand = "Mi";

console.log(`Всего самокатов: ${ElecticScooter.totalScooters}`);