import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cities: City[] = [{ name: 'Bogotá', code: 'BOG' },];
  selectedCity: City | undefined;
  fb: FormBuilder = inject(FormBuilder);
  personalInfo: FormGroup = this.fb.group({});
  paymentInfo: FormGroup = this.fb.group({});
  shipInfo: FormGroup = this.fb.group({});


  ngOnInit() {
    //Generate colombian cities
    this.cities = [
      { name: 'Bogotá', code: 'BOG' },
      { name: 'Medellín', code: 'MED' },
      { name: 'Cali', code: 'CAL' },
      { name: 'Barranquilla', code: 'BAR' },
      { name: 'Cartagena', code: 'CAR' },
      { name: 'Cúcuta', code: 'CUC' },
      { name: 'Soledad', code: 'SOL' },
      { name: 'Ibagué', code: 'IBA' },
    ];

    this.personalInfo = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      cellphone: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.shipInfo = this.fb.group({
      address: ['', [Validators.required, Validators.minLength(5)]],
      selectedCity: new FormControl<City | null>(null),
    });

    this.paymentInfo = this.fb.group({
      cardHolder : ['', [Validators.required, Validators.minLength(5)]],
      //Valida la cantidad de digitos de cardNumber

      cardNumber : ['', [Validators.required]],
      cvc : ['', [Validators.required]],
    });
  }

  submit() {
    
  }
}
