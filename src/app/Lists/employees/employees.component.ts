import { Component } from '@angular/core';
import { EmployeeService } from '../../../services/employees.service';
import { Employee } from '../../../models/employee';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../Components/delete-dialog/delete-dialog.component'

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule,  RouterLink, RouterLinkActive, MatDialogModule],

  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {

  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private dialog: MatDialog) { }

  openDeleteDialog(employeeID: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(yes => {
      if (yes) {
        this.employeeService.delete(employeeID).subscribe((wasDeleted) => {
          this.employees = this.employees.filter(employee => employee.id !== employeeID);

        });
      } else {
      }
    });
  }

  async getEmployees() {
    this.employees = await firstValueFrom(this.employeeService.getAll());
  }

  ngOnInit() {
    this.getEmployees()
  }

}
