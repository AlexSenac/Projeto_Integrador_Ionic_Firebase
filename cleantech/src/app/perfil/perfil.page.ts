import { Component, OnInit, ViewChild } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Perfil } from '../model/perfil.model';
import { AuthService } from '../services/auth.service';
import { AvatarService } from '../services/avatar.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  perfilFormGroup!: FormGroup;
  @ViewChild('perfilFormGroupDirective')
  perfilFormGroupDirective!: FormGroupDirective;
  imageURL!: string;
  displayName!:string;

  constructor(
    private firebaseService: FirebaseService,

    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private avatarService: AvatarService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private auth: Auth
  ) {}

  ngOnInit() {

    this.imageURL = this.auth.currentUser!.photoURL!;
    this.displayName = this.auth.currentUser!.displayName!;

    this.perfilFormGroup = new FormGroup({
      name: new FormControl(this.auth.currentUser!.displayName, Validators.required),
      email: new FormControl(this.auth.currentUser!.email, Validators.required),
    });
  }

  async update() {
    const name: string = this.perfilFormGroup.get('name')?.value;
    this.authService.updateProfile(name);
  }

  async changeImage(): Promise<void> {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });

    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.avatarService.uploadPerfil(
        image,
        'perfils',
        this.auth.currentUser!.uid
      );

      loading.dismiss();

      if (result) {
        this.message('Sucesso', 'imagem salva com sucesso.');
      } else {
        this.message('Falhou', 'imagem não foi salva.Tente outra vez.');
      }
    }
  }
  async message(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Ok'],
    });

    await alert.present();
  }

  async signOut() {
    await this.authService.signOut();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async perfil() {    
    this.router.navigateByUrl('/tabs/register', { replaceUrl: true });
  }
}
