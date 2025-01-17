import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddQuestComponent } from './components/add-quest/add-quest.component';
import { ProvaComponent } from './components/prova/prova.component';
import { BancoQuestaoComponent } from './components/banco-questao/banco-questao.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { userGuard } from './guards/user.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'app-login', pathMatch: 'full' },
  { path: 'app-home', component: HomeComponent },
  { path: 'add-quest', component: AddQuestComponent , canActivate:[userGuard]},
  { path: 'app-prova', component: ProvaComponent },
  { path: 'app-banco-questao', component: BancoQuestaoComponent, canActivate:[userGuard] },
  { path: 'app-login', component: LoginComponent },
  { path: 'app-cadastro', component: CadastroComponent },
];