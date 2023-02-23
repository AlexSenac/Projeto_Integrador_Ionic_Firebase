import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Produto } from '../model/produto.model';
import { CorreiosService } from '../services/correios.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  produtos!: Observable<Produto[]>;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private correiosService: CorreiosService
  ) {
    this.produtos = this.firebaseService.list();
  }

  newProdutos() {
    this.router.navigateByUrl('/tabs/register');
  }

  editProdutos(id: string) {
    this.router.navigateByUrl(`/tabs/details/${id}`);
  }
}
