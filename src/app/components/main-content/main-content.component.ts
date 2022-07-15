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

  public prefixChanged: boolean = false;
  public replaceChanged: boolean = false;
  public prefixValue: string;
  public findValue: string;
  public replaceValue: string;

  public inputPath: string;
  public outputPath: string;

  @ViewChild("outputFolderName") outputFolderName: ElementRef;
  @ViewChild("boardIDValue") boardIDValue: ElementRef;
  @ViewChild("newDuration") newDuration: ElementRef;
  @ViewChild("prefix") prefix: ElementRef;
  @ViewChild("find") find: ElementRef;
  @ViewChild("replace") replace: ElementRef;
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

          this.boardIDValue.nativeElement.innerHTML = this.boardID;
          this.endDateTimeValue.nativeElement.innerHTML = this.endDateTime;

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
    this.electronService.getData('sendDataResponse').subscribe(res => console.log(res));
  }

  ngAfterViewInit() {
    this.inputPath = history.state.input;
    console.log(this.inputPath);
    // TODO: What is this for?
    const data: string[] = [this.inputPath, 'test2'];

    // Sending Data To Electron
    this.electronService.sendData(data, 'getData');
  }

  sendData() {
    if (this.prefixChanged && this.prefix.nativeElement.value) {
      this.prefixValue = this.prefix.nativeElement.value;
    } 
    if (this.replaceChanged && this.replace.nativeElement.value) {
      this.findValue= this.find.nativeElement.value;
      this.replaceValue = this.replace.nativeElement.value;
    } 
    if (this.durationChanged && this.newDuration.nativeElement.value) {
      this.duration = this.newDuration.nativeElement.value;
    } 
    
    const data = [
      this.uutType,        // 1
      this.uutTypeRev,     // 2
      this.fixtureID,      // 3
      this.controller,     // 4
      this.prefixValue,    // 5
      this.findValue,      // 6
      this.replaceValue,   // 7
      this.startDateTime,  // 8
      this.startDateTimeChanged, // 9
      this.duration,        // 10
      this.durationChanged, // 11
      this.endDateTime,     // 12
      this.inputPath,       // 13
      this.outputPath       // 14
    ];
    this.electronService.sendData(data, 'sendData');
  }

  outputFolderPicked(files) {
    this.outputPath = files[0].path.split("/").slice(0, -1).join("/");
    this.outputFolderName.nativeElement.innerHTML = this.outputPath;
  }

  // !prefix Checkbox
  prefixFunc() {
    this.prefixChanged = !this.prefixChanged;
    if (this.prefixChanged)
      this.prefix.nativeElement.removeAttribute('disabled');
    else this.prefix.nativeElement.setAttribute('disabled', true);
  }

  // !replace Checkbox
  replaceFunc() {
    this.replaceChanged = !this.replaceChanged;
    if (this.replaceChanged) {
      this.find.nativeElement.removeAttribute('disabled');
      this.replace.nativeElement.removeAttribute('disabled');
    } else { 
      this.find.nativeElement.setAttribute('disabled', true);
      this.replace.nativeElement.setAttribute('disabled', true);
    }
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
}