import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '@env/environment';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useFactory: getLanguage },
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getLanguage() {
  return environment.language;
}
