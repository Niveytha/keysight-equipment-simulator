import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from '../../core/services';

@Component({
  selector: 'app-path-selection',
  templateUrl: './path-selection.component.html',
  styleUrls: ['./path-selection.component.scss']
})
export class PathSelectionComponent implements OnInit {
  public inputPath: string;

  @ViewChild("inputFolderName") inputFolderName: ElementRef;
  
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  sendToMainComponent(){
    this.router.navigate(["/main-content"], {state: {input: this.inputPath}});
  }

  inputFolderPicked(files) {
    this.inputPath = files[0].path.split("/").slice(0, -1).join("/");
    this.inputFolderName.nativeElement.innerHTML = this.inputPath;
  }
}
