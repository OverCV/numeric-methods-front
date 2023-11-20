import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject, tap } from 'rxjs'
import { CreateApprox, ReadApprox, UpdateApprox } from 'src/app/models/approximation.model'
import { GenericResponse } from 'src/app/models/generic.response.model'
import { environment } from 'src/app/environment/env.local'
import { ReadConstant } from 'src/app/models/constant.model'
import { ReadGraph } from 'src/app/models/graph.model'

@Injectable({
  providedIn: 'root'
})
export class ApproxService {


  private approximationsSource = new BehaviorSubject<ReadApprox[]>([])
  approximations$: Observable<ReadApprox[]>
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

  updateApproximations(approxs: ReadApprox[]) {
    this.approximationsSource.next(approxs)
  }
  loadApproximations() {
    this.readApproxs().subscribe(
      (response: GenericResponse<ReadApprox[]>) => {
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

  createApprox(data: CreateApprox): Observable<GenericResponse<ReadApprox>> {
    return this.http.post<GenericResponse<ReadApprox>>(`${this.server}`, data)
  }

  readApproxs(): Observable<GenericResponse<ReadApprox[]>> {
    return this.http.get<GenericResponse<ReadApprox[]>>(`${this.server}`)
  }

  readApproxById(id: number): Observable<GenericResponse<ReadApprox>> {
    return this.http.get<GenericResponse<ReadApprox>>(`${this.server}/approx/${id}`)
  }

  updateApprox(id: number, data: UpdateApprox): Observable<GenericResponse<ReadApprox>> {
    return this.http.put<GenericResponse<ReadApprox>>(`${this.server}/${id}`, data).pipe(
      tap(() => {
        this.loadApproximations() // Recargar las aproximaciones después de actualizar
      })
    )
  }

  deleteApprox(id: number): Observable<GenericResponse<ReadApprox>> {
    return this.http.delete<GenericResponse<ReadApprox>>(`${this.server}/${id}`).
      pipe(
        tap(() => {
          this.loadApproximations() // Recargar las aproximaciones después de eliminar
        })
      )
  }

  /* Business Logic */

  readApproxGraphs(id: number): Observable<GenericResponse<ReadGraph[]>> {
    return this.http.get<GenericResponse<ReadGraph[]>>(`${this.server}/${id}/graphs`)
  }

  readApproxConsts(id: number): Observable<GenericResponse<ReadConstant[]>> {
    return this.http.get<GenericResponse<ReadConstant[]>>(`${this.server}/${id}/consts`)
  }
}
