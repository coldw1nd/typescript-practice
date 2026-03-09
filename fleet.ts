import { BaseTransport } from "./transport";
import { TransportID } from "./types";
import { Bus } from "./transport";

export class TransportFleet<T extends BaseTransport>{
    private vehicles: T[] = [];
    addVehicle(vehicle: T): void{
        this.vehicles.push(vehicle);
    }

    getVehicleById(id: TransportID): T | undefined{
        return this.vehicles.find(v => v.id === id);
    }

    getBusesOnly(): Bus[]{
        return this.vehicles.filter((v): v is T & Bus => v instanceof Bus);
    }
}

