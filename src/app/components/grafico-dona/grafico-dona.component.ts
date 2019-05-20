import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input() public doughnutChartLabels: string[] = [];
  @Input() public doughnutChartData: number[] = [];
  @Input() public doughnutChartType: string = '';


  constructor() { }

  ngOnInit() {
  }

}
