import { Component, ElementRef, ViewChild } from '@angular/core';

import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Geolocation, Position } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('map')
  mapRef!: ElementRef<HTMLElement>;
  newMap!: GoogleMap;

  constructor() {}
  ionViewWillEnter() {
    this.createMap();
  }

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'my-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.mapsKey,
      config: {
        center: {
          lat: -25.436130788703274, 
          lng: -49.28844033429644,
        },
        zoom: 1,
      },
    });
    this.getPosition();
  }

  async getPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates);
    this.addMarker(coordinates);
    return coordinates;
  }

  //Adiciona marcador no mapa
  async addMarker(cordinates: Position) {
    const markerId = await this.newMap.addMarker({
      coordinate: {
        lat: cordinates.coords.latitude,
        lng: cordinates.coords.longitude,
      },
    });
    this.zoomInMarker(cordinates);
  }

  //Metodo para dar zoom no mapa de acordo com a posição do marcador 
  zoomInMarker(cordinates: Position) {
    this.newMap.setCamera({
      coordinate:{
        lat: cordinates.coords.latitude,
        lng: cordinates.coords.longitude,
      },
      zoom: 15,
      animate: true
    })
  }
}