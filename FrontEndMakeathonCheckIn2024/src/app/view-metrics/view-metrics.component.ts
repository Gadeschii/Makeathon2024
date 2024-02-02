import { Component, OnInit } from '@angular/core';
import { UserService } from '../Service/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit } from '@angular/core';

import {
  AgBarSeriesOptions,
  AgChartOptions,
  AgCharts,
} from "ag-charts-community";

@Component({
  selector: 'app-view-metrics',
  templateUrl: './view-metrics.component.html',
  styleUrls: ['./view-metrics.component.css']
})
export class ViewMetricsComponent implements AfterViewInit {
  public options: any = {};
  public participantCountriesCount: { [key: string]: number } = {};
  constructor(
    private userService: UserService,
    private router: Router,
    private http: HttpClient) {

  }

  ngAfterViewInit() {
    this.updateChart();
    this.getParticipantCountriesCount();
  }

  updateChart() {
    this.userService.getAllParticipants().subscribe(data => {
      const totalParticipants = data.length;
      const checkedInCount = data.filter(participant => participant.CheckIn === 1).length;
      this.options = {
        data: [
          { category: 'Total Participants', value: totalParticipants },
          { category: 'Checked In Participants', value: checkedInCount },
        ],
        series: [
          {
            type: 'pie',
            angleKey: 'value',
            labelKey: 'category',
            label: { // Agrega esta sección
              minAngle: 0,
              innerRadius: '40%',
              outerRadius: '80%',
              color: '#333',
            },
          },
        ],
        legend: [
          {
            position: 'bottom',
            marker: {
              shape: 'square',
            },
          },
        ],
      };
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

      const chartData = Object.entries(this.participantCountriesCount).map(([country, count]) => ({ country, count }));

      this.options = {
        data: chartData,
        series: [
          {
            type: 'column',
            xKey: 'country',
            yKey: 'count',
          },
        ],
        legend: {
          enabled: false,
        },
      };
    });
  }



}


