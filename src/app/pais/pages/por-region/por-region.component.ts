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
  public termino:string = '';
  public hasError: boolean = false;
  public paises: Country [] = [];
  public regiones : string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  public regionActiva: string = '';
  
  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }

  getClassCss(region: string): string {
    return (region === this.regionActiva) ? 'btn btn-outline-primary active' : 'btn btn-outline-primary';
  }
  
  public buscar(termino: string) {
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
  
  public sugerencias(termino: string) {
    this.hasError = false;
  }

  public activarRegion(region: string) {
    this.regionActiva = region;
    this.buscar(region);
  }

}
