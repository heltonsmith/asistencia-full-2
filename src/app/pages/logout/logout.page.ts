import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  private authService = inject(AuthService);  // Inyecta el servicio de autenticación

  constructor() {}

  ngOnInit(): void {
    this.authService.logout();  // Cierra la sesión
  }


}
