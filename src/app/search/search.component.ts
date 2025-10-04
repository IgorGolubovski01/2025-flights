import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FlightModel } from '../models/flight.model';
import { NgFor, NgIf } from '@angular/common';
import { FlightService } from '../../services/flight.service';
import { MatButtonModule } from '@angular/material/button';
import { UtilsService } from '../../services/utils.service';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-search',
  imports: [
    MatTableModule,
    NgIf,
    NgFor,
    MatButtonModule,
    RouterLink,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatSelectModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  displayedColumns: string[] = ['id', 'destination', 'flightNumber', 'scheduledAt', 'actions'];
  allData: FlightModel[] | null = null
  destinationList: string[] = []
  selectedDestination: string | null = null
  dataSource: FlightModel[] | null = null
  flightNumberList: string[] = []
  selectedFlightNumber: string | null = null
  userInput: string = ''
  dateOptions: string[] = []
  selectedDate: string | null = null

  public constructor(public utils: UtilsService) {
    FlightService.getFlightList()
      .then(rsp => {
        this.allData = rsp.data
        this.dataSource = rsp.data
        this.inputSearch(rsp.data)
      })
  }

  public inputSearch(source: FlightModel[]) {
    this.destinationList = [...new Set(source.map(f => f.destination))];
    this.flightNumberList = [...new Set(source.map(f => f.flightNumber))];
    this.dateOptions = [...new Set(source.map(f => f.scheduledAt.split('T')[0]))];
  }

  public doReset() {
    this.userInput = ''
    this.selectedDestination = null
    this.selectedFlightNumber = null
    this.selectedDate = null
    this.dataSource = this.allData
    this.inputSearch(this.allData!)
  }

  public doFilterChain() {
    if (this.allData == null) return;

    this.dataSource = this.allData
      .filter(obj => {
        // Input search (destination OR flight number)
        if (this.userInput.trim() === '') return true;
        const input = this.userInput.toLowerCase();
        return obj.destination.toLowerCase().includes(input) ||
          obj.flightNumber.toLowerCase().includes(input) ||
          obj.id.toString().includes(input);
      })
      .filter(obj => {
        // Date filter
        if (this.selectedDate == null) return true;
        const start = new Date(`${this.selectedDate}T00:00:01`);
        const end = new Date(`${this.selectedDate}T23:59:59`);
        const scheduled = new Date(obj.scheduledAt);
        return start <= scheduled && scheduled <= end;
      });

    this.inputSearch(this.dataSource);
  }

}