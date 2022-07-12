import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  public startDateTime: string;
  public duration: string;
  public endDateTime: string;

  public startDateTimeChanged: boolean = false;
  public durationChanged: boolean = false;

  public inputPath: string;
  public outputPath: string;

  @ViewChild("outputFolderName") outputFolderName: ElementRef;
  @ViewChild("startDateTimeCB") startDateTimeCB: ElementRef;
  @ViewChild("durationCB") durationCB: ElementRef;
  @ViewChild("newDuration") newDuration: ElementRef;
  @ViewChild("endDateTimeValue") endDateTimeValue: ElementRef;

  constructor(
    private electronService: ElectronService,
    private ref:ChangeDetectorRef,
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
          this.startDateTime = parseData.startDateTime;
          this.duration = parseData.duration;
          this.endDateTime = parseData.endDateTime;

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
    this.inputPath = history.state.input;
    this.electronService.sendData([this.inputPath], 'sendInputPath');
  }

  sendData() {
    if (this.durationChanged && this.newDuration.nativeElement.value) {
      this.duration = this.newDuration.nativeElement.value;
    } 
    const data = [
      this.uutType,        // 1
      this.uutTypeRev,     // 2
      this.fixtureID,      // 3
      this.controller,     // 4
      this.boardID,        // 5
      this.startDateTime,        // 6
      this.startDateTimeChanged, // 7
      this.duration,        // 8
      this.durationChanged, // 9
      this.endDateTime,     // 10
      this.inputPath,       // 11
      this.outputPath       // 12
    ];
    this.electronService.sendData(data, 'sendData');
  }

  // onSubmit(result) {
  //   console.log("Form submitted!");
  //   alert('FORM SUBMITTED!');
  // }

  outputFolderPicked(files) {
    this.outputPath = files[0].path.split("/").slice(0, -1).join("/");
    // this.outputPath = files[0].path;
    this.outputFolderName.nativeElement.innerHTML = this.outputPath;
  }

  // !startDateTime Checkbox
  startDateTimeFunc() {
    this.startDateTimeChanged = !this.startDateTimeChanged;
  }

  // !duration Checkbox & newDuration value
  durationFunc() {
    this.durationChanged = !this.durationChanged;
    if (this.durationChanged)
      this.newDuration.nativeElement.removeAttribute('disabled');
    else this.newDuration.nativeElement.setAttribute('disabled', true);
  }

  // TODO: Examples (to be deleted)
  // chooseFile() {
  //   dialog.showOpenDialog({
  //     defaultPath: app.getPath("documents"),
  //     properties: ['openDirectory'],
  //     buttonLabel: 'Select a folder'
  //   })
  //   .then((result) => {
  //     console.log("result", result)
  //   });
  // }

  // @ViewChild("myNameElem1") myNameElem1: ElementRef;
  // getValue1() {
  //   console.log(this.myNameElem1);
  //   this.myNameElem1.nativeElement.innerHTML = "After change";
  // }

  // @ViewChild('myNameElem2') myNameElem2: ElementRef;
  // getValue2() {
  //   console.log(this.myNameElem2.nativeElement.value);
  // }
  // resetValue() {
  //   this.myNameElem2.nativeElement.value = '';
  // }
}