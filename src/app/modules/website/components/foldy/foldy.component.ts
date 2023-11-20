import { Component, Input } from '@angular/core';
import { CreateApprox, ReadApprox } from 'src/app/models/approximation.model';
import { GenericResponse } from 'src/app/models/generic.response.model';
import { ReadGraph } from 'src/app/models/graph.model';
import { ApproxService } from 'src/app/services/dto/approx.service';
import { environment } from 'src/app/environment/env.local';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-foldy',
  templateUrl: './foldy.component.html',
  styleUrls: ['./foldy.component.css']
})
export class FoldyComponent {
  @Input() wallApprox: ReadApprox | undefined;
  panelOpenState = false;
  graphs: ReadGraph[] = []
  routeImages: string

  isLoading: boolean = false

  constructor(
    private approxGraphService: ApproxService,
    private _snackBar: MatSnackBar
  ) {
    this.routeImages = environment.server
  }

  openSnackBar(message: string, action: string, durationInSeconds: number) {
    this._snackBar.open(message, action, {
      duration: durationInSeconds * 1000,
    });
  }

  getGraphs(id: number) {
    this.approxGraphService.readApproxGraphs(id).subscribe(
      (response: GenericResponse<ReadGraph[]>) => {
        if (response && response.data) {
          this.graphs = response.data
        }
      },
      (error) => {
        console.error('Error al cargar las gráficas', error)
      }
    )
  }

  solveApproximation(id: number) {
    this.isLoading = true
    this.approxGraphService.solveApproximation(id).subscribe(
      (response: GenericResponse<number>) => {
        if (response && response.data) {
          let message: string = `Approximation ${this.wallApprox?.title} solved!`
          this.openSnackBar(
            message,
            'Cerrar',
            1.4
          )
          this.isLoading = false
        }
      },
      (error) => {
        console.error('Error al cargar las gráficas', error)
      }
    )
  }

}
