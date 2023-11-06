import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


export interface PeriodicElement {
  id: number;
  Approximation: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, Approximation: 'Op. Hydrogen' },
  { id: 2, Approximation: 'Op. Helium' },
  { id: 3, Approximation: 'Op. Lithium' },
  { id: 4, Approximation: 'Op. Beryllium' },
  { id: 5, Approximation: 'Op. Boron' },
  { id: 6, Approximation: 'Op. Carbon' },
  { id: 7, Approximation: 'Op. Nitrogen' },
  { id: 8, Approximation: 'Op. Oxygen' },
  { id: 9, Approximation: 'Op. Fluorine' },
  { id: 10, Approximation: 'Op. Neon' },
];

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'Approximation'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(
    private liveAnnouncer: LiveAnnouncer,
  ) { }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.active} ${sortState.direction}`);
    } else {
      this.liveAnnouncer.announce(`Sorting cleared`);
    }
  }
}