import { Injectable, inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, take, tap } from 'rxjs';
import { AlertService } from './alert.service';
import { Product, User } from '../type';

const GET_PRODUCTS_QUERY = gql`
  {
    getAllProducts {
      idProd
      name
      category
      brand
      price
      description
      image1
      comments {
        comment
        user {
          username
        }
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class GraphQLService {
  constructor(private apollo: Apollo) {
    this.getAllProducts();
    // this.getAllUsers();
  }
  private productsSubject = new BehaviorSubject<any[]>([]);
  private usersSubject = new BehaviorSubject<any[]>([]);
  private alertService = inject(AlertService);
  products$ = this.productsSubject.asObservable();

  private getAllProducts() {
    this.apollo
      .watchQuery({
        query: GET_PRODUCTS_QUERY,
      })
      .valueChanges.pipe(
        take(1),
        tap((data: any) => {
          const { getAllProducts } = data.data;
          this.productsSubject.next(getAllProducts);
        })
      )
      .subscribe();
  }

  private getAllUsers() {
    const GET_USERS_QUERY = gql`
    GetUsers {
      getAllUsers {  
        profileImg
        username
        email
        rol
      }
    }
    `;

    this.apollo
      .watchQuery({
        query: GET_USERS_QUERY,
      })
      .valueChanges.pipe(
        take(1),
        tap((data: any) => {
          const { getAllUsers } = data.data;
          this.usersSubject.next(getAllUsers);
        })
      )
      .subscribe();
  }

  public deleteProduct(idProd: number) {
    const DELETE_PRODUCT_QUERY = gql`
    mutation DeleteProduct {
      deleteProduct(id : ${idProd}) {
        idProd
      }
    }
    `;

    this.apollo
      .mutate({
        mutation: DELETE_PRODUCT_QUERY,
      })
      .subscribe({
        next: (res) => {
          this.alertService.success('Product deleted successfully');
          console.log('Product deleted successfully', res);
        },
        error: (error) => {
          console.error('Error deleting product', error);
        },
      });
  }

  public updateProduct(product: Product) {
    const UPDATE_PRODUCT_QUERY = gql`
    mutation UpdateProduct{
      updateProduct(prod:{ idProd: ${product.idProd}, name: "${product.name}", description: "${product.description}", category: "${product.category}", brand: "${product.brand}", price: ${product.price} }) {
        idProd
        name
        description
        category
        brand
        price
      }
    }
    `;

    this.apollo
      .mutate({
        mutation: UPDATE_PRODUCT_QUERY,
      })
      .subscribe({
        next: (res) => {
          this.alertService.success('Product updated successfully');
          console.log('Product updated successfully', res);
        },
        error: (error) => {
          console.error('Error updating product', error);
        },
      });
  }

  public addNewProduct(product: Product) {
    const ADD_PRODUCT_QUERY = gql`
    mutation AddProduct{
      addProduct(name: "${product.name}", description: "${product.description}", category: "${product.category}", brand: "${product.brand}", price: ${product.price}, image1: "${product.image1}") {
        idProd
        name
        description
        category
        brand
        price
      }
  }`;

    this.apollo
      .mutate({
        mutation: ADD_PRODUCT_QUERY,
      })
      .subscribe({
        next: (res) => {
          this.alertService.success('Product added successfully');
          console.log('Product added successfully', res);
        },
        error: (error) => {
          console.error('Error adding product', error);
        },
      });
  }

  public addNewUser(user: User) {
    const ADD_USER_QUERY = gql`
    mutation AddUser{
      addUser(user {username: "${user.username}", email: "${user.email}", password: "${user.password}", rol: "${user.role}", profileImg: "${user.profileImage}"}) {
        username
        email
        rol
      }
    }`;

    this.apollo
      .mutate({
        mutation: ADD_USER_QUERY,
      })
      .subscribe({
        next: (res) => {
          this.alertService.success('User added successfully');
          console.log('User added successfully', res);
        },
        error: (error) => {
          console.error('Error adding user', error);
        },
      });
  }

  public deleteUser(id : number) {
    const DELETE_USER_QUERY = gql`
    mutation DeleteUser{
      deleteUser(id: ${id}) {
        username
        email
        rol
      }
    }`;

    this.apollo
      .mutate({
        mutation: DELETE_USER_QUERY,
      })
      .subscribe({
        next: (res) => {
          this.alertService.success('User deleted successfully');
          console.log('User deleted successfully', res);
        },
        error: (error) => {
          console.error('Error deleting user', error);
        },
      });
  }

  public updateUser(user: User) {
    const UPDATE_USER_QUERY = gql`
    mutation UpdateUser{
      updateUser(user {id: ${user.id}, username: "${user.username}", email: "${user.email}", password: "${user.password}", rol: "${user.role}", profileImg: "${user.profileImage}"}) {
        username
        email
        rol
      }
    }`;

    this.apollo
      .mutate({
        mutation: UPDATE_USER_QUERY,
      })
      .subscribe({
        next: (res) => {
          this.alertService.success('User updated successfully');
          console.log('User updated successfully', res);
        },
        error: (error) => {
          console.error('Error updating user', error);
        },
      });
  }
}
