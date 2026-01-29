import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  standalone: true,
  selector: 'app-registro',
  templateUrl: './registro.component.html', 
  styleUrls: ['./registro.component.scss'],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule]
})
export class RegistroComponent { 

  enviado = false;

  categorias = [
    'Tecnología',
    'Ropa',
    'Alimentos',
    'Accesorios'
  ];

  formulario = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    precio: [null, [Validators.required, Validators.min(1)]],
    categoria: ['', Validators.required],
    fechaIngreso: ['', Validators.required],
    disponible: [true],
    descripcion: [''],
    confirmar: [false, Validators.requiredTrue]
  });

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router
  ) {}

  async registrar() {
    this.enviado = true;

    if (this.formulario.invalid) {
      return;
    }

    // Guardamos los datos y navegamos al listado
    await this.storageService.guardarArticulo(this.formulario.value);
    this.formulario.reset();
    this.enviado = false;
    
    // Asegúrate de que esta ruta '/listado' coincida con tu app.routes.ts
    this.router.navigate(['/listado-registros']);
  }
}