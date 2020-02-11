import { Detail } from './detail';

// export class Categories 
// {
//     data:Array<Category>;
//     links:Links;
//     meta:Meta;
// }

export class wsResponse<T>
{
    data:Array<T>;
    links:Links;
    meta:Meta;
}

export class Meta 
{
    current_page:number;
    from:number;
    last_page:number;
    path:String;
    to:number;
    total:number;
}

export class Links 
{
    first:string;
    last:string;
    prev:string;
}

export class Category 
{
    id:number;
    name:string;
    image:string;
}

export class Product 
{
    id:number;
    name:string;
    image:string;
    description:string;
    // price:string;
    price:number;
    size:string;
    category:Category;

    quantity:number;
}


export class Order
{
    order:number;
    user:string;
    details:Array<Detail>;
    status:string;
    paidout:boolean;
    created_at:number;
    total:number;
}

// {
//     "id": 2,
//     "name": "Pizza margarita",
//     "image": "http://192.168.250.12/PizzaApi/public/storage/3/afiliacion.png",
//     "description": "123",
//     "price": 123,
//     "size": "small",
//     "category": {
//         "id": 2,
//         "name": "Pizzas",
//         "image": "http://192.168.250.12/PizzaApi/public/storage/1/index.jpeg"
//     }
// }