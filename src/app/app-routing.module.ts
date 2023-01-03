import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { ListsComponent } from './components/lists/lists.component';
import { LoginComponent } from './components/login/login.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ProfilComponent } from './components/profil/profil.component';
import { RegisterComponent } from './components/register/register.component';
import { SideBarRightComponent } from './components/side-bar-right/side-bar-right.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { DescriptionComponent } from './modals/description-modal/description/description.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'overview',component: OverviewComponent,canActivate: [AuthGuardGuard],
    children: [
      { path: 'menu', component: SideBarRightComponent },
      { path: 'topbar', component: TopBarComponent },

      {
        path: 'profil',
        component: ProfilComponent,
        canActivate: [AuthGuardGuard],
      },

      {
        path: 'lists',
        component: ListsComponent,
        canActivate: [AuthGuardGuard],
      },{
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuardGuard],
      },{
        path:'contact',
        component:ContactComponent,
        canActivate:[AuthGuardGuard]
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
