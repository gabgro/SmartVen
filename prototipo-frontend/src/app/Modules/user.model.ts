import { Purchase } from "./purchase.model"

export interface User{

    id: number
    nome: string
    login: string
    senha: string
    tipo: string //cliente, organizador, administrador
    saldo: number
    historico: Purchase[]
}