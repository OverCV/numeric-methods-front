import { Component, OnInit } from '@angular/core';
import { ApproxService } from './services/dto/approx.service';
import { ReadApprox } from './models/approximation.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  approxs: ReadApprox[] = []

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
      (data: ReadApprox[]) => {
        this.approxs = data.reverse()
      }
    )

    // Cargar las aproximaciones cuando el componente se inicializa
    this.approxService.loadApproximations()
  }

  title = 'frontend';
}
