// header.component.ts
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';

interface UsuarioAPI { // Definir la interface para los usuarios de la API
  user: string,
  pass: string,
  name: string,
  phone: string,
  rol: string
  id: string
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit, OnDestroy {
  private authService = inject(AuthService); // Obtener el servicio de autenticación
  usuario: string; // Campo para almacenar el nombre del usuario
  usuarioCompleto: UsuarioAPI; // Campo para almacenar el nombre del usuario

  subscriptionDatosPersonales: Subscription; // Subscripción para el observable del nombre del usuario
  subscriptionAuthService: Subscription; // Subscripción para el observable del estado de autenticación

  constructor() { }

  ngOnInit() {
    this.subscriptionAuthService = this.authService.usuario$.subscribe(usuario => {
      this.usuario = usuario
    }); // Obtiene el nombre del usuario logueado

    this.subscriptionAuthService = this.authService.usuarioCompleto$.subscribe(usuarioCompleto => {
      this.usuarioCompleto = usuarioCompleto;
    });
  }

  ngOnDestroy() {
    this.subscriptionDatosPersonales?.unsubscribe(); // Desuscribirse del observable del nombre del usuario
    this.subscriptionAuthService?.unsubscribe(); // Desuscribirse del observable del estado de autenticación
  }

}
