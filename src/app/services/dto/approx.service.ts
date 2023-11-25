import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject, tap } from 'rxjs'
import { CreateApprox, ApproxResponse, UpdateApprox } from 'src/app/models/approximation.model'
import { GenericResponse } from 'src/app/models/generic.response.model'
import { environment } from 'src/app/environment/env.local'
import { ConstantResponse } from 'src/app/models/constant.model'
import { ReadGraph } from 'src/app/models/graph.model'

@Injectable({
  providedIn: 'root'
})
export class ApproxService {
  private approximationsSource = new BehaviorSubject<ApproxResponse[]>([])
  approximations$: Observable<ApproxResponse[]>
    = this.approximationsSource.asObservable()

  // private graphsSource = new BehaviorSubject<ReadGraph[]>([])
  // graphs$: Observable<ReadGraph[]>
  //   = this.graphsSource.asObservable()

  // private constsSource = new BehaviorSubject<ReadConstant[]>([])
  // consts$: Observable<ReadConstant[]>
  //   = this.constsSource.asObservable()

  server: string = `${environment.server}/approx`

  constructor(
    private http: HttpClient
  ) { }

  /* Data reload */

  updateApproximations(approxs: ApproxResponse[]) {
    this.approximationsSource.next(approxs)
  }
  loadApproximations() {
    this.readApproxs().subscribe(
      (response: GenericResponse<ApproxResponse[]>) => {
        this.updateApproximations(response.data)
      },
      error => {
        console.error('Error al cargar las aproximaciones', error)
      }
    )
  }

  // updateGraphs(graphs: ReadGraph[]) {
  //   this.graphsSource.next(graphs)
  // }
  // loadGraphs(id: number) {
  //   this.readApproxGraphs(id).subscribe(
  //     (response: GenericResponse<ReadGraph[]>) => {
  //       this.updateGraphs(response.data)
  //     },
  //     (error) => {
  //       console.error('Error al cargar las gráficas', error)
  //     }
  //   )
  // }

  // updateConsts(consts: ReadConstant[]) {
  //   this.constsSource.next(consts)
  // }
  // loadConstants(id: number) {
  //   this.readApproxConsts(id).subscribe(
  //     (response: GenericResponse<ReadConstant[]>) => {
  //       this.updateConsts(response.data)
  //     },
  //     (error) => {
  //       console.error('Error al cargar las constantes', error)
  //     }
  //   )
  // }

  /* CRUD OPS */

  createApprox(data: CreateApprox): Observable<GenericResponse<ApproxResponse>> {
    return this.http.post<GenericResponse<ApproxResponse>>(`${this.server}/post`, data)
  }

  readApproxs(): Observable<GenericResponse<ApproxResponse[]>> {
    return this.http.get<GenericResponse<ApproxResponse[]>>(`${this.server}/all`)
  }

  readApproxById(id: number): Observable<GenericResponse<ApproxResponse>> {
    return this.http.get<GenericResponse<ApproxResponse>>(`${this.server}/by_id/${id}`)
  }

  updateApprox(id: number, data: UpdateApprox): Observable<GenericResponse<ApproxResponse>> {
    return this.http.put<GenericResponse<ApproxResponse>>(`${this.server}/put/${id}`, data).
      pipe(tap(() => {
        this.loadApproximations()
      }))
  }

  deleteApprox(id: number): Observable<GenericResponse<ApproxResponse>> {
    return this.http.delete<GenericResponse<ApproxResponse>>(`${this.server}/delete/${id}`).
      pipe(tap(() => {
        this.loadApproximations() // Recargar las aproximaciones después de eliminar
      }))
  }

  /* Business Logic */

  solveApproximation(id: number): Observable<GenericResponse<number>> {
    return this.http.get<GenericResponse<number>>(`${this.server}/${id}/solve`)
  }

  readApproxGraphs(id: number): Observable<GenericResponse<ReadGraph[]>> {
    return this.http.get<GenericResponse<ReadGraph[]>>(`${this.server}/${id}/graphs`)
  }

  readApproxConsts(id: number | undefined): Observable<GenericResponse<ConstantResponse[]>> {
    if (!id) {
      return new Observable<GenericResponse<ConstantResponse[]>>()
    }
    return this.http.get<GenericResponse<ConstantResponse[]>>(`${this.server}/${id}/consts`)
  }
}
