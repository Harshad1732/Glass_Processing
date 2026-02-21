import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Dashboard } from './dashboard/dashboard';
import { WorkCenter } from './work-center/work-center';
import { ProcessOrder } from './process-order/process-order';
import { RtdList } from './rtd-list/rtd-list';
import { DeliveredReport } from './delivered-report/delivered-report';
import { CreateOrder } from './create-order/create-order';
import { HoldList } from './hold-list/hold-list';
import { ReplaceRelease } from './replace-release/replace-release';
import { Settings } from './settings/settings';
import { TopFive } from './top-five/top-five';
import { BatchList } from './batch-list/batch-list';
import { WtrReport } from './wtr-report/wtr-report';
import { SalesReport } from './sales-report/sales-report';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard', component: Dashboard },
  { path: 'create-order', component: CreateOrder },
  { path: 'process-order', component: ProcessOrder },
  { path: 'rtd-list', component: RtdList },
  { path: 'hold-list', component: HoldList },
  { path: 'replace-release', component: ReplaceRelease },
  { path: 'settings', component: Settings },
  { path: 'reports/top-five', component: TopFive },
  { path: 'reports/wtr', component: WtrReport },
  { path: 'reports/batch-list', component: BatchList },
  { path: 'reports/sales-report', component: SalesReport },
  { path: 'delivered-report', component: DeliveredReport },
  { path: 'work-center/:id', component: WorkCenter },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
