import { Routes } from '@angular/router';
import { EmployeesComponent } from './Lists/employees/employees.component';
import { CompaniesComponent } from './Lists/companies/companies.component';
import { KnowledgeComponent } from './Lists/knowledge/knowledge.component';
import { EmployeeViewComponent } from './Pages/employee-view/employee-view.component';
import { EmployeeRegistrationComponent } from './Pages/employee-registration/employee-registration.component';

export const routes: Routes = [
    { path: '',   redirectTo: '/employees', pathMatch: 'full' },
    { path: 'employees', component: EmployeesComponent },
    { path: 'employees/create', component: EmployeeRegistrationComponent },
    { path: 'employees/:id', component:  EmployeeViewComponent},
    { path: 'companies', component: CompaniesComponent },
    { path: 'knowledge', component: KnowledgeComponent },
];
