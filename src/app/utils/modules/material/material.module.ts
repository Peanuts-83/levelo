import { NgModule } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
// import { MatInputModule } from '@angular/material/input'
import { MatRadioModule } from '@angular/material/radio'

const MATERIALS = [
  MatIconModule,
  MatFormFieldModule,
  // MatInputModule,
  MatRadioModule,
]

@NgModule({
  imports: MATERIALS,
  exports: MATERIALS,
})
export class MaterialModule { }
