import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import * as Proj from 'ol/proj';
import { defaults as defaultControls } from 'ol/control';



@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [

  ]
})
export class VerPaisComponent implements OnInit {
  @ViewChild('mapa_id') mapa!:ElementRef<HTMLInputElement>;
  private zoom: number = 5;
  private lat!: number;
  private lon!: number;
  public pais!: Country;
  map!: Map;

  constructor(private activatedRoute: ActivatedRoute, 
    private paisService: PaisService) { }

  ngOnInit(): void {

    this.activatedRoute.params
    .pipe(
      switchMap((param) => this.paisService.getCountryByCode(param.id)),
      tap()
    )
    .subscribe((response) => {
      this.pais = response;
      this.lat = this.pais.latlng[0];
      this.lon = this.pais.latlng[1];

      setTimeout(() => {                         
        this.makeMap();
      }, 100);
      
    })

  }

  private makeMap() {

    this.map = new Map({
      target: "mapa",
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: Proj.fromLonLat([this.lon, this.lat]),
        zoom: this.zoom
      }),
      controls: defaultControls({attribution: false, zoom: false}).extend([])
    });

  }

}
