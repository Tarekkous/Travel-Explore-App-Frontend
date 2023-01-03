import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfilComponent } from './components/profil/profil.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ListsComponent } from './components/lists/lists.component';
import { SideBarRightComponent } from './components/side-bar-right/side-bar-right.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { OverviewComponent } from './components/overview/overview.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { ListModalComponent } from './modals/list-modal/list-modal.component';
import { DescriptionComponent } from './modals/description-modal/description/description.component';
import {MatDialogModule} from '@angular/material/dialog';
import { UpdateDescriptionComponent } from './modals/update-description/update-description.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProfilComponent,
    ListsComponent,
    SideBarRightComponent,
    TopBarComponent,
    OverviewComponent,
    HomeComponent,
    ContactComponent,
    ListModalComponent,
    DescriptionComponent,
    UpdateDescriptionComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,ReactiveFormsModule,
    BrowserAnimationsModule,FormsModule,MatFormFieldModule,MatAutocompleteModule,
    MatIconModule,MatInputModule,MatButtonModule,MatListModule,MatCardModule,MatSnackBarModule,
    MatDialogModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
