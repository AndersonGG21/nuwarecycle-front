import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { MediaService } from 'src/app/services/media.service';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/type';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit{
  
  customers : User[] = [];
  newUserDialog = false;
  userRole = '';
  previewImg = '';
  profileImg = '';
  @ViewChild('fileInput') fileInput!: ElementRef;
  customer : User = {
    id: 0,
    username: '',
    email: '',
    password: '',
    registrationDate: '',
    profileImage: '',
    role: ''
  };
  roles : string[] = ["USER", "ADMIN"];

  private fb: FormBuilder = inject(FormBuilder);
  newUser : FormGroup = this.fb.group({});
  userProfileData = new FormData();

  private userService = inject(UsersService);
  private alertService = inject(AlertService);
  private mediaService = inject(MediaService);
  private loginService = inject(LoginServiceService);

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.customers = users;
        console.log(this.customers);
      }
    })

    this.newUser = this.fb.group({
      username: ['', [Validators.required]],
      userMail: ['', [Validators.email, Validators.required]],
      userPass: ['', [Validators.required]],    
      userRole: ['', [Validators.required]]  
    })

  }

  triggerFileInput(): void {    
    this.fileInput.nativeElement.click();
  }

  handleFileInputChange(event: Event): void {    
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files) {      
      this.userProfileData.append('file', files[0]); 
      this.alertService.success('Image uploaded successfully');         
      const reader = new FileReader();
      reader.onload = (e) => (this.previewImg = e.target?.result as string);
      reader.readAsDataURL(files[0]);      
    }
  }

  createUser() {      
    this.mediaService.uploadFile(this.userProfileData).subscribe({
      next: (res) => {
        this.profileImg = res.url;          
      },
      complete: () => {
        this.loginService.createUser(
          this.newUser.value.username,
          this.newUser.value.userMail,
          this.newUser.value.userPass,
          this.profileImg,
          this.newUser.value.userRole          
        ).subscribe({ 
          next: (res) => {
            this.newUserDialog = false;
            this.alertService.success('User has been registered');             
          }              
        });
      },          
    });
  }  
}
