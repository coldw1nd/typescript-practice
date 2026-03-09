
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
        BaseTransport.totalVehicles++;
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
    private passengers: string[] = [];

    getTransportInfo(): string {
        return `Автобус: [ID: ${this.id}], Макс. скорость: ${this.maxSpeed}`;
    }

    addPassengers(...passengers: string[]): void{
        this.passengers.push(...passengers);
        console.log(`В автобус сели: ${passengers.join(", ")}. Всего ${passengers.length} человек`)
    }

    @LogRoute
    startRoute(destination: Coordinates): void {
        super.startRoute(destination);
        console.log(`Автобус едет в точку: Широта ${destination[0]}, Долгота ${destination[1]}`);
    }
}

@RegisterTransport
export class Tram extends BaseTransport{
    getTransportInfo(): string {
        return `Травмай: [ID: ${this.id}], Макс. скорость: ${this.maxSpeed}`;
    }
}

type Constructor<T = {}> = new(...args: any[]) => T;

export function Payable<TBase extends Constructor>(Base: TBase){
    return class extends Base{
        balance: number = 0;
        payFare(amount: number): void{
            this.balance += amount;
            console.log(`Оплачен проезд ${amount}. Текущий баланс: ${this.balance}`)
        }
    }
}

export const PayableTram = Payable(Tram);