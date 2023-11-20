import { Component, OnDestroy, OnInit } from '@angular/core'
import { CreateApprox, ReadApprox as ReadedApproxs, UpdateApprox } from 'src/app/models/approximation.model'
import { ApproxService } from 'src/app/services/dto/approx.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit, OnDestroy {
  approxs: ReadedApproxs[] = []
  private dataSubscription!: Subscription

  // approx: BaseApproximation | null = null

  constructor(
    private approxService: ApproxService
  ) { }

  ngOnInit(): void {
    this.getApproximations()
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  getApproximations() {
    // Suscribirse al Observable para obtener las aproximaciones actualizadas
    this.approxService.approximations$.subscribe(
      (data: ReadedApproxs[]) => {
        this.approxs = data
      }
    )
    // Cargar las aproximaciones cuando el componente se inicializa
    this.approxService.loadApproximations()
  }

  postApproximation() {
    let newApprox: CreateApprox = {
      title: '',
      f: '',
      ind_var: 't0',
      ind_value: 0.0,
      dep_var: 'x0',
      dep_value: 0.0,
      eval_value: 0.0,
      h: 0,
      N: 0.0,
    }
    // Crear una nueva aproximación básica tipo la interfaz ya declarada
    this.approxService.createApprox(newApprox).subscribe(
      (response) => {
        // Si la creación fue exitosa, recargar la lista de aproximaciones
        this.approxService.loadApproximations()
      },
      (error) => {
        console.error('Error al crear la aproximación', error)
      }
    )
  }
}
