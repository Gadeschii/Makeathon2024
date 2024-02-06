// Importing necessary modules
import { Component, OnInit } from '@angular/core';
import { UserService } from '../Service/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit } from '@angular/core';
import { Chart, DoughnutController, ArcElement, CategoryScale, Legend, Tooltip } from 'chart.js';
import { Label } from 'ag-charts-community/dist/types/src/integrated-charts-scene';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Registering necessary controllers for Chart.js
Chart.register(DoughnutController, ArcElement, CategoryScale, Legend, Tooltip);

// Component Decorator
@Component({
  selector: 'app-view-metrics', // Component selector
  templateUrl: './view-metrics.component.html', // Component HTML template
  styleUrls: ['./view-metrics.component.css'] // Component CSS styles
})
// Component class
export class ViewMetricsComponent implements AfterViewInit {
  public options: any = {}; // Options for the chart
  public participantCountriesCount: { [key: string]: number } = {}; // Participant count by country

  // Component constructor
  constructor(
    private userService: UserService, // User service
    private router: Router, // Router for navigation
    private http: HttpClient) { // HTTP client for requests

  }

  // Method that runs after the component view has been initialized
  ngAfterViewInit() {
    this.updateChart(); // Update the chart
    this.getParticipantCountByCountry(); // Get the participant count by country
    this.getParticipantStatusCount(); // Get the participant count by status
  }

  // Method to update the chart
  updateChart() {
    // Get all participants
    this.userService.getAllParticipants().subscribe(data => {
      const totalParticipants = data.length; // Total participants
      const checkedInCount = data.filter(participant => participant.CheckIn === 1).length; // Count of checked-in participants

      // Get the canvas element and its 2D rendering context
      let canvas = document.getElementById('checkin') as HTMLCanvasElement;
      let ctx = canvas.getContext('2d');
      if (ctx !== null) {
        // Create the doughnut chart
        var myChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Register', 'Register and Check In'], // Labels for the data
            datasets: [{
              data: [totalParticipants, checkedInCount], // Data for the chart
              backgroundColor: ['#36a2eb', '#ff6384'] // Background colors for the data
            }]
          },
          options: {
            responsive: true, // The chart is responsive
            maintainAspectRatio: false // Does not maintain aspect ratio
          }
        });

      } else {
        console.log('ctx is null'); // Error message if the 2D rendering context is not available

      }

    });
  }

  // Method to get the count of participants by country
  getParticipantCountByCountry() {
    // Get all participants
    this.userService.getAllParticipants().subscribe(data => {
      // Iterate through the participants
      data.forEach(participant => {
        // If the country is not in the participantCountriesCount object, add it
        if (!this.participantCountriesCount[participant.Country]) {
          this.participantCountriesCount[participant.Country] = 1;
        } else {
          // If the country is in the participantCountriesCount object, increment the count
          this.participantCountriesCount[participant.Country] += 1;
        }
      });
      // Get the canvas element and its 2D rendering context
      let canvas = document.getElementById('country') as HTMLCanvasElement;
      let ctx = canvas.getContext('2d');
      if (ctx !== null) {
        // Create the doughnut chart
        var myChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: Object.keys(this.participantCountriesCount), // Labels for the data
            datasets: [{
              data: Object.values(this.participantCountriesCount), // Data for the chart
              backgroundColor: ['#ff6680', '#ff7791', '#ff8fbd', '#ff8282',
                '#ff9d6b', '#ffae5d', '#ffbf4f', '#b1ffb1', '#7effc5', '#6bb0cc',
                '#6eb5cf', '#7cc4e9', '#81e981', '#b0d9ff', '#9797c3', '#c6c6ff',
                '#ffa566', '#ffaf75', '#dcdcdc'
              ] // Background colors for the data
            }]
          },
          options: {
            responsive: true, // The chart is responsive
            maintainAspectRatio: false // Does not maintain aspect ratio
          }
        });
      } else {
        console.log('ctx is null'); // Error message if the 2D rendering context is not available
      }
    });
  }
  // Method to get the count of participants by status
  getParticipantStatusCount() {
    // Get all participants
    this.userService.getAllParticipants().subscribe(data => {
      // Object to store the count of participants by status
      let participantStatusCount: { [key: string]: number } = {};
      // Iterate through the participants
      data.forEach(participant => {
        // If the status is not in the participantStatusCount object, add it
        if (!participantStatusCount[participant.Status]) {
          participantStatusCount[participant.Status] = 1;
        } else {
          // If the status is in the participantStatusCount object, increment the count
          participantStatusCount[participant.Status] += 1;
        }
      });
      // Get the canvas element and its 2D rendering context
      let canvas = document.getElementById('status') as HTMLCanvasElement;
      let ctx = canvas.getContext('2d');
      if (ctx !== null) {
        // Create the doughnut chart
        var myChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: Object.keys(participantStatusCount), // Labels for the data
            datasets: [{
              data: Object.values(participantStatusCount), // Data for the chart
              backgroundColor: ['#34495e', '#2c3e50', '#7f8c8d', '#2ecc71',
                '#3498db', '#16a085', '#e74c3c', '#d35400', '#f39c12', '#c0392b'

              ] // Background colors for the data
            }]
          },
          options: {
            responsive: true, // The chart is responsive
            maintainAspectRatio: false // Does not maintain aspect ratio
          }
        });
      } else {
        console.log('ctx is null'); // Error message if the 2D rendering context is not available
      }
    });
  }

  // Method to navigate to the /dashboard route
  goBack() {
    this.router.navigateByUrl('/auth/dashboard');
    // this.router.navigate(['/auth/dashboard']); // Redirige a '/auth/dashboard'
  }

  exportPdf() {
    let pdf = new jsPDF('p', 'mm', 'a4'); 
    let ids = ['checkin', 'country', 'status']; 


    let img = new Image();
    img.src = 'assets/images/SGItransparent.png';
    img.onload = function () {
     
      let canvas = document.createElement('canvas');
      let scale = 3;
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      let ctx = canvas.getContext('2d');
      if (ctx) { 
        ctx.drawImage(img, 0, 0, img.width, img.height);
        let logo = canvas.toDataURL('image/png');
        pdf.addImage(logo, 'PNG', 120, 40, 180, 180);
      }

      pdf.setFontSize(22);
      pdf.text('Makeathon 2024 Statistics: ', 105, 30, { align: 'center' });

      let promises = ids.map((id, index) => {
        let data = document.getElementById(id);
        if (data) { // Comprueba si data es null
          return html2canvas(data, { scale: 2 }) // Aumenta la escala para una mayor resolución
            .then(canvas => {
              let imgWidth = 100;
              let imgHeight = canvas.height * imgWidth / canvas.width;
              let position = index * imgHeight + 50; // ajusta la posición para cada gráfica, añade 50 para dejar espacio para el logo y el título

              const contentDataURL = canvas.toDataURL('image/png')
              pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
            });
        } else {
          return Promise.resolve(); // Devuelve una promesa resuelta cuando data es null
        }
      });

      Promise.all(promises).then(() => pdf.save('MetricMakeathon2024.pdf'));
    };
  }

}