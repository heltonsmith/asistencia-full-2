import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  private route = inject(ActivatedRoute);

  constructor() {
    this.route.params.subscribe(params => {
      console.log(params);
      console.log('Código: ' + params['codigo']);
      console.log('Fecha: ' + params['fecha']);
      console.log('Usuario: ' + params['usuario']);
    });
  }

  ngOnInit() {
    console.log('Asistencia OnInit!');
  }

}
