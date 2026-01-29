import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PhotosService, Photo } from '../../services/photos.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule,RouterLink]
})
export class GalleryPage implements OnInit {
  photos: Photo[] = [];
  loading = true;
  errorMsg = '';
  constructor(private photoService: PhotosService) { }

  ngOnInit():void {
    this.photoService.getPhotos().subscribe({
      next: (data) => {
        this.photos = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('No se pudieron cargar las imagenes', err);
        this.loading = false;
      }
    })
  }

  trackById(_: number, item: Photo){
    return item.id;
  }

}
