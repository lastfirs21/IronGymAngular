import { Component } from '@angular/core';
import { FaConfig, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faChalkboardUser, faChartColumn, faDollarSign, faDumbbell, faMoneyBill, faSackDollar, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FaConfig],
})
export class AppComponent {
  title = 'IrongymAngular';
  dumbellIcon = faDumbbell;
  dollarSign = faDollarSign;
  chalkBoardUser = faChalkboardUser;
  sackDollar = faSackDollar;
  fileChart = faChartColumn;
  moneyBill = faMoneyBill;
  navAtual: string = "home";
  menuOpen:boolean = false;

  constructor(library: FaIconLibrary)
  {
    library.addIcons(faUser, faDumbbell, faDollarSign, faChalkboardUser, faSackDollar, faChartColumn, faMoneyBill);
  }



  abrirMenu(){
    this.menuOpen = !this.menuOpen;
  }


}
