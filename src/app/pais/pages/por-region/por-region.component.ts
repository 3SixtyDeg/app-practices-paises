import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
  ]
})
export class PorRegionComponent implements OnInit {
  termino:string = '';
  hasError: boolean = false;
  paises: Country [] = [];
  regiones : string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';
  
  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }

  getClassCss(region: string): string {
    return (region=== this.regionActiva) ? 'btn btn-primary' : 'btn btn-outline-primary';
  }
  
  buscar(termino: string) {
    this.hasError = false;
    this.termino = termino;
    
    this.paisService.getCountriesByRegion(this.termino)
      .subscribe((response) => {
        this.paises = response;
      }, (error) => {
        this.hasError = true;
        this.paises = [];
      });

  }
  
  sugerencias(termino: string) {
    this.hasError = false;
  }

  activarRegion(region: string) {
    this.regionActiva = region;
    this.buscar(region);
  }

}
