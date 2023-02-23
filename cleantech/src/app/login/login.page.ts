import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthModel } from '../model/auth.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentialFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.credentialFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  async register(): Promise<void> {
    const user = await this.authService.register(
      this.credentialFormGroup.value as AuthModel
    );

    if (user) {
      this.router.navigateByUrl('/tabs/register', { replaceUrl: true });
    }  else {
      this.showAlert('Register Failed', 'Please, try again');
    }
  }

  async signIn(): Promise<void>{
    const user = await
    this.authService.signIn(this.credentialFormGroup.value as AuthModel)

    if(user){
      this.router.navigateByUrl('/tabs/home', { replaceUrl: true });

    } else {
      this.showAlert('SignIn Failed', 'Please, try again');
    }
  }

  async showAlert(header: string, message:string): Promise<void>{
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Ok']
    });
  }
}
