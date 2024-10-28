import {
  ActivatedRouteSnapshot,
  CanActivate, CanActivateFn,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot
} from '@angular/router';
import {UserService} from '../services/user.service';
import {Inject} from '@angular/core';
import {Router} from '@angular/router';


export const authGuard: CanActivateFn = () => {
  const userAuth = Inject(UserService);
  let router = Inject(Router);
  if (userAuth && userAuth.isAuthenticated()){
    return true
  }else{
    router.navigate(['/login']);
    return false
  }
}
