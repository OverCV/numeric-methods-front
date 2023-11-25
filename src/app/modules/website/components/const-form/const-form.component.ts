import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ConstantResponse, CreateConstant } from 'src/app/models/constant.model'
import { GenericResponse } from 'src/app/models/generic.response.model'
import { ApproxService } from 'src/app/services/dto/approx.service'
import { ConstService } from 'src/app/services/dto/const.service'

@Component({
  selector: 'app-const-form',
  templateUrl: './const-form.component.html',
  styleUrls: ['./const-form.component.css']
})
export class ConstFormComponent implements OnInit {
  @Input() constData: ConstantResponse | undefined
  @Input() approx_id: number | undefined

  formData = new FormGroup({ name: new FormControl(), value: new FormControl() })


  constructor(
    private approxService: ApproxService,
    private constService: ConstService,
  ) {
    // this.formData = this.initForm(this.constData)
  }

  ngOnInit(): void {
    this.formData = this.initForm(this.constData)
  }


  initForm(initData: ConstantResponse | undefined): FormGroup {
    return new FormGroup({
      name: new FormControl(initData?.name ?? '', Validators.required),
      value: new FormControl(initData?.value ?? '', Validators.required),
    })
  }

  updateConstant(id: number) {
    if (this.formData.invalid) {
      console.log('Form is not valid')
      return
    }
    let constFormData = this.formData.value

    let constant: CreateConstant = {
      name: constFormData.name,
      value: constFormData.value
    }
    console.log(`Updating constant with id ${id} with data: ${JSON.stringify(constant)}`)

    if (this.approx_id && this.approx_id > 0) {
      this.constService.updateConst(id, constant).subscribe(
        (response) => {
          // Si la creación fue exitosa, recargar la lista de constantes
          this.constService.loadConstants()
          // this.constService.readConst(this.approx_id)  //?
          this.getConsts(this.approx_id)
        },
        (error) => {
          console.error('Error al crear la constante', error)
        }
      )
    }
  }

  deleteConstant(id: number) {
    this.constService.deleteConst(id).subscribe(
      (response) => {
        // Si la creación fue exitosa, recargar la lista de constantes
        this.constService.loadConstants()
        // this.constService.readConst(this.approx_id) //?
        this.getConsts(this.approx_id)
      },
      (error) => {
        console.error('Error al eliminar la constante', error)
      }
    )
  }

  getConsts(approx_id: number | undefined) {
    this.approxService.readApproxConsts(approx_id).subscribe(
      (response: GenericResponse<ConstantResponse[]>) => {
        // if (response && response.data) {
        //   this.consts = response.data
        // }
        if (response && response.data) {
          this.constService.updateConstants(response.data)
        }
        console.log(response);
      },
      (error) => {
        // let message: string = `No hay constantes`
        // this.openSnackBar(message, 'Okay!', 1.4)
        console.log(error);
      }
    )
  }
}
