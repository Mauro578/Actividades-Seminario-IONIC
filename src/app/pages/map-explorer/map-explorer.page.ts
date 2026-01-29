import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonModal } from '@ionic/angular';
import * as L from 'leaflet';
import { RouterLink } from '@angular/router';
type Poi = {
  id: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
};

@Component({
  selector: 'app-map-explorer',
  standalone: true,
  imports: [CommonModule, IonicModule,RouterLink],
  templateUrl: './map-explorer.page.html',
  styleUrls: ['./map-explorer.page.scss'],
})
export class MapExplorerPage implements AfterViewInit, OnDestroy {
  @ViewChild(IonModal) modal!: IonModal;

  private map?: L.Map;
  private userMarker?: L.Marker;
  private poiMarkers: L.Marker[] = [];

  loadingLocation = false;
  errorMsg = '';

  userCoords: { lat: number; lng: number } | null = null;

  isModalOpen = false;
  selectedPoi: Poi | null = null;
  distanceToSelectedMeters: number | null = null;

  // Puntos de interés simulados (puedes cambiarlos por los que quieras)
  // Nota: no dependen de APIs externas, así que funciona siempre.
  pois: Poi[] = [
    {
      id: 'p1',
      name: 'Portal Alfa',
      description: 'Punto de interés simulado para practicar interacción con mapas.',
      lat: 4.7110, // Bogotá (ejemplo)
      lng: -74.0721,
    },
    {
      id: 'p2',
      name: 'Portal Beta',
      description: 'Otro punto para probar selección y modal.',
      lat: 4.6680,
      lng: -74.0560,
    },
    {
      id: 'p3',
      name: 'Portal Gamma',
      description: 'Punto extra para practicar distancias.',
      lat: 4.7400,
      lng: -74.0900,
    },
  ];

  async ngAfterViewInit(): Promise<void> {
    // Crea mapa con un centro por defecto (se ajusta cuando obtienes ubicación)
    this.initMap({ lat: 4.7110, lng: -74.0721 }, 12);

    // Pinta puntos de interés
    this.renderPois();

    setTimeout(() => {
      this.map?.invalidateSize();
    }, 300);

    // Intenta ubicar al usuario (si da permiso)
    await this.locateUser();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  // ============ MAPA ============
  private initMap(center: { lat: number; lng: number }, zoom: number) {
    this.map = L.map('map', {
      center: [center.lat, center.lng],
      zoom,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(this.map);

  }

  private renderPois() {
    if (!this.map) return;

    // Limpia marcadores previos
    this.poiMarkers.forEach((m) => m.remove());
    this.poiMarkers = [];

    for (const poi of this.pois) {
      const marker = L.marker([poi.lat, poi.lng])
        .addTo(this.map)
        .on('click', () => this.openPoiModal(poi));

      marker.bindTooltip(poi.name, { direction: 'top', offset: [0, -10] });
      this.poiMarkers.push(marker);
    }
  }

  // ============ GEOLOCALIZACIÓN ============
  async locateUser(): Promise<void> {
    this.errorMsg = '';
    this.loadingLocation = true;

    try {
      const coords = await this.getBrowserLocation();
      this.userCoords = coords;
      this.setUserMarker(coords);
      this.map?.setView([coords.lat, coords.lng], 14);
    } catch (e: any) {
      this.errorMsg =
        e?.message ||
        'No se pudo obtener la ubicación. Revisa permisos del navegador y que el sitio esté en HTTPS o localhost.';
    } finally {
      this.loadingLocation = false;
    }
  }

  private getBrowserLocation(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      if (!('geolocation' in navigator)) {
        reject(new Error('El navegador no soporta geolocalización.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          reject(new Error(this.formatGeoError(err)));
        },
        {
          enableHighAccuracy: true,
          timeout: 8000,
          maximumAge: 0,
        }
      );
    });
  }

  private formatGeoError(err: GeolocationPositionError): string {
    switch (err.code) {
      case err.PERMISSION_DENIED:
        return 'Permiso de ubicación denegado.';
      case err.POSITION_UNAVAILABLE:
        return 'Ubicación no disponible.';
      case err.TIMEOUT:
        return 'Tiempo de espera agotado al obtener ubicación.';
      default:
        return 'Error desconocido de geolocalización.';
    }
  }

  private setUserMarker(coords: { lat: number; lng: number }) {
    if (!this.map) return;

    if (this.userMarker) {
      this.userMarker.setLatLng([coords.lat, coords.lng]);
      return;
    }

    this.userMarker = L.marker([coords.lat, coords.lng]).addTo(this.map);
    this.userMarker.bindPopup('Tu ubicación').openPopup();
  }

  // ============ MODAL + DISTANCIA ============
  openPoiModal(poi: Poi) {
    this.selectedPoi = poi;
    this.isModalOpen = true;

    this.distanceToSelectedMeters = null;
    if (this.userCoords) {
      this.distanceToSelectedMeters = this.haversineMeters(
        this.userCoords.lat,
        this.userCoords.lng,
        poi.lat,
        poi.lng
      );
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedPoi = null;
    this.distanceToSelectedMeters = null;
  }

  private haversineMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371000; // metros
    const toRad = (v: number) => (v * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

    return 2 * R * Math.asin(Math.sqrt(a));
  }
  
}
