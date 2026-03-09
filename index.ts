import { TransportFleet } from "./fleet";
import { BaseTransport, Bus, IVehicle, Tram } from "./transport";
import { Coordinates, TransportStatus } from "./types";
import { TransportUtils } from "./utils";

globalThis.calculateDistance = function(point1: [number, number], point2: [number, number]): number{
    return Math.sqrt(Math.pow(point2[0] - point1[0], 2) + Math.pow(point2[1]-point1[1], 2));
}

const myVehicle: IVehicle = new Bus(1, TransportStatus.IDLE, 90);

(<Bus>myVehicle).addPassengers("Иван", "Дмитрий");

const fleet = new TransportFleet<BaseTransport>();

const bus = new Bus(TransportUtils.generateId(), TransportStatus.IDLE, 80);
const tram = new Tram(TransportUtils.generateId(), TransportStatus.IDLE, 90);

fleet.addVehicle(bus);
fleet.addVehicle(tram);

const busPoint: Coordinates = [55.34, 36.43];
const tramPoint: Coordinates = [43.22, 41.56];

bus.startRoute(busPoint);
tram.startRoute(tramPoint);

let distance = calculateDistance(busPoint, tramPoint);
console.log(`Расстояние между точками: ${distance.toFixed(2)}`);

bus.fuelLevel = 50;