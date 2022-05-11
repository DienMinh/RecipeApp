import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { RecipeService } from 'src/app/Services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  recipeDetail: any;
  toggle = false;

  constructor(
    private dataRecipe: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((p) => {
          const id = Number(p['id']);
          return this.dataRecipe.recipes.pipe(
            map((recipes: any[]) => {
              return recipes.find((item: any) => item.id === id);
            })
          );
        })
      )
      .subscribe((selectedRecipe: any) => {
        this.recipeDetail = selectedRecipe;
      });
  }

  openDropdown() {
    this.toggle = !this.toggle;
  }

  deleteRecipe(id: number) {
    this.dataRecipe.deleteRecipe(id);
    this.router.navigateByUrl('');
  }
}
