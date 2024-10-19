import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  usuario: string = '';
  clave: string = '';
  nombreCompleto: string = '';
  telefono: string = '';
  rol: string = 'alumno'; // Valor por defecto 'alumno'

  errorMessage: string = ''; // Para mostrar mensajes de error (si el usuario ya existe)
  successMessage: string = ''; // Para mostrar mensaje de éxito

  private authService = inject(AuthService);
  private router = inject(Router);
  private alertController = inject(AlertController);  // Inyecta el AlertController

  registroFallido: boolean = false;

  // Método para validar si el usuario ya existe
  async validarUsuarioExistente(usuario: string): Promise<boolean> {
    try {
      const usuariosExistentes = await this.authService.obtenerUsuarios();
      return usuariosExistentes.some(u => u.user === usuario);
    } catch (error) {
      this.errorMessage = 'Error al validar el usuario';
      await this.mostrarAlerta('Error', 'Error al validar el usuario. Inténtalo de nuevo.');
      return true; // En caso de error, asumimos que el usuario existe para evitar fallos
    }
  }

  // Método para registrar un nuevo usuario
  async registrar() {
    // Limpiar mensajes anteriores
    this.errorMessage = '';
    this.successMessage = '';
    this.registroFallido = false;

    // Verificar si el usuario ya existe
    const usuarioExiste = await this.validarUsuarioExistente(this.usuario);

    if (usuarioExiste) {
      this.errorMessage = 'El nombre de usuario ya está en uso. Por favor, elige otro.';
      this.registroFallido = true;
      await this.mostrarAlerta('Error', this.errorMessage);  // Muestra alerta de error
      return;
    }

    // Si el usuario no existe, proceder con el registro
    const nuevoUsuario = {
      user: this.usuario,
      pass: this.clave,
      name: this.nombreCompleto,
      phone: this.telefono,
      rol: this.rol
    };

    try {
      await this.authService.registrarNuevoUsuario(nuevoUsuario);
      this.successMessage = 'Usuario registrado exitosamente!';
      await this.mostrarAlerta('Éxito', this.successMessage);  // Muestra alerta de éxito
      // this.router.navigate(['/login']);  // Redirige al login después del registro exitoso
    } catch (error) {
      this.errorMessage = 'Hubo un error al registrar el usuario. Inténtalo de nuevo.';
      this.registroFallido = true;
      await this.mostrarAlerta('Error', this.errorMessage);  // Muestra alerta de error
    }
  }

  // Método para mostrar alertas
  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();  // Muestra la alerta
  }

}
