import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PopModel} from "../../models/pop.model";
import {PopStore} from "../../core/store/pop.store";
import {PopServicesService} from "../../core/services/pop-services.service";

@Component({
  selector: 'app-form-pop',
  templateUrl: './form-pop.component.html',
  styleUrls: ['./form-pop.component.scss']
})
export class FormPopComponent implements OnInit {

  form?: FormGroup

  idRoute ?: number
  PopMock ?: PopModel

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private store: PopStore,
              private service: PopServicesService,
              private root: ActivatedRoute) {}


  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.control('', Validators.required),
      strength: this.fb.control('', Validators.required)
    })

    const params = this.route.snapshot.params
    this.idRoute = Number(this.root.snapshot.params['id'])
    if (!isNaN(this.idRoute)) {
      this.PopMock = this.store.getPops().find(p => p.id == this.idRoute)
      if (this.form && this.PopMock) {
        //Modifico visivamente i campi del form perchè sono in modifica

        this.form.patchValue({name:this.PopMock.name,strength:this.PopMock.strength})

      }
    }
  }


  addPop() {
    if (!this.PopMock) {
      // Sono in aggiungi
      if (this.form) {
        let v = this.form.value
        let pop: PopModel = {
          id: this.store.getLastId(),
          name: v['name'],
          strength: v['strength']
        }
        this.service.postPopPromise(pop).then()
      }
    } else {
      // Riconosco che sono in modifica
      if (this.form) {
        let v = this.form.value
        let pop: PopModel = {
          id : this.PopMock.id,
          name: v['name'],
          strength: v['strength']
        }
        console.log(pop)
        this.service.modifyPopPromise(pop).then()
      }
    }
  }
}
