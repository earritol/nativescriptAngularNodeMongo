export interface Item {
    id: number;
    name: string;
    role: string;
}

export interface Todo {
    title?: string;
    description?: string;
    _id?: string;
    done?: boolean;
    active?:boolean;
}
