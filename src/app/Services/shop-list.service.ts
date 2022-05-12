import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShopListService {
  ingredients = [
    { id: 1, name: 'Bread', amount: 4 },
    { id: 2, name: 'Tomato', amount: 6 },
    { id: 3, name: 'Vegetable', amount: 8 },
  ];

  constructor() {}

  addIngredient(ingredient: any) {
    this.ingredients.push(ingredient);
  }

  updateIngredient(ingredient: any) {
    this.ingredients.forEach((item) => {
      if (item.id === ingredient.id) {
        item.name = ingredient.name;
        item.amount = ingredient.amount;
      }
    });
  }

  deleteIngredient(id: number) {
    this.ingredients.splice(id - 1, 1);
  }
}
