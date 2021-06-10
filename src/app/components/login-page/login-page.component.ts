import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginForm } from 'src/app/models/FormModels/LoginForm';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { PersonDto } from 'src/app/models/PersonDto';
import { StorageService } from 'src/app/services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private storage: StorageService,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}
  frmLogin: FormGroup;
  ngOnInit(): void {
    this.formCreate();
  }

  formCreate() {
    this.frmLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  Login(login: LoginForm) {
    if (this.frmLogin.valid) {
      this.auth.Login(login).subscribe(
        (result) => {
          if (result.success) {
            this.storage.saveStorage('user', result.data);
            this.toastr.success('Giriş Başarılı');
            this.router.navigate(['main'], {
              relativeTo: this.activeRoute,
            });
          }
        },
        (error) => {
          this.toastr.error('Yetkilendirme Başarısız');
          console.log(error);
        }
      );
    } else {
      this.toastr.info('Form boş olamaz');
    }
  }
}
