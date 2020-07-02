import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree , CanActivate, Router} from '@angular/router';
import { HelperService } from './helper.service';


@Injectable({
  providedIn: 'root'
})
export class ActiveGuardService {

  constructor(
    private helper: HelperService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.helper.isToken()) {
      return true;
    } else {
      this.router.navigate(['mainhome']);
      return false;
    }
  }
}
