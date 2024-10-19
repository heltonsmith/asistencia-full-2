import { Component, inject, OnInit } from '@angular/core';
import { WebService } from 'src/app/servicios/web.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  cargando: boolean = false;
  private webservice = inject(WebService)

  constructor() { }
  //constructor(private sharedService: SharedService) { }

  ngOnInit() {
  }

  async consumirServicio(){
    this.cargando = true;
    const url = 'https://66f73ae3b5d85f31a3424a28.mockapi.io/api/v1/'
    const res = await this.webservice.request('GET', url, 'users');
    console.log('Respuesta del servicio:', res);
    this.cargando = false;
  }

}
