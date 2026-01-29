import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { 
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonText
 } from '@ionic/angular/standalone';

import { Registro, StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-listado-registros',
  templateUrl: './listado-registros.component.html',
  styleUrls: ['./listado-registros.component.scss'],
  imports: [
    CommonModule,
    DatePipe,
    RouterLink,

    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonText
  ]
})
export class ListadoRegistrosComponent  implements OnInit {
  registros: Registro[] = [];
  cargando = true;

  constructor(private storageSvc: StorageService) { }

  async ngOnInit() {
    await this.cargar();
  }
  ionViewWillEnter() {
    this.cargar();
  }


  async cargar(){
    this.cargando = true;
    this.registros = await this.storageSvc.getRegistros();
    this.cargando = false;
  }

  async borrarTodo(){
    this.cargando = true;
    await this.storageSvc.clearRegistros();
    await this.cargar();
  }
  confirmarBorrado() {
  if (confirm('¿Seguro que deseas borrar todos los registros?')) {
    this.borrarTodo();
  }
}

}
