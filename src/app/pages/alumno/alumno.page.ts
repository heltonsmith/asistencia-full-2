import { Component, inject, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
  private authService = inject(AuthService); // Obtener el servicio de autenticación
  usuario: string; // Campo para almacenar el nombre del usuario

  subscriptionAuthService: Subscription; // Subscripción para el observable del estado de autenticación

  photo: string | undefined;

  asignaturas = [
    { nombre: 'Programación en Python', codigo: 'INF101' },
    { nombre: 'Bases de Datos', codigo: 'INF102' },
    { nombre: 'Algoritmos y Estructuras de Datos', codigo: 'INF103' },
  ];

  public imageSrc: string | undefined = '';

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    const imageUrl = image.webPath;
    this.imageSrc = imageUrl;
  };

  ngOnInit() {
    this.subscriptionAuthService = this.authService.usuario$.subscribe(usuario => {
      this.usuario = usuario
    }); // Obtiene el nombre del usuario logueado
  }

  ngOnDestroy() {
    this.subscriptionAuthService?.unsubscribe(); // Desuscribirse del observable del estado de autenticación
  }

}
