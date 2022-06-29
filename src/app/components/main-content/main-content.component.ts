import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../core/services';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  model: any = {};
  showMsg: boolean = false;

  constructor(
    private electronService: ElectronService,
  ) { 
    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);

      const data: string[] = ['test', 'test2'];

      // Sending Data To Electron
      this.electronService.sendData(data);

      // Receiving Data From Electron
      this.electronService.getData().subscribe((res) => {
        // !JSON.parse
        console.log(res, 'Electron Data');
      });
    } else {
      console.log('Run in browser');
    }
  }

  ngOnInit(): void {
  }

  onSubmit(result) {
    this.showMsg= true;

    console.log("Number of boards: " + result.noOfBoards);
    console.log("Failure Rate: " + result.failureRate / 100);
    console.log("Equipment chosen: " + result.equipments);

    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model));
 }
}
