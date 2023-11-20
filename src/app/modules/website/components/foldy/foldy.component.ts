import { Component, Input } from '@angular/core';
import { CreateApprox, ReadApprox } from 'src/app/models/approximation.model';
import { GenericResponse } from 'src/app/models/generic.response.model';
import { ReadGraph } from 'src/app/models/graph.model';
import { ApproxService } from 'src/app/services/dto/approx.service';
import { environment } from 'src/app/environment/env.local';

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

  constructor(
    private approxGraphService: ApproxService
  ) {
    this.routeImages = environment.server
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


}
