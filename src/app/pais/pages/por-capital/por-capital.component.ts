import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent implements OnInit {
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

      if (this.termino.trim() != '') {

        this.paisService.getCountriesByCapital(this.termino)
        .subscribe((response) => {
          this.paises = response;
        }, (error) => {
          this.hasError = true;
          this.paises = [];
        });

      } else {
        this.paises = [];
      }
      
    }
  
    public sugerencias(termino: string) {
      this.hasError = false;

      if (termino.trim() != '') {
        this.paisService.getCountriesByCapital(termino)
        .subscribe((response)=> {
          this.paisesSugeridos = response.splice(0, 5);
        }, (error) => {
          this.paisesSugeridos = [];
        });

      } else {
        this.paisesSugeridos = [];
      }
      
    }

}
