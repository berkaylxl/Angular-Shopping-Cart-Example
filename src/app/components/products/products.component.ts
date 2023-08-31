import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  public productList: any;
  searchKey:string = "";
  constructor(private api: ApiService,private cartService : CartService) {

  }

  ngOnInit(): void {
    this.api.getProduct().subscribe(res => {
      this.productList = res;

      this.productList.forEach((a:any)=>{
        Object.assign(a,{quantity:1,total:a.price})
      });
    });
    
    this.cartService.search.subscribe((val:any) => {
      this.searchKey = val;
    })
  }
  addToCart(item :any){
   this.cartService.addtoCart(item)
  }
}

