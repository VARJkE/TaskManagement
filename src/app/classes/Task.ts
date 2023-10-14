import { Priority } from "./Priority";
import { Status } from "./Status";
import { User } from "./User";

export class Task {
    id: number;
    title: string;
    desc: string;
    priority: Priority;
    date: Date;
    assignTo: User;
    status: Status

    constructor(id: number, title: string, desc: string, priority: Priority, date: Date, assignTo: User, status: Status) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.priority = priority;
        this.date = date;
        this.assignTo = assignTo;
        this.status = status
    }
}