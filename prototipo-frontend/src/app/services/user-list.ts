import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { User } from '../Modules/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserList {

  user = signal<User>(
    {
      id: 1,
      nome: "Gabriel",
      login: "gab123",
      senha: "123",
      tipo: "cliente",
      saldo: 500,
      historico: []
    }
  )
}
