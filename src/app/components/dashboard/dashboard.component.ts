import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductService } from '../../services/product.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  private _productService=inject(ProductService)

  constructor(private http: HttpClient){
    
  }

  ngOnInit(): void {
   this.getProducts()
  }


  getProducts(){
    this._productService.getProductos().subscribe(data=>console.log(data))
  }

}
