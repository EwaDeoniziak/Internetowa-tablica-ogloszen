import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page/main-page.component';
import { NoticeBoardComponent } from './shared-components/notice-board/notice-board.component';
import { AuthComponent } from './main-page/auth/auth.component';
import { UserPanelComponent } from './user-panel/user-panel/user-panel.component';
import { AddNoticeComponent } from './user-panel/add-notice/add-notice.component';
import { MyNoticesComponent } from './user-panel/my-notices/my-notices.component';
import { ShowNoticeComponent } from './shared-components/show-notice/show-notice.component';
import { AuthGuard } from './guards/auth.guard';
import { MyAccountComponent } from './user-panel/my-account/my-account.component';
import { EditNoticeComponent } from './user-panel/edit-notice/edit-notice.component';

const routes: Routes = [
  {path: '', redirectTo: 'main-page', pathMatch: 'full'},
  {path: 'main-page', component: MainPageComponent, children: [
    {path: '', redirectTo: 'notice-board/page/1', pathMatch: 'full'},
    {path: 'notice-board', redirectTo: 'notice-board/page/1', pathMatch: 'full'},
    {path: 'notice-board/page', redirectTo: 'notice-board/page/1', pathMatch: 'full'},
    {path: 'notice-board/page/:page', component: NoticeBoardComponent},
    {path: 'notice-board/:id', component: ShowNoticeComponent},
    {path: 'auth', component: AuthComponent}
  ]},
  {path: 'user-panel', component: UserPanelComponent, canActivate: [AuthGuard], children: [
    {path: '', redirectTo: 'notice-board/page/1', pathMatch: 'full'},
    {path: 'notice-board', redirectTo: 'notice-board/page/1', pathMatch: 'full'},
    {path: 'notice-board/page', redirectTo: 'notice-board/page/1', pathMatch: 'full'},
    {path: 'notice-board/page/:page', component: NoticeBoardComponent},
    {path: 'notice-board/:id', component: ShowNoticeComponent},
    {path: 'add-notice', component: AddNoticeComponent},
    {path: 'my-notices', component: MyNoticesComponent},
    {path: 'my-account', component: MyAccountComponent},
    {path: 'my-notices/edit/:id', component: EditNoticeComponent}
  ]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
