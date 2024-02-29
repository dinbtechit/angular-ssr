import {
  Component,
  Inject,
  inject, InjectionToken,
  Injector,
  makeStateKey,
  OnInit,
  Optional,
  PLATFORM_ID,
  TransferState
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpRequest } from "@angular/common/http";
import { APP_BASE_HREF, isPlatformServer } from "@angular/common";

export const IpAddressToken = new InjectionToken<string>("IP Address");
const IpaddressStateKey = makeStateKey<string>("IP Address")

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'angular-ssr';
  httpClient = inject(HttpClient)
  ssr = ''

  constructor(
    private injector: Injector,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformid: object,
    ) {
    console.log(this.platformid)
  }

  ngOnInit(): void {
    /* this.httpClient.get<string>('http://localhost:4000/api/hello', { responseType: 'text' as any}).subscribe(data => {
       console.log(data);
       this.ssr = data;
     });*/
    if (isPlatformServer(this.platformid)) {
      const ip = this.injector.get(IpAddressToken, 'Not Found')
      console.log(ip)
      this.transferState.set<string>(IpaddressStateKey, ip)
    } else {
      console.log(this.transferState.get<string>(IpaddressStateKey, 'Notfound'))
    }
  }

}
