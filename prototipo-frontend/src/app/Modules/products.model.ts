export interface Product{
    id: number
    title: string
    image: string
    price: number
    /* A interrogação serve para marcar como um campo opcional*/
    stock?: number
}