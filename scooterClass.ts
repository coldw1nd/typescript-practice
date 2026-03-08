import { ScooterID, ScooterStatus } from "./types";

export default class ElecticScooter{
    static totalScooters: number = 0;

    public readonly id: ScooterID;
    public brand: string;
    public status: ScooterStatus = ScooterStatus.FREE;
    private _battery: number;

    constructor(id: ScooterID, brand: string, battery: number){
        this.id = id;
        this.brand=brand;
        this._battery=battery;

        ElecticScooter.totalScooters++;
    }

    get battery(): number{
        return this._battery;
    }

    set battery(value: number){
        if (value > 100){
            this._battery = 100;
        }
        else if (value < 0){
            this._battery = 0;
        }
        else{
            this._battery = value;
        }
    }

    public rent(userName: string): void{
        if(this._battery > 10 && this.status === ScooterStatus.FREE){
            this.status = ScooterStatus.IN_USE;
            console.log(`Самокат ${this.id} арендован пользователем ${userName}`);
        }
        else{
            console.log(`Аренда самоката ${this.id} невозможна`);
        }
    }
}