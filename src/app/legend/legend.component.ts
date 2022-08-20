import { MapTypeService } from './../services/map-type.service'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit {
  form: FormGroup

  changeType(e) {
    this.mapTypeService.setMapType(e.value)
  }

  constructor(
    private formBuilder: FormBuilder,
    private mapTypeService: MapTypeService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      radio: ['size']
    })
  }

}
