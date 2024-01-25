// Import styles
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../Service/user.service';

const apiUrl = 'http://localhost:3000';


@Component({
  selector: 'app-body-user-list',
  templateUrl: './body-user-list.component.html',
  styleUrls: ['./body-user-list.component.css']
})

// Define the component
export class BodyUserListComponent implements OnInit{
  // Declare variables for user data
  name: string = "";
  userId: string = "";
  userName: string = "";
  userPassword: string = "";
  userIdToUpdate: string = "";
  userNameToUpdate: string = "";
  userPasswordToUpdate: string = "";
  userIdToDelete: string = "";

  // Declare variables for search functionality
  searchTerm: string = '';
  filteredUsers: any[] = [];
  users: any[] = []; // Array to store the users
  participants: any[] = []; // Array to store the users

  // Inject HttpClient into the component through the constructor
  constructor(private http: HttpClient,  private userService: UserService) { }

  // ngOnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
  ngOnInit() {
    this.getAllParticipants(); // Call the method when the component is initialized
  }

 // Method to get all participants
getAllParticipants() { 
  this.userService.getAllParticipants().subscribe(data => {
    this.participants = data.map(participant => ({
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
    }));
    console.log(this.participants);
    
  });
}

  // Method to search users
  searchUsers() {
    // Convert the search term to lower case
    const searchTerm = this.searchTerm.toLowerCase();
    // Filter the users array to include only users whose name, email or mobile number includes the search term
    this.filteredUsers = this.users.filter(user =>
      user['First Name'].toLowerCase().includes(searchTerm) ||
      user['E-Mail'].toLowerCase().includes(searchTerm) ||
      user['Mobile Number'].toLowerCase().includes(searchTerm)
    );

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
