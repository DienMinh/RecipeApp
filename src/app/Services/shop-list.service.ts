import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopListService {
  ingredients = new BehaviorSubject<Array<any>>([
    { id: 1, name: 'Bread', amount: 4 },
    { id: 2, name: 'Tomato', amount: 6 },
    { id: 3, name: 'Vegetable', amount: 8 },
  ]);

  constructor() {}

  addIngredient(ingredient: any) {
    const newIngredients = [...this.ingredients.value, ingredient];
    this.ingredients.next(newIngredients);
  }

  updateIngredient(ingredient: any) {
    const length = this.ingredients.value.length;
    for (let i = 0; i < length; i++) {
      if (this.ingredients.value[i].id === ingredient.id) {
        this.ingredients.value[i].name = ingredient.name;
        this.ingredients.value[i].amount = ingredient.amount;
        break;
      }
    }
  }

  deleteIngredient(id: number) {
    const newIngredients = this.ingredients.value.filter(
      (ingredient) => ingredient.id !== id
    );
    this.ingredients.next(newIngredients);
  }
}
