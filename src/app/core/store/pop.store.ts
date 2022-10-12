import {Injectable, OnInit} from "@angular/core";
import {PopModel} from "../../models/pop.model";



@Injectable({
  providedIn:'root'
})
export class PopStore {

  private Pops:PopModel[] = []


  getPops(): PopModel[] {
    return this.Pops;
  }

  setPops(value: PopModel[]) {
    this.Pops = value;
  }

  getLastId():number{
    return this.Pops[this.Pops.length-1].id + 1
  }

}
