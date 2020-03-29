import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './main-page/auth/auth.component';
import { NoticeBoardComponent } from './shared-components/notice-board/notice-board.component';
import { MainPageComponent } from './main-page/main-page/main-page.component';
import { AddNoticeComponent } from './user-panel/add-notice/add-notice.component';
import { MyNoticesComponent } from './user-panel/my-notices/my-notices.component';
import { UserPanelComponent } from './user-panel/user-panel/user-panel.component';
import { ShowNoticeComponent } from './shared-components/show-notice/show-notice.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SearchPipe } from './shared/pipes/search.pipe';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { FilterByPricePipe } from './shared/pipes/filter-by-price.pipe';
import {MatMenuModule} from '@angular/material/menu';
import { MyAccountComponent } from './user-panel/my-account/my-account.component';
import { NoticeCardComponent } from './shared-components/notice-card/notice-card.component';
import {MatListModule} from '@angular/material/list';
import { SearchByLocationPipe } from './shared/pipes/search-by-location.pipe';
import { FilterByTypePipe } from './shared/pipes/filter-by-type.pipe';
import { EditNoticeComponent } from './user-panel/edit-notice/edit-notice.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteConfirmComponent } from './user-panel/delete-confirm/delete-confirm.component';
import { ActualiseConfirmComponent } from './user-panel/actualise-confirm/actualise-confirm.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NoticeBoardComponent,
    MainPageComponent,
    AddNoticeComponent,
    MyNoticesComponent,
    UserPanelComponent,
    ShowNoticeComponent,
    SearchPipe,
    FilterPipe,
    FilterByPricePipe,
    MyAccountComponent,
    NoticeCardComponent,
    SearchByLocationPipe,
    FilterByTypePipe,
    EditNoticeComponent,
    DeleteConfirmComponent,
    ActualiseConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    //FlexLayoutModule,
    //material
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatDividerModule,
    MatPaginatorModule,
    MatMenuModule,
    MatListModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  providers: [FilterPipe, FilterByPricePipe, SearchPipe, SearchByLocationPipe, FilterByTypePipe],
  entryComponents: [DeleteConfirmComponent, ActualiseConfirmComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
