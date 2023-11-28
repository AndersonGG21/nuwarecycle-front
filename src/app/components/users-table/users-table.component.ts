import { Component, OnInit, inject } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/type';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit{
  
  customers : User[] = [];
  private userService = inject(UsersService);

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.customers = users;
        console.log(this.customers);
      }
    })
  }
}
