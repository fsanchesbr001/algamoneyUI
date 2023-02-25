import { NgModule } from '@angular/core';
import { CommonModule,DecimalPipe } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {SharedModule} from "../shared/shared.module";
import {PanelModule} from "primeng/panel";
import {ChartModule} from "primeng/chart";


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    PanelModule,
    ChartModule
  ],
  providers: [DecimalPipe]
})
export class DashboardModule { }
