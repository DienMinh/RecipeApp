import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipes = new BehaviorSubject<Array<any>>([
    {
      id: 1,
      name: 'Hamburger',
      imageURL:
        'http://assets.epicurious.com/photos/57c5c6d9cf9e9ad43de2d96e/master/pass/the-ultimate-hamburger.jpg',
      description: 'It is tasty',
      ingredients: [
        {
          item: 'Bread',
          amount: 2,
        },
        {
          item: 'Tomato',
          amount: 1,
        },
      ],
    },
  ]);

  constructor() {}

  addRecipe(recipe: any) {
    const newRecipes = [...this.recipes.value, recipe];
    this.recipes.next(newRecipes);
  }

  deleteRecipe(id: number) {
    const newRecipes = this.recipes.value.filter((recipe) => recipe.id !== id);
    this.recipes.next(newRecipes);
  }
}
