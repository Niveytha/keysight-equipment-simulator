import { Component } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private electronService: ElectronService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');

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
        console.log(res, 'Electron Data');
      });
    } else {
      console.log('Run in browser');
    }
  }
}
