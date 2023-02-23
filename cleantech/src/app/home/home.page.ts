import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user = [];
  segId = "overview";
  displayName!: string;

  constructor(private router:Router, private route: ActivatedRoute, private authService: AuthService, private auth: Auth) { 
    this.displayName = this.auth.currentUser!.displayName!;
  }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    this.segId = ev.detail.value;
  }

  goToEvent(){
    
  }  

  async signOut() {
    await this.authService.signOut();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async perfil() {
    this.router.navigateByUrl('/tabs/perfil', { replaceUrl: true });
  }
  

}
