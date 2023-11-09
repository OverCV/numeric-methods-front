import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject, tap } from 'rxjs'
import { CreateApprox, ReadApprox, UpdateApprox } from 'src/app/models/approximation.model'
import { GenericResponse } from 'src/app/models/generic.response.model'
import { environment } from 'src/app/environment/env.local'

@Injectable({
  providedIn: 'root'
})
export class ApproxService {
  private approximationsSource = new BehaviorSubject<ReadApprox[]>([])
  approximations$: Observable<ReadApprox[]> = this.approximationsSource.asObservable()

  server: string = `${environment.server}/approx`

  constructor(
    private http: HttpClient
  ) { }

  createApprox(data: CreateApprox): Observable<GenericResponse<ReadApprox>> {
    return this.http.post<GenericResponse<ReadApprox>>(`${this.server}`, data)
  }

  readApprox(): Observable<GenericResponse<ReadApprox[]>> {
    return this.http.get<GenericResponse<ReadApprox[]>>(`${this.server}`)
  }

  readApproxById(id: number): Observable<GenericResponse<ReadApprox>> {
    return this.http.get<GenericResponse<ReadApprox>>(`${this.server}/approx/${id}`)
  }

  updateApprox(id: number, data: UpdateApprox): Observable<GenericResponse<ReadApprox>> {
    return this.http.put<GenericResponse<ReadApprox>>(`${this.server}/${id}`, data).pipe(
      tap(() => {
        this.loadApproximations(); // Recargar las aproximaciones después de actualizar
      })
    )
  }

  updateApproximations(approxs: ReadApprox[]) {
    this.approximationsSource.next(approxs)
  }

  loadApproximations() {
    this.readApprox().subscribe(
      (response: GenericResponse<ReadApprox[]>) => {
        this.updateApproximations(response.data)
      },
      error => {
        console.error('Error al cargar las aproximaciones', error)
      }
    )
  }

  deleteApprox(id: number): Observable<GenericResponse<ReadApprox>> {
    return this.http.delete<GenericResponse<ReadApprox>>(`${this.server}/${id}`).pipe(
      tap(() => {
        this.loadApproximations(); // Recargar las aproximaciones después de eliminar
      })
    )
  }
}
