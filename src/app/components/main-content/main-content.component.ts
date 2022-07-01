import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ElectronService } from '../../core/services';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {  
  public uutType: string;
  public uutTypeRev: string;
  public fixtureID: string;
  public controller: string;
  public boardID: string;
  public startTime: string;
  public duration: string;
  public endTime: string;

  model: any = {};

  constructor(
    private electronService: ElectronService,
    private ref:ChangeDetectorRef
  ) { 
    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);

      // TODO: What is this for?
      const data: string[] = ['test', 'test2'];

      // Sending Data To Electron
      this.electronService.sendData(data, 'getData');

      // Receiving Data From Electron
      this.electronService.getData('getDataResponse').subscribe((res) => {
        console.log(res, 'Electron Data');

        // !JSON.parse
        if (res) {
          console.log(JSON.parse(res[0]), 'Parse Data');
          const parseData = JSON.parse(res[0]);
  
          this.uutType = parseData.uutType;
          this.uutTypeRev = parseData.uutTypeRev;
          this.fixtureID = parseData.fixtureID;
          this.controller = parseData.controller;

          this.boardID = parseData.boardID;
          this.startTime = parseData.startTime;
          this.duration = parseData.duration;
          this.endTime = parseData.endTime;

          this.ref.detectChanges();
        }
      });

      this.electronService.getData('sendDataResponse').subscribe((res) => {
        console.log(res, 'sendDataResponse Electron Data');
      });
    } else {
      console.log('Run in browser');
    }
  }

  ngOnInit(): void {
  }

  sendData() {
    const data = [
      this.uutType,
      this.uutTypeRev,
      this.fixtureID,
      this.controller,
      this.boardID,
      this.startTime,
      this.duration,
      this.endTime
    ];
    this.electronService.sendData(data, 'sendData');
  }

  onSubmit(result) {
    console.log("Form submitted!");
    alert('FORM SUBMITTED!');
  }
}