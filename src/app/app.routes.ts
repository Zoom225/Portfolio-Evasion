import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { About } from './features/about/about';
import { Contact } from './features/contact/contact';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: About },
  { path: 'apropos', component: About },
  { path: 'contact', component: Contact },
  { path: '**', redirectTo: '' }

];
