import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Produto } from '../model/produto.model';
import { CorreiosService } from '../services/correios.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  produtosList!: Produto[];
  searchFG!: FormGroup;

  @ViewChild('searchFGD') searchFGD!: FormGroupDirective;

  constructor(
    private toastController: ToastController,
    private firebaseService: FirebaseService,
    private correiosService: CorreiosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchFG = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }

  search(produtos: any) {
    this.firebaseService.findByName(produtos.name).subscribe({
      next: (result) => {
        if (!result) {
          this.presentToast(`Nome não encontrado: ${produtos.name}`);
        }
        this.produtosList = result as Produto[];
      },
      error: (err) => {
        console.log(err);
        this.presentToast(`Service unavailable`);
      },
    });
    this.searchFG.reset();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2500,
      position: 'middle',
    });
    await toast.present();
  }

  editProdutos(id: string) {
    this.router.navigateByUrl(`/tabs/details/${id}`);
  }
}
