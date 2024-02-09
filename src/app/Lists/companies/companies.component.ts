import { Component } from '@angular/core';
import { CompanyService } from '../../../services/companies.service';
import { Company } from '../../../models/company';
import { firstValueFrom } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { PopupComponent } from '../../Components/popup/popup.component';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatButtonModule, CommonModule, MatDialogModule],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.css'
})
export class CompaniesComponent {

  companies: Company[] = [];
  
  constructor(private companyService: CompanyService, private dialog: MatDialog) { }

  async getCompanies() {
    this.companies = await firstValueFrom(this.companyService.getAll());
  }
  ngOnInit() {
    /* this.openPopup() */
    this.getCompanies()
  }

  openPopup(){
    this.dialog.open(PopupComponent,{
      width: '60%',
      height: '400px',
      data: {
        title: "Adicionar Empresa"
      },
    })
  }
}
