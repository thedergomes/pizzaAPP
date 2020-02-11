import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  { path: 'splash', loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)},
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)},
  { path: 'register', loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)},
  { path: 'forgotpass', loadChildren: () => import('./forgotpass/forgotpass.module').then( m => m.ForgotpassPageModule)},
  { path: 'forgotpass2', loadChildren: () => import('./forgotpass/forgotpass2/forgotpass2.module').then( m => m.Forgotpass2PageModule)},
  { path: 'register',loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)},
  { path: 'menu',loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)},
  { path: 'products',loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule)},
  { path: 'ticket', loadChildren: () => import('./ticket/ticket.module').then( m => m.TicketPageModule)},
  { path: 'orders', loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule)},
  { path: 'promotion', loadChildren: () => import('./promotion/promotion.module').then( m => m.PromotionPageModule)},
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'details-modal',
    loadChildren: () => import('./details-modal/details-modal.module').then( m => m.DetailsModalPageModule)
  },
  {
    path: 'reservations',
    loadChildren: () => import('./reservations/reservations.module').then( m => m.ReservationsPageModule)
  },
];

@NgModule (
  {imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
