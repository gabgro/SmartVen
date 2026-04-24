import { Component, signal } from '@angular/core';
import { PrimaryButton } from '../primary-button/primary-button';

@Component({
  selector: 'app-header',
  imports: [PrimaryButton],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  showButtonClicked(){
    console.log('clikcked')
  }
  /* signals podem ser usados especificando o tipo da variável ou não*/
  userName = signal<string>('NomeUsuario')
  saldo = signal(50.00)
  sair = signal('Sair')
  logout(){
    console.log('Usuário Deslogado')
  }
}
