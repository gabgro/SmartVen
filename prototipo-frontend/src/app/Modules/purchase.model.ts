import { Product } from "./products.model"

export interface Purchase{

    data: Date
    quantidade: number
    produto: Product
    status: string //resgatado ou não
}