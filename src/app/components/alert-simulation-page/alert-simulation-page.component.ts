import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-alert-simulation-page',
  templateUrl: './alert-simulation-page.component.html',
  styleUrls: ['./alert-simulation-page.component.scss']
})
export class AlertSimulationPageComponent implements OnInit {
  public testName: string;
  public lowerLimit: number;

  public failures: number;

  constructor() { }

  ngOnInit(): void {
    $(function() {
      $('#alert').on('change', function() {
        $(".data").hide();
        $("#" + $(this).val()).fadeIn(300);
      })
    });
  }
}