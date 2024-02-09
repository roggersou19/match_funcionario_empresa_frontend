import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { EmployeeService } from '../services/employees.service';
import { Employee } from '../models/employee';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { Company } from '../models/company';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { CompanyService } from '../services/companies.service';
import { KnowledgeService } from '../services/knowledge.service';
import { Knowledge } from '../models/knowledge';
import { EmployeesComponent } from './Lists/employees/employees.component';
import { CompaniesComponent } from './Lists/companies/companies.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule, SidebarComponent, NavbarComponent, FooterComponent,  EmployeesComponent, CompaniesComponent,  RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  
  knowledges: Knowledge[] = [];

  constructor(  private knowledgeService: KnowledgeService){}


  async getKnowledges(){
    this.knowledges = await firstValueFrom(this.knowledgeService.getAll());
  }

  

  async ngOnInit(){
    this.getKnowledges()
    /* await this.getEmployee()

    if(this.employee){

      console.log(await this.getEmployeeKnowledge(this.employee));
    }
    this.getCompanies() */
    
  }
  title = 'Match - Funcionário X Habilidades';
    
}
