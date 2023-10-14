import { Priority } from "../classes/Priority";
import { Status } from "../classes/Status";
import { Task } from "../classes/Task";
import { User } from "../classes/User";

export class Data {
    static priorities: Priority[] = [
    {
        id: 1,
        title: 'Low'
    },
    {
        id: 2,
        title: 'Medium'
    },
    {
        id: 3,
        title: 'High'
    },
    {
        id: 4,
        title: 'Critical'
    }
]

    static users: User[] = [
    {
        id: 1,
        firstName: 'Lado',
        lastName: 'Chopinovi'
    },
    {
        id: 2,
        firstName: 'Test 1',
        lastName: 'Test 1'
    },
    {
        id: 3,
        firstName: 'Test 2',
        lastName: 'Test 2'
    }
]

    static statuses: Status[] = [
        {
            id: 1,
            title: 'To Do'
        },
        {
            id: 2,
            title: 'In Progress'
        },
        {
            id: 3,
            title: 'Testing'
        },
        {
            id: 4,
            title: 'Done'
        }
    ]
    static tasks: Task[] = [
        {
            id: 1,
            title: 'Task 1',
            desc: 'Test task number 1 todo',
            priority: this.priorities[0],
            date: new Date(2023-10-11),
            assignTo: this.users[0],
            status: this.statuses[0]
        },

        {
            id: 1,
            title: 'Task 2',
            desc: 'Test task number 2 in progress',
            priority: this.priorities[2],
            date: new Date(2023-10-11),
            assignTo: this.users[0],
            status: this.statuses[1]
        },

        {
            id: 1,
            title: 'Task 3',
            desc: 'Test task number 3 in progress',
            priority: this.priorities[1],
            date: new Date(2023-10-11),
            assignTo: this.users[1],
            status: this.statuses[1]
        },

        {
            id: 1,
            title: 'Task 4',
            desc: 'Test task number 4 testing',
            priority: this.priorities[3],
            date: new Date(2023-10-11),
            assignTo: this.users[2],
            status: this.statuses[2]
        },

        {
            id: 1,
            title: 'Task 5',
            desc: 'Test task number 5 done',
            priority: this.priorities[3],
            date: new Date(2023-10-11),
            assignTo: this.users[0],
            status: this.statuses[3]
        },

    ]
}