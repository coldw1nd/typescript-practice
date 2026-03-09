export enum TransportStatus{
    IDLE, IN_ROUTE, BROKEN
}

export type Coordinates = [number, number];

export type TransportID = string | number;

export type RouteCallback = (id: TransportID) => void;