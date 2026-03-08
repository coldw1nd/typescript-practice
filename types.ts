export enum ScooterStatus
{
    CHARGING = "Заряжается",
    FREE = "Свободен",
    IN_USE = "В аренде"
}

export type Coordinates = [number, number];

export type ScooterID = number | string;

export type Scooter = {
    id: ScooterID,
    brand: string,
    status: ScooterStatus,
    battery: number,
    currentUser: string | null,
    lastCoordinates?: Coordinates
}