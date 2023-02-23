import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Produto } from '../../model/produto.model';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { LoadingController, AlertController } from '@ionic/angular';
import { AvatarService } from '../../services/avatar.service';
@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.page.html',
  styleUrls: ['./contact-details.page.scss'],
})
export class ContactDetailsPage implements OnInit {
  produtosFormGroup!: FormGroup;
  @ViewChild('produtosFormGroupDirective')
  produtosFormGroupDirective!: FormGroupDirective;
  public produtos!: Produto;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private avatarService: AvatarService
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.firebaseService.find(id!).subscribe({
      next: (data: Produto) => {
        if (!data) {
          this.router.navigateByUrl('/tabs/list');
        } else {
          this.produtos = data;

          this.produtosFormGroup = new FormGroup({
            name: new FormControl(this.produtos.name, Validators.required),
            type: new FormControl(this.produtos.type, Validators.required),
            amount: new FormControl(this.produtos.amount, Validators.required),
            purchasePrice: new FormControl(
              this.produtos.purchasePrice,
              Validators.required
            ),
            percentage: new FormControl(
              this.produtos.percentage,
              Validators.required
            ),
            saleValue: new FormControl(
              this.produtos.saleValue,
              Validators.required
            ),
            supplier: new FormControl(
              this.produtos.supplier,
              Validators.required
            ),
            email: new FormControl(this.produtos.email, Validators.required),
            cnpj: new FormControl(this.produtos.cnpj, Validators.required),
            phone: new FormControl(this.produtos.phone, Validators.required),
            cep: new FormControl(this.produtos.cep, Validators.required),
            logradouro: new FormControl(
              this.produtos.logradouro,
              Validators.required
            ),
            numero: new FormControl(this.produtos.numero, Validators.required),
            bairro: new FormControl(this.produtos.bairro, Validators.required),
            localidade: new FormControl(
              this.produtos.localidade,
              Validators.required
            ),
          });
        }
      },
      error: (err) => console.error(`Error on get product data. Error: ${err}`),
    });
  }

  editProdutos(values: any) {
    let updateProdutos: Produto = { id: this.produtos.id, ...values };
    this.firebaseService
      .update(updateProdutos)
      .then(() => this.router.navigateByUrl('/tabs/list'))
      .catch((err) => console.error(err));

    this.produtosFormGroupDirective.reset();
  }

  deleteProdutos(id: any) {
    console.log(id);
    if (window.confirm('Tem certeza que deseja deletar?')) {
      this.firebaseService
        .delete(this.produtos.id)
        .then(() => this.router.navigateByUrl('/tabs/list'))
        .catch((err) => console.error(err));
    }
  }

  async uploadImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });

    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.avatarService.upload(image, 'produtos', this.produtos.id);

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
}
