import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent implements OnInit {
  termino:string = "";
  hasError: boolean = false;
  paises: Country [] = [];
  paisesSugeridos: Country [] = [];

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }

  buscar(termino: string) {
    this.hasError = false;
    this.termino = termino;
    
    this.paisService.getCountriesByName(this.termino)
      .subscribe((response) => {
        this.paises = response;
      }, (error) => {
        this.hasError = true;
        this.paises = [];
      });

  }

  sugerencias(termino: string) {
    this.hasError = false;

    this.paisService.getCountriesByName(termino)
    .subscribe((response)=> {
      this.paisesSugeridos = response.splice(0, 5);
    }, (error) => {
      this.paisesSugeridos = [];
    })
  }

}
