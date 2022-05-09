import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShopListService } from 'src/app/Services/shop-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  ingredients!: any[];
  modeUse = false;
  modeClearBtn = false;
  shoppingForm!: FormGroup;

  constructor(private dataShopList: ShopListService, private router: Router) {}

  ngOnInit(): void {
    this.ingredients = this.dataShopList.ingredients;
    this.shoppingForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      amount: new FormControl(0, [Validators.required, Validators.min(1)]),
    });
    this.shoppingForm.valueChanges.subscribe((res) => {
      if (res.amount > 0) {
        this.modeClearBtn = true;
      } else {
        this.modeClearBtn = false;
      }
    });
  }

  addIngredient() {
    if (this.shoppingForm.invalid) {
      return;
    }

    const newId = this.dataShopList.ingredients.length + 1;
    const newIngredient = { id: newId, ...this.shoppingForm.value };

    this.dataShopList.addIngredient(newIngredient);
    this.shoppingForm.reset({ name: '', amount: 0 });
  }

  onIngredientDetail(ingredient: any) {
    this.modeUse = true;
    this.shoppingForm.get('name')?.setValue(ingredient.name);
    this.shoppingForm.get('amount')?.setValue(ingredient.amount);
  }

  updateIngredient() {
    if (this.shoppingForm.invalid) {
      return;
    }

    const id = +this.router.url.split('/')[2];
    const ingredient = this.shoppingForm.value;

    this.dataShopList.updateIngredient(id, ingredient);
    this.shoppingForm.reset({ name: '', amount: 0 });
    this.modeUse = false;
    this.router.navigateByUrl('/shop-list');
  }

  deleteIngredient() {
    const id = +this.router.url.split('/')[2];

    this.dataShopList.deleteIngredient(id);
    this.shoppingForm.reset({ name: '', amount: 0 });
    this.modeUse = false;
    this.router.navigateByUrl('/shop-list');
  }

  clearAmount() {
    this.shoppingForm.get('amount')?.setValue(0);
  }
}
