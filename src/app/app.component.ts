import { Component, OnInit } from '@angular/core';
import { ApproxService } from './services/dto/approx.service';
import { ApproxResponse } from './models/approximation.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  approxs: ApproxResponse[] = []

  constructor(
    private approxService: ApproxService
  ) {}

  ngOnInit(): void {
    console.log(`app-component onInit`)
    this.getApproximations()
  }

  getApproximations() {
    // Suscribirse al Observable para obtener las aproximaciones actualizadas
    this.approxService.approximations$.subscribe(
      (data: ApproxResponse[]) => {
        this.approxs = data
      }
    )

    // Cargar las aproximaciones cuando el componente se inicializa
    this.approxService.loadApproximations()
  }

  title = 'frontend';
}
