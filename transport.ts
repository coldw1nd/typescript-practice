
import { TransportUtils } from "./utils";
import { TransportStatus, TransportID, Coordinates, RouteCallback } from "./types";

export interface IVehicle{
    id: TransportID;
    status: TransportStatus;
    startRoute(destination: Coordinates): void;
    driver: string | null | undefined;
}

export abstract class BaseTransport implements IVehicle{
    id: TransportID;
    status: TransportStatus;
    startRoute(destination: Coordinates): void{
        this.status = TransportStatus.IN_ROUTE;
    }
    driver: string | null | undefined;

    protected mileage: number = 0;
    private _fuelLevel: number = 0;
    readonly maxSpeed: number;
    static totalVehicles: number = 0;

    get fuelLevel(): number{
        return this._fuelLevel;
    }
    set fuelLevel(val: number){
        if(!(val < 0 || val > 100)){
            this._fuelLevel = val;
        }
    }

    abstract getTransportInfo(): string;

    constructor(id: TransportID, status: TransportStatus, maxSpeed: number){
        this.id = id;
        this.status = status;
        this.maxSpeed = maxSpeed;
    }
}

export function RegisterTransport<T extends {new(...args: any[]): {}}>(constructor: T){
    console.log(`[LOG]: Зарегистрирован новый класс транспорта: ${constructor.name}`);

    return class extends constructor{
        createdAt = new Date();
    }
}

export function LogRoute(target: any, propertyKey: string, descriptor: PropertyDescriptor){
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]){
        console.log(`Транспорт ${(this as any).id} начал движение!`);
        return originalMethod.apply(this, args);
    }
}

@RegisterTransport
export class Bus extends BaseTransport{
    getTransportInfo(): string {
        return `Автобус: [ID: ${this.id}], Макс. скорость: ${this.maxSpeed}`;
    }

    @LogRoute
    startRoute(destination: Coordinates): void {
        super.startRoute(destination);
        console.log(`Автобус едет в точку: Широта ${destination[0]}, Долгота ${destination[1]}`);
    }
}