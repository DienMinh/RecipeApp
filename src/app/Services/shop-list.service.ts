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
    this.ingredients.value.forEach((item) => {
      if (item.id === ingredient.id) {
        item.name = ingredient.name;
        item.amount = ingredient.amount;
      }
    });
  }

  deleteIngredient(id: number) {
    const newIngredients = this.ingredients.value.filter(
      (ingredient) => ingredient.id !== id
    );
    this.ingredients.next(newIngredients);
  }
}
