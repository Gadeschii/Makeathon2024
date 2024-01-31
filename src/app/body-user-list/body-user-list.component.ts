
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../Service/user.service';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface Participant {
  id: string;
  Salutation: string;
  'First Name': string;
  'Last Name': string;
  Age: number;
  'E-Mail': string;
  Country: string;
  Category: string;
  Status: string;
  'Mobile Number': string;
  'T-Shirt Size': string;
  CheckIn: number;
}


@Component({
  selector: 'app-body-user-list',
  templateUrl: './body-user-list.component.html',
  styleUrls: ['./body-user-list.component.css']
})

// Define the component
export class BodyUserListComponent implements OnInit {

  // Declare variables for search functionality
  countCheckIn1!: number;
  totalParticipants!: number;
  userCount: number = 0;
  searchTerm!: string;
  filteredParticipants: Participant[] = []; // Array to store the filtered participants
  users: any[] = []; // Array to store the users
  participants: any[] = []; // Array to store the users
  filteredUsers: any[] = []; // Array to store the filtered users
  searchControl = new FormControl();
  apiUrl = 'http://localhost:3000';
  scrollInterval: number = 0;

  checkedInParticipantsCount: number = 0;
  participantCount: number = 0;
  participantCountriesCount: { [key: string]: number } = {};




  @ViewChild('participantList', { static: false }) participantList!: ElementRef;

  // Inject HttpClient into the component through the constructor
  constructor(private http: HttpClient, private userService: UserService) { }

  // ngOnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
  ngOnInit() {

    this.getAllParticipants(); // Call the method when the component is initialized

    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterParticipants(value))
      )
      .subscribe(value => this.filteredParticipants = value);

  }


  // Method to get all participants
  getAllParticipants() {
    this.userService.getAllParticipants().subscribe(data => {
      this.participants = data.map(participant => ({
        id: participant._id,
        Salutation: participant.Salutation,
        'First Name': participant['First Name'],
        'Last Name': participant['Last Name'],
        Age: participant.Age,
        'E-Mail': participant['E-Mail'],
        Country: participant.Country,
        Category: participant.Category,
        Status: participant.Status,
        'Mobile Number': participant['Mobile Number'],
        'T-Shirt Size': participant['T-Shirt Size'],
        CheckIn: participant.CheckIn

      })).slice(0, this.totalParticipants); //take the totalParticipants value from the input field
      this.filteredParticipants = this.participants;
      this.updateParticipantCounts();

      // Update the totalParticipants variable
      this.totalParticipants = this.participants.length;
    });
  }

  getTotalParticipants() {
    this.userService.getAllParticipants().subscribe(data => {
      this.participantCount = data.length;
    });
  }

  getCheckedInParticipantsCount() {
    this.userService.getAllParticipants().subscribe(data => {
      const checkedInCount = data.filter(participant => participant.CheckIn === 1).length;
      console.log(checkedInCount);
    });
  }

  getParticipantCountriesCount() {
    this.userService.getAllParticipants().subscribe(data => {
      data.forEach(participant => {
        if (participant.country in this.participantCountriesCount) {
          this.participantCountriesCount[participant.country]++;
        } else {
          this.participantCountriesCount[participant.country] = 1;
        }
      });
    });
  }

  private _filterParticipants(value: string): Participant[] {
    const filterValue = value.toLowerCase();

    return this.participants.filter(participant =>
      (participant['First Name'] && participant['First Name'].toLowerCase().includes(filterValue)) ||
      (participant['E-Mail'] && participant['E-Mail'].toLowerCase().includes(filterValue)) ||
      (participant['Mobile Number'] && participant['Mobile Number'].toString().includes(filterValue))
    );
  }

  updateParticipantCheckIn(participant: Participant) {
    // console.log(participant.id);
    participant.CheckIn = participant.CheckIn === 1 ? 0 : 1;
    this.http.put(`${this.apiUrl}/participants/checkin/${participant.id}`, { CheckIn: participant.CheckIn })
      .subscribe({
        next: data => {
          // Log the data returned by the API to the console
          // console.log(data);
        },
        error: error => {
          // Log any error that occurred during the request to the console
          console.error(error);
        }
      });
    this.updateParticipantCounts();
  }

  private updateParticipantCounts() {
    this.countCheckIn1 = this.participants.filter(participant => participant.CheckIn === 1).length;
    this.totalParticipants = this.participants.length;
  }

  // Method to create a new user
  createUser(name: string, password: string) {
    // Make a POST request to the API with the user data and subscribe to the response
    this.http.post('http://localhost:3000/users/create', { name, password }).subscribe(data => {
      // Log the data returned by the API to the console
      console.log(data);
    });
  }

  // Method to update an existing user
  updateUser(id: string, name: string, password: string) {
    // Make a PUT request to the API with the user ID and new data and subscribe to the response
    this.http.put(`http://localhost:3000/users/update${id}`, { name, password }).subscribe(data => {
      // Log the data returned by the API to the console
      console.log(data);
    });
  }

  // Method to delete a user
  deleteUser(id: string) {
    // Make a DELETE request to the API with the user ID and subscribe to the response
    this.http.delete(`http://localhost:3000/users${id}`).subscribe(data => {
      // Log the data returned by the API to the console
      console.log(data);
    });
  }

}

export class BodyUserListModule {

}
