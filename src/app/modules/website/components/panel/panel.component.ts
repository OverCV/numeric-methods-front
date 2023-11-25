import { LiveAnnouncer } from '@angular/cdk/a11y'
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core'
import { MatSort, Sort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { CreateApprox, ApproxResponse } from 'src/app/models/approximation.model'
import { ApproxService } from 'src/app/services/dto/approx.service'

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort!: MatSort
  // @Input() ApproxData: ReadApprox | undefined

  // approxs: ReadApprox[] = []

  displayedColumns: string[] = ['id', 'title']
  dataSource = new MatTableDataSource()

  constructor(
    private liveAnnouncer: LiveAnnouncer,
    private approxService: ApproxService
  ) { }

  ngOnInit(): void {
    this.getApproximations()
    //  = this.approxs
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort
  }

  getApproximations() {
    // Suscribirse al Observable para obtener las aproximaciones actualizadas
    this.approxService.approximations$.subscribe(
      (data: ApproxResponse[]) => {
        this.dataSource.data = data
      }
    )
    // Cargar las aproximaciones cuando el componente se inicializa
    this.approxService.loadApproximations()
  }

  deleteApproximation(id: number) {
    console.log('id: ', id)
    this.approxService.deleteApprox(id).subscribe(
      (response) => {
        // La eliminación fue exitosa, la lista se recargará automáticamente
        this.approxService.loadApproximations()
      },
      (error) => {
        console.error('Error al eliminar la aproximación', error)
      }
    )
    this.approxService.loadApproximations()
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.active} ${sortState.direction}`)
    } else {
      this.liveAnnouncer.announce(`Sorting cleared`)
    }
  }
}