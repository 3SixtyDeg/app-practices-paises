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
  public termino:string = "";
  public hasError: boolean = false;
  public paises: Country [] = [];
  public paisesSugeridos: Country [] = [];

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }

  public buscar(termino: string) {
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

  public sugerencias(termino: string) {
    this.hasError = false;

    this.paisService.getCountriesByName(termino)
    .subscribe((response)=> {
      this.paisesSugeridos = response.splice(0, 5);
    }, (error) => {
      this.paisesSugeridos = [];
    })
  }

}
