import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

interface City {
  name: string;
  code: string;
}

interface ShipMethod {
  name: string;
}


interface Sucursal {
  name: string;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})

export class CheckoutComponent implements OnInit {
  cities: City[] = [{ name: 'Bogotá', code: 'BOG' },];
  shipMethods: ShipMethod[] = [{name: 'Recoger'}, {name: "Envio"}];
  sucursales: Sucursal[] = [{"name": "S1"}, {"name": "S2"}, {"name": "S3"}];

  seledtedSucursal: Sucursal | undefined;
  selectedshipMethod: ShipMethod | undefined;
  selectedCity: City | undefined;

  fb: FormBuilder = inject(FormBuilder);
  personalInfo: FormGroup = this.fb.group({});
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
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      cellphone: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.shipInfo = this.fb.group({
      selectedshipMethod: new FormControl<ShipMethod | null>(null),
      selectedSucursal: new FormControl<Sucursal | null>(null),
      address: ['', [Validators.required, Validators.minLength(5)]],
      selectedCity: new FormControl<City | null>(null),
    });

  }

  submit() {
    
  }
}
