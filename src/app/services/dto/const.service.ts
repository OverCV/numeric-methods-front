import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject, tap } from 'rxjs'
import { environment } from 'src/app/environment/env.local'
import { CreateConstant, ConstantResponse } from 'src/app/models/constant.model'
import { GenericResponse } from 'src/app/models/generic.response.model'

@Injectable({
  providedIn: 'root'
})
export class ConstService {
  private constantsSource = new BehaviorSubject<ConstantResponse[]>([])
  Constants$: Observable<ConstantResponse[]>
    = this.constantsSource.asObservable()

  server: string = `${environment.server}/const`


  constructor(
    private http: HttpClient
  ) { }

  updateConstants(consts: ConstantResponse[]) {
    this.constantsSource.next(consts)
  }
  loadConstants() {
    this.readConstants().subscribe(
      (response: GenericResponse<ConstantResponse[]>) => {
        this.updateConstants(response.data)
      },
      error => {
        console.error('Error al cargar las aproximaciones', error)
      }
    )
  }

  readConstants(): Observable<GenericResponse<ConstantResponse[]>> {
    return this.http.get<GenericResponse<ConstantResponse[]>>(`${this.server}/all`)
  }

  createConst(approx_id: number, constant: CreateConstant): Observable<GenericResponse<ConstantResponse>> {
    return this.http.post<GenericResponse<ConstantResponse>>(`${this.server}/post/${approx_id}`, constant)
  }

  updateConst(id: number, constant: CreateConstant): Observable<GenericResponse<ConstantResponse>> {
    return this.http.put<GenericResponse<ConstantResponse>>(`${this.server}/put/${id}`, constant)
  }

  deleteConst(id: number): Observable<GenericResponse<ConstantResponse>> {
    return this.http.delete<GenericResponse<ConstantResponse>>(`${this.server}/delete/${id}`)
  }
}
