export interface Notice {
    _id: string;
    title: string;
    description: string;
    categories: Category;
    userId: string;
    date: string;
    price: number;
    imgs: Array<string>;
    location ?: string;
    type ?: number;
    expDate: string;
}
export interface Category {
    _id: string;
    name: string;
    description: string;
}

export interface RegisterUser {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    login: string;
    password: string;
}

export interface User {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    login: string;
    password: string;
    notices: Notice[];
}

export interface LoginUser {
    login: string;
    password: string;
}
export interface AddNotice {
    title: string;
    description: string;
    categories?: Array<string>;
    price?: number;
    imgs: Array<string>;
    location ?: string;
    type ?: number;
}