import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { FluidModule } from 'primeng/fluid';
import { SelectModule } from 'primeng/select';
import { BlockUIModule } from 'primeng/blockui';
import { NgModule } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';



@NgModule({
  imports: [
    //prime ng
    BlockUIModule,
    FluidModule,
    TooltipModule,
    DividerModule,
    ButtonModule,
    SelectModule,
    InputTextModule,
    InputNumberModule,
    ProgressSpinnerModule,
    ToastModule,
    AvatarModule,
    AvatarGroupModule,
    DialogModule,
    ConfirmDialogModule,
    TableModule,
    MessageModule,
    CardModule,
    OrganizationChartModule,
    AccordionModule,
    PanelModule,
    ChartModule,
    PasswordModule,
    AnimateOnScrollModule ,
    ProgressBarModule

  ],
  exports: [
      //prime ng
      BlockUIModule,
      FluidModule,
      TooltipModule,
      DividerModule,
      ButtonModule,
      SelectModule,
      InputTextModule,
      InputNumberModule,
      ProgressSpinnerModule,
      ToastModule,
      AvatarModule,
      AvatarGroupModule,
      ConfirmDialogModule,
      DialogModule,
      TableModule,
      MessageModule,
      CardModule,
      OrganizationChartModule,
      AccordionModule,
      PanelModule,
      ChartModule,
      PasswordModule,
      ProgressBarModule,
      AnimateOnScrollModule
  ],
  providers: [  ]
})
export default class ImportsModule {}
