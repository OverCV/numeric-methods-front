import { Component, Input } from '@angular/core';
import { CreateApprox, ApproxResponse } from 'src/app/models/approximation.model';
import { GenericResponse } from 'src/app/models/generic.response.model';
import { ReadGraph } from 'src/app/models/graph.model';
import { ApproxService } from 'src/app/services/dto/approx.service';
import { ConstService } from 'src/app/services/dto/const.service';
import { environment } from 'src/app/environment/env.local';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateConstant, ConstantResponse, UpdateConstant } from 'src/app/models/constant.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-foldy',
  templateUrl: './foldy.component.html',
  styleUrls: ['./foldy.component.css']
})
export class FoldyComponent {
  @Input() foldyApprox: ApproxResponse | undefined;
  graphs: ReadGraph[] = []
  consts: ConstantResponse[] = []

  routeImages: string
  panelOpenState = false;

  isLoading: boolean = false

  // formData: FormGroup


  constructor(
    private approxService: ApproxService,
    private constService: ConstService,
    private _snackBar: MatSnackBar
  ) {
    this.routeImages = environment.server
    // this.formData = this.initForm(this.cons)
  }

  openSnackBar(message: string, action: string, durationInSeconds: number) {
    this._snackBar.open(message, action, {
      duration: durationInSeconds * 1000,
    });
  }

  getGraphs(id: number) {
    this.approxService.readApproxGraphs(id).subscribe(
      (response: GenericResponse<ReadGraph[]>) => {
        if (response && response.data) {
          this.graphs = response.data
        }
      },
      (error) => {
        let message = `Error al cargar las gráficas` + error
        this.openSnackBar(message, 'O-oh..', 1.4)
      }
    )
  }

  getConsts(approx_id: number) {
    this.approxService.readApproxConsts(approx_id).subscribe(
      (response: GenericResponse<ConstantResponse[]>) => {
        if (response && response.data) {
          this.consts = response.data
        }
      },
      (error) => {
        let message: string = `No hay constantes`
        this.openSnackBar(message, 'Okay!', 1.4)
        console.log(error);
      }
    )
  }


  solveApproximation(id: number) {
    this.isLoading = true
    this.approxService.solveApproximation(id).subscribe(
      (response: GenericResponse<number>) => {
        if (response && response.data) {
          let message: string = `Approximation ${this.foldyApprox?.title} solved!`
          this.openSnackBar(message, 'Cerrar', 1.4)
          this.isLoading = false
        }
      },
      (error) => {
        let message: string = `Error al cargar las gráficas` + error
        this.openSnackBar(message, 'O-oh..', 1.4)
      }
    )
  }

  addConstant(approx_id: number) {
    let newConst: CreateConstant = {
      name: '_a',
      value: 0.0
    }
    this.constService.createConst(approx_id, newConst).subscribe(
      (response) => {
        // Si la creación fue exitosa, recargar la lista de constantes
        this.constService.loadConstants()
        this.getConsts(approx_id)
      },
      (error) => {
        console.error('Error al crear la constante', error)
      }
    )
  }

  updateConstant(id: number, constant: UpdateConstant, approx_id: number) {
    
    
    this.constService.updateConst(id, constant).subscribe(
      (response) => {
        // Si la creación fue exitosa, recargar la lista de constantes
        this.constService.loadConstants()
        this.getConsts(approx_id)
      },
      (error) => {
        console.error('Error al actualizar la constante', error)
      }
    )
  }

  deleteConstant(id: number, approx_id: number) {
    this.constService.deleteConst(id).subscribe(
      (response) => {
        // Si la creación fue exitosa, recargar la lista de constantes
        this.constService.loadConstants()
        this.getConsts(approx_id)
      },
      (error) => {
        console.error('Error al eliminar la constante', error)
      }
    )
  }

}
