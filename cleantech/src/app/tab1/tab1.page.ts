import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Endereco } from '../model/endereco.model';
import { Produto } from '../model/produto.model';
import { CorreiosService } from '../services/correios.service';
import { FirebaseService } from '../services/firebase.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AuthService } from '../services/auth.service';
import { Auth } from '@angular/fire/auth';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  avatar: string = '../../assets/image/xande.jpeg';

  produtoFormGroup!: FormGroup;
  produto!: Produto;
  editable: boolean = false;
  @ViewChild('produtoFormGroupDirective')
  produtoFormGroupDirective!: FormGroupDirective;
  profile: any = null;
  displayName!: string;

  constructor(
    private firebaseService: FirebaseService,
    private correiosService: CorreiosService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private auth: Auth
  ) {
    this.displayName = this.auth.currentUser!.displayName!;
  }

  ngOnInit(): void {
    this.produtoFormGroup = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]/),
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),
      type: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      purchasePrice: new FormControl('', Validators.required),
      percentage: new FormControl('', Validators.required),
      saleValue: new FormControl('', Validators.required),
      supplier: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      cnpj: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      endereco: new FormControl('', Validators.required),
      cep: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12),
      ]),
      logradouro: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      numero: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+$/),
      ]),
      bairro: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      localidade: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
    });

    this.produtoFormGroup.valueChanges.subscribe(() => this.defineAvatar());
  }

  defineAvatar() {
    const email = this.produtoFormGroup.get('email');
    if (email?.valid) {
      this.avatar = `https://robohash.org/${email.value}?set=set3&gravatar=yes`;
    }
  }

  createProduto(values: any) {
    let newProdutos: Produto = { ...values };
    newProdutos.imageUrl = this.avatar;
    this.firebaseService.save(newProdutos);
    console.log(newProdutos);
    this.produtoFormGroupDirective.reset();
  }

  loadEndereco() {
    const cep: string = this.produtoFormGroup.get('cep')?.value;
    this.correiosService.getEndereco(cep).subscribe({
      next: (result: Endereco) => {
        this.produtoFormGroup.patchValue({
          cep: result.cep,
          logradouro: result.logradouro,
          bairro: result.bairro,
          localidade: result.localidade,
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  calc(): void {
    let purchasePrice = this.produtoFormGroup.get('purchasePrice')?.value;
    let percentage = this.produtoFormGroup.get('percentage')?.value;

    let calcVenda = purchasePrice + purchasePrice * (percentage / 100);

    this.produtoFormGroup.patchValue({
      saleValue: calcVenda,
    });
  }

  async signOut() {
    await this.authService.signOut();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async perfil() {
    this.router.navigateByUrl('/tabs/perfil', { replaceUrl: true });
  }
}
