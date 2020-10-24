import { Routes } from '@angular/router';
import { CvComponent } from '../cv/cv.component';

export const routes: Routes = [
    {path:'cv', component: CvComponent},
    {path: '', redirectTo: '/cv', pathMatch: 'full'}
]