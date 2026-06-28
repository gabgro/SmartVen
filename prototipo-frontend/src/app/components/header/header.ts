import { Component, signal, inject } from '@angular/core';
import { PrimaryButton } from '../primary-button/primary-button';
import { CartService } from '../../services/cart';
import { RouterLink } from '@angular/router';
import { UserList } from '../../services/user-list';

@Component({
  selector: 'app-header',
  imports: [PrimaryButton, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {

  cartServ = inject(CartService)
  userServ = inject(UserList)
  
  /* signals podem ser usados especificando o tipo da variável ou não*/
  usuario = this.userServ.user()
  userName = this.usuario.nome
  saldo = signal(this.usuario.saldo)

  sair = signal('Sair')
  showButtonClicked(){
    console.log('clikcked')
  }
  logout(){
    console.log('Usuário Deslogado')
  }
}
