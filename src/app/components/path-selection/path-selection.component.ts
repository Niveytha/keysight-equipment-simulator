import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-path-selection',
  templateUrl: './path-selection.component.html',
  styleUrls: ['./path-selection.component.scss']
})
export class PathSelectionComponent implements OnInit {
  public inputPath: string;

  @ViewChild("inputFolderName") inputFolderName: ElementRef;
  
  constructor(
    // private electronService: ElectronService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  // sendInputPath() {
  //   console.log(this.inputPath);
  //   this.electronService.sendData(this.inputPath, 'sendData');
  // }

  sendToMainComponent(){
    // this.router.navigate(["/main-content"], {state: {input: this.inputPath, output: this.outputPath}});
    // this.router.navigate(["/main-content", {input: this.inputPath, output: this.outputPath}]);
    this.router.navigate(["/main-content"], {state: {input: this.inputPath}});
  }

  inputFolderPicked(files) {
    this.inputPath = files[0].path;
    this.inputFolderName.nativeElement.innerHTML = this.inputPath;
  }
}
