import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  { path: 'splash', loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)},
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)},
  { path: 'register', loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)},
  { path: 'forgotpass', loadChildren: () => import('./forgotpass/forgotpass.module').then( m => m.ForgotpassPageModule)},
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
  {
    path: 'order-food',
    loadChildren: () => import('./order-food/order-food.module').then( m => m.OrderFoodPageModule)
  },
  {
    path: 'add-reservation',
    loadChildren: () => import('./add-reservation/add-reservation.module').then( m => m.AddReservationPageModule)
  },
  {
    path: 'vouchers-modal',
    loadChildren: () => import('./vouchers-modal/vouchers-modal.module').then( m => m.VouchersModalPageModule)
  },
  {
    path: 'create-voucher-modal',
    loadChildren: () => import('./create-voucher-modal/create-voucher-modal.module').then( m => m.CreateVoucherModalPageModule)
  },
];

@NgModule (
  {imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
