import {Planet} from "./planet";

export interface PlanetsResponse {
    count: number;
    next: string | null;
    prev: string | null;
    results: Planet[]
}