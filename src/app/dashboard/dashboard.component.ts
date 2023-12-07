import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private data: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe((data) => {
      this.data = data;
      this.init();
    });
  }

  init(): void {
    if (typeof google !== 'undefined') {
      google.charts.load('current', { packages: ['corechart'] });
      setTimeout(() => {
        google.charts.setOnLoadCallback(this.showCharts());
      }, 1000);
    }
  }

  showCharts(): void {}

  getDataTable(): void {
    const dataTable = new google.visualization.DataTable();

    dataTable.addColumn('string', 'Month');
    dataTable.addColumn('number', 'Quantity');
    dataTable.addRows(this.data);

    return dataTable;
  }
}
