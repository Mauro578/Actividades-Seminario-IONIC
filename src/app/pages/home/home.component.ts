import { Component, OnInit } from '@angular/core';
import { IonHeader, IonContent, IonTitle, IonToolbar, IonButton,IonCol,IonRow,IonGrid } from "@ionic/angular/standalone";
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [IonHeader, IonContent, IonTitle, IonToolbar,IonButton, RouterLink,IonCol,IonRow,IonGrid],
})
export class HomeComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}