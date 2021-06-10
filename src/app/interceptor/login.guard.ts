import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (this.auth.UserValid()) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
