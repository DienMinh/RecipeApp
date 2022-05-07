import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/Services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipeList!: any[];

  constructor(private dataRecipe: RecipeService) {}

  ngOnInit(): void {
    this.dataRecipe.recipes.subscribe((res) => {
      this.recipeList = res;
    });
  }
}
