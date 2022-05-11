import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeService } from 'src/app/Services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  recipeList!: any[];

  constructor(private dataRecipe: RecipeService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.dataRecipe.recipes.subscribe((res) => {
        this.recipeList = res;
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
