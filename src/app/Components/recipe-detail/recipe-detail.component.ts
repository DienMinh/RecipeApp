import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    this.route.params.subscribe((param) => {
      const id = Number(param['id']);
      this.dataRecipe.recipes.subscribe((res) => {
        this.recipeDetail = res.filter((item) => {
          return item.id === id;
        })[0];
      });
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
