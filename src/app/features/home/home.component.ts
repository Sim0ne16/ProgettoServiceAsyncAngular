import {Component, OnInit} from '@angular/core';
import {PopModel} from "../../models/pop.model";
import {Router} from "@angular/router";
import {PopServicesService} from "../../core/services/pop-services.service";
import {PopStore} from "../../core/store/pop.store";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  Pops ?: PopModel[]

  constructor(private route:Router,private PopService:PopServicesService,private store:PopStore) {
  }

  ngOnInit(): void {
     this.PopService.getAllPromise().then(() => this.Pops = this.store.getPops())
  }

  async deletePop(id:number){
    await this.PopService.deletePopPromise(id).then(() => this.Pops = this.store.getPops())
  }


 async modifyPop(id:number) {
   await this.route.navigateByUrl(`form-add/${id}`).then()
  }




}
