import { Component, OnInit } from '@angular/core';
import { IonHeader, IonContent, IonTitle, IonToolbar, IonButton } from "@ionic/angular/standalone";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss'],
  imports: [IonHeader, IonContent, IonTitle, IonToolbar,IonButton, RouterLink],
})
export class GaleriaComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
