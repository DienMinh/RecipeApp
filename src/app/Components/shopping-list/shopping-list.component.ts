import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShopListService } from 'src/app/Services/shop-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: any[] = [];
  modeUse = false;
  modeClearBtn = false;
  shoppingForm!: FormGroup;
  subscription: Subscription = new Subscription();

  constructor(private dataShopList: ShopListService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.dataShopList.ingredients.subscribe((res) => {
      this.ingredients = res;
    });

    this.shoppingForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl('', [Validators.required]),
      amount: new FormControl(0, [Validators.required, Validators.min(1)]),
    });
    this.shoppingForm.valueChanges.subscribe((res) => {
      this.modeClearBtn = res.amount > 0 ? true : false;
    });
  }

  addIngredient() {
    if (this.shoppingForm.invalid) {
      return;
    }
    this.shoppingForm.value.id = this.dataShopList.ingredients.value.length + 1;
    const newIngredient = this.shoppingForm.value;
    this.dataShopList.addIngredient(newIngredient);
    this.shoppingForm.reset({ name: '', amount: 0 });
  }

  cancelHandler() {
    if (this.modeUse) {
      this.shoppingForm.reset({ name: '', amount: 0 });
      this.modeUse = false;
    }
    this.shoppingForm.reset({ name: '', amount: 0 });
  }

  onIngredientDetail(ingredient: any) {
    this.modeUse = true;
    this.shoppingForm.get('id')?.setValue(ingredient.id);
    this.shoppingForm.get('name')?.setValue(ingredient.name);
    this.shoppingForm.get('amount')?.setValue(ingredient.amount);
  }

  updateIngredient() {
    if (this.shoppingForm.invalid) {
      return;
    }
    const ingredient = this.shoppingForm.value;
    this.dataShopList.updateIngredient(ingredient);
    this.shoppingForm.reset({ id: 0, name: '', amount: 0 });
    this.modeUse = false;
  }

  deleteIngredient() {
    const id = this.shoppingForm.value.id;

    this.dataShopList.deleteIngredient(id);
    this.shoppingForm.reset({ name: '', amount: 0 });
    this.modeUse = false;
  }

  clearAmount() {
    this.shoppingForm.get('amount')?.setValue(0);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
