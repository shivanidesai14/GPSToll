import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  {
    path: 'my-vehicles',
    loadChildren: './my-vehicles/my-vehicles.module#MyVehiclesPageModule'
  },
  {
    path: 'past-payments',
    loadChildren: './past-payments/past-payments.module#PastPaymentsPageModule'
  },
  {
    path: 'payment-options',
    loadChildren:
      './pages/view-payment-method/view-payment-method.module#ViewPaymentMethodPageModule'
  },
  {
    path: 'my-profile',
    loadChildren: './my-profile/my-profile.module#MyProfilePageModule'
  },
  {
    path: 'select-toll-plaza',
    loadChildren:
      './pages/select-toll-plaza/select-toll-plaza.module#SelectTollPlazaPageModule'
  },
  {
    path: 'payment-method',
    loadChildren:
      './pages/payment-method/payment-method.module#PaymentMethodPageModule'
  },
  {
    path: 'payment-details',
    loadChildren:
      './pages/payment-details/payment-details.module#PaymentDetailsPageModule'
  },
  {
    path: 'payment-details-add',
    loadChildren:
      './pages/payment-details-add/payment-details-add.module#PaymentDetailsAddPageModule'
  },
  {
    path: 'transection-status',
    loadChildren:
      './pages/transection-status/transection-status.module#TransectionStatusPageModule'
  },
  {
    path: 'view-payment-method',
    loadChildren:
      './pages/view-payment-method/view-payment-method.module#ViewPaymentMethodPageModule'
  },
  {
    path: 'edit-payment-details',
    loadChildren:
      './pages/edit-payment-details/edit-payment-details.module#EditPaymentDetailsPageModule'
  },
  {
    path: 'edit-profile',
    loadChildren: './edit-profile/edit-profile.module#EditProfilePageModule'
  },
  {
    path: 'confirm-payment',
    loadChildren:
      './pages/confirm-payment/confirm-payment.module#ConfirmPaymentPageModule'
  },
  {
    path: 'add-vehicle-details',
    loadChildren:
      './pages/add-vehicle-details/add-vehicle-details.module#AddVehicleDetailsPageModule'
  },
  {
    path: 'verification-user',
    loadChildren:
      './pages/verification-user/verification-user.module#VerificationUserPageModule'
  },
  {
    path: 'forgetpassword',
    loadChildren:
      './pages/forgetpassword/forgetpassword.module#ForgetpasswordPageModule'
  },
  {
    path: 'changepassword',
    loadChildren:
      './changepassword/changepassword.module#ChangepasswordPageModule'
  },

  {
    path: 'transaction-failed',
    loadChildren:
      './pages/transaction-failed/transaction-failed.module#TransactionFailedPageModule'
  },
  {
    path: 'homeselect/:myid',
    loadChildren: './homeselect/homeselect.module#HomeselectPageModule'
  },
  {
    path: 'varify-rout',
    loadChildren: './varify-rout/varify-rout.module#VarifyRoutPageModule'
  },
  {
    path: 'verification-user',
    loadChildren:
      './pages/verification-user/verification-user.module#VerificationUserPageModule'
  },
  {
    path: 'forgetpassword',
    loadChildren:
      './pages/forgetpassword/forgetpassword.module#ForgetpasswordPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
