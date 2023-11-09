import {
  Component, Input, OnInit, OnChanges, SimpleChanges
} from '@angular/core'
import {
  FormBuilder, FormControl, FormGroup, Validators
} from '@angular/forms'
import { FloatLabelType } from '@angular/material/form-field'
import { CreateApprox, ReadApprox } from 'src/app/models/approximation.model'
import { ApproxService } from 'src/app/services/dto/approx.service'

@Component({
  selector: 'app-approx-form',
  templateUrl: './approx-form.component.html',
  styleUrls: ['./approx-form.component.css'],
})
export class ApproxFormComponent implements OnInit {
  @Input() ApproxData: ReadApprox | undefined

  approxs: ReadApprox[] = []
  app_id: number | undefined

  hideRequiredControl = new FormControl(false)
  floatLabelControl = new FormControl('auto' as FloatLabelType)

  formData: FormGroup

  constructor(private formBuilder: FormBuilder, private approxService: ApproxService) {
    this.formData = this.initForm(this.ApproxData)
  }

  ngOnInit(): void {
    console.log(`Approximation data: ${this.ApproxData}`)
    this.formData = this.initForm(this.ApproxData)
  }

  initForm(initData: ReadApprox | undefined): FormGroup {
    return this.formBuilder.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,

      title: [
        initData?.title === '' ?
          `Operación 0${initData?.id ?? 0}` : initData?.title,
        Validators.required
      ],
      dep_var: [initData?.dep_var ?? '', Validators.required],
      dep_value: [initData?.dep_value ?? '', Validators.required],
      ind_var: [initData?.ind_var ?? '', Validators.required],
      ind_value: [initData?.ind_value ?? '', Validators.required],
      eval_value: [initData?.eval_value ?? '', Validators.required],
      N: [initData?.N ?? '', Validators.required],
      f: [initData?.f || '', Validators.required],
    })
  }

  saveApproximation(id: number, approx: CreateApprox) {
    // Check for the validators
    if (this.formData.invalid) {
      console.log('Form is not valid')
      return
    }
    console.log(`Saving approximation with id ${id}`)

    // this.service.updateApprox(id, approx).subscribe(
    //   (res) => {
    //     console.log(res)
    //     // this.approxs()
    //     console.log(`Done updating approximation with id ${id}`)
    //   },
    //   (err) => { console.log(err) }
    // )
  }

  updateApproximation(id_approx: number) {
    if (this.formData.invalid) {
      console.log('Form is invalid')
      return
    }
    let approxFormData = this.formData.value
    console.log(`data:`, approxFormData)
    let approx: CreateApprox = {
      title: approxFormData.title,
      f: approxFormData.f,
      ind_var: approxFormData.ind_var,
      ind_value: approxFormData.ind_value,
      dep_var: approxFormData.dep_var,
      dep_value: approxFormData.dep_value,
      eval_value: approxFormData.eval_value,
      h: 0,
      N: approxFormData.N,
    }
    console.log(`Updating approximation for: ${approx}`)
    if (id_approx) {
      this.approxService.updateApprox(id_approx, approx).subscribe(
        (response) => {
          // La actualización fue exitosa, la lista se recargará automáticamente
          this.approxService.loadApproximations();
        },
        (error) => {
          console.error('Error al actualizar la aproximación', error);
        }
      );
    }
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto'
  }
}