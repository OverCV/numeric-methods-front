import { Component, Input } from '@angular/core';
import { CreateApprox, ReadApprox } from 'src/app/models/approximation.model';

@Component({
  selector: 'app-foldy',
  templateUrl: './foldy.component.html',
  styleUrls: ['./foldy.component.css']
})
export class FoldyComponent {
  @Input() wallApprox: ReadApprox | undefined;
  panelOpenState = false;
}
