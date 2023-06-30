import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecognitionComponent } from './components/recognition/recognition.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'main', component: MainComponent },
  { path: 'recognition', component: RecognitionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
