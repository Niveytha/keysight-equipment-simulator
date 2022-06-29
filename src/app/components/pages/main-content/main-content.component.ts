import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../../core/services';
// import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  constructor(
    private electronService: ElectronService,
  ) { 
    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);

      // TODO: What is this for?
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
    // function validateForm() {
    //   let x = document.forms["myForm"]["projectID"].value;
    //   if (x == "") {
    //     alert("Please fill in all the fields!");
    //     return false;
    //   }
    // }
  }

  // myForm = new FormGroup({
  //   projectID: new FormControl('', Validators.required),
  //   projectRev: new FormControl('', Validators.required),
  //   fixtureID: new FormControl('', Validators.required),
  //   equipmentID: new FormControl('', Validators.required),

  //   noOfBoards: new FormControl('', Validators.required),
  //   failureRate: new FormControl('', Validators.required),
  //   alert: new FormControl('', Validators.required)
  // })

  showDiv = {
    simulated: false
  }
}
