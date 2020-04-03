import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


interface Location{
  latitude:string;
  longitude:string;
}
@Injectable({
  providedIn: 'root'
})
export class ShoppinglistserviceService {
  private google = (<any>window).google;
  private googleMap;
  private googlePlacesService;
  private apiUrl = 'https://ipapi.co/json/';
  constructor(private http: HttpClient){}
    // list(): Observable<any>
    // {

    //   return this.http.get(url)
    // }
    // getlocation(){
    //   return this.http.get<Location>('http://api.ipapi.co/api/check?access_key=AIzaSyC6vmA4psalFEBizEQjiEeP1aNjDdizflc')
    // }
    getCookingList() {
      return this.http.get( 'http://localhost:3000/cookinglist');
    }
    getLocation():Observable<any>{
      return Observable.create(observer => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            observer.next(pos);
            observer.complete();
          }, (error) => {
            observer.error(error);
          });
        } else {
          observer.error('Browser doesnt support Geolocation');
        }
      });

    }


    createMap(mapElement, position) {
      this.googleMap = new this.google.maps.Map(mapElement, {
        center: position,
        zoom: 14,
        mapTypeId: this.google.maps.MapTypeId.HYBRID,
        disableDefaultUI: true
      });

      const trafficLayer = new this.google.maps.TrafficLayer();
      trafficLayer.setMap(this.googleMap);
      const transitLayer = new this.google.maps.TransitLayer();
      transitLayer.setMap(this.googleMap);
      this.googlePlacesService = new this.google.maps.places.PlacesService(this.googleMap);

      const marker = new this.google.maps.Marker({
        map: this.googleMap,
        animation: this.google.maps.Animation.DROP,
        position: position,
        icon: {
          path: this.google.maps.SymbolPath.CIRCLE,
          scale: 8
        }
      });
      marker.addListener('click', () => {
        marker.setAnimation(this.google.maps.Animation.BOUNCE);
        setTimeout(() => marker.setAnimation(null), 2000);
      });
    }



}
