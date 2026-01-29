import { Component, OnInit } from '@angular/core';
import { IonHeader, IonContent, IonTitle, IonToolbar,IonButton, } from "@ionic/angular/standalone";
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  imports: [IonHeader, IonContent, IonTitle, IonToolbar,IonButton,RouterLink],
})
export class PerfilComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
