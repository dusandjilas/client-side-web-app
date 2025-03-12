import { Component } from '@angular/core';
import { MainService } from '../../services/main.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  Flights: any[] | null = null

  constructor(){
    MainService.getService()
    .then(rsp => this.Flights = rsp.data)
  }

  
}
