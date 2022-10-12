import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PopStore} from "../store/pop.store";
import {PopModel} from "../../models/pop.model";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PopServicesService {

  constructor(private http: HttpClient, private store: PopStore) {
  }


  // Metodo Get Subscribe
  getAllSubscribe() {
    this.http.get<PopModel[]>('http://localhost:3000/Pops').subscribe({
      next: p => this.store.setPops(p),
      error: () => console.log('errore'),
      complete: () => console.log('operazione completata')
    })
  }

 // Metodo Get Promise
  async getAllPromise(): Promise<any> {
    return await lastValueFrom(this.http.get<PopModel[]>('http://localhost:3000/Pops')).then(
      pops => {this.store.setPops(pops)}
    )
  }

  // Metodo Post
  async postPopPromise(pop:PopModel):Promise<any>{
    //Aggiungiamo ma non abbiamo bisogno di aggiornare perchè il form è in un componente a parte e nella home
    // nel onInit vengono aggiornati automaticamente
    return await lastValueFrom(this.http.post('http://localhost:3000/Pops',pop))
  }

  // Metodo Delete
  async deletePopPromise(id:number):Promise<any>{
    let pop : PopModel | undefined = this.store.getPops().find((p : PopModel) => p.id == id )
    if(pop){
      //Eliminiamo e aggiorniamo
      return await lastValueFrom(this.http.delete(`http://localhost:3000/Pops/${id}`)).then(() => this.getAllPromise())
    }
  }

  // Metodo modifica

  async modifyPopPromise(Pop:PopModel):Promise<any>{
    return await lastValueFrom(this.http.put(`http://localhost:3000/Pops/${Pop.id}`,Pop))
  }


}
