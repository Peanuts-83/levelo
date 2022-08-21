import { NgModule } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatRadioModule } from '@angular/material/radio'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatButtonModule } from '@angular/material/button'

const MATERIALS = [
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatAutocompleteModule,
  MatButtonModule,
]

@NgModule({
  imports: MATERIALS,
  exports: MATERIALS,
})
export class MaterialModule { }
