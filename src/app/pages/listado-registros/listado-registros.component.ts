import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-listado-registros',
  templateUrl: './listado-registros.component.html',
  styleUrls: ['./listado-registros.component.scss'],
  imports: [CommonModule, IonicModule, RouterModule,RouterLink]
})
export class ListadoRegistrosComponent { // Clase renombrada para coincidir con tus rutas

  articulos: any[] = [];

  constructor(
    private storageService: StorageService,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    this.cargar();
  }

  async cargar() {
    this.articulos = await this.storageService.obtenerArticulos();
  }

  async confirmarBorrado() {
    const alerta = await this.alertCtrl.create({
      header: 'Eliminar registros',
      message: '¿Desea borrar todos los artículos almacenados?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            await this.storageService.eliminarTodos();
            this.articulos = [];
          }
        }
      ]
    });

    await alerta.present();
  }
}