// import { Component, OnInit } from '@angular/core';
// import { UserService } from '../Service/user.service';
// import { Chart } from 'chart.js';


// @Component({
//   selector: 'app-view-metrics',
//   standalone: true,
//   imports: [],
//   templateUrl: './view-metrics.component.html',
//   styleUrl: './view-metrics.component.css'
// })
// export class ViewMetricsComponent implements OnInit {
//   chart: Chart;

//   constructor(private userService: UserService) {}

//   ngOnInit() {
//     this.userService.getAllParticipants().subscribe(data => {
//       this.participants = data.map(participant => ({
//         id: participant._id,
//         Salutation: participant.Salutation,
//         'First Name': participant['First Name'],
//         'Last Name': participant['Last Name'],
//         Age: participant.Age,
//         'E-Mail': participant['E-Mail'],
//         Country: participant.Country,
//         Category: participant.Category,
//         Status: participant.Status,
//         'Mobile Number': participant['Mobile Number'],
//         'T-Shirt Size': participant['T-Shirt Size'],
//         CheckIn: participant.CheckIn
//       }));
  
//       // Update the totalParticipants variable
//       this.totalParticipants = this.participants.length;
  
//       // Calculate the number of participants with CheckIn = 1
//       this.checkedInParticipants = this.participants.filter(participant => participant.CheckIn === 1).length;
  
//       // Create the chart
//       this.chart = new Chart('canvas', {
//         type: 'bar',
//         data: {
//           labels: ['Total Participants', 'Checked In Participants'],
//           datasets: [{
//             data: [this.totalParticipants, this.checkedInParticipants],
//             backgroundColor: ['#3cba9f', '#ffcc00'],
//           }]
//         },
//         options: {
//           legend: {
//             display: false
//           },
//           scales: {
//             yAxes: [{
//               ticks: {
//                 beginAtZero: true
//               }
//             }]
//           }
//         }
//       });
//     });
//   }
// }
