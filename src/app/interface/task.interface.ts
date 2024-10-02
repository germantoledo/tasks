import { Person } from "./person.interface";

export interface Task{
    id: number,
    persons: Person[],
    title: string,
    limit_date: Date,
    status: string
}