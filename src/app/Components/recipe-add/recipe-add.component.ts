import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/Services/recipe.service';

@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.scss'],
})
export class RecipeAddComponent implements OnInit {
  recipeForm!: FormGroup;
  imageSRC = '';
  ingredients = new FormArray([]);

  constructor(private dataRecipe: RecipeService, private router: Router) {}

  ngOnInit(): void {
    const presentChildRoute = this.router.url.split('/');
    if (presentChildRoute[2] === 'new') {
      this.recipeForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        imageURL: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        ingredients: this.ingredients,
      });
    } else if (presentChildRoute[3] === 'edit') {
      const id = Number(presentChildRoute[2]);
      this.dataRecipe.recipes.subscribe((res) => {
        this.recipeForm = new FormGroup({
          name: new FormControl(res[id - 1].name, [Validators.required]),
          imageURL: new FormControl(res[id - 1].imageURL, [
            Validators.required,
          ]),
          description: new FormControl(res[id - 1].description, [
            Validators.required,
          ]),
          ingredients: this.ingredients,
        });
        this.imageSRC = res[id - 1].imageURL;
      });
    }
    this.recipeForm.valueChanges.subscribe((res) => {
      this.imageSRC = res.imageURL;
    });
  }

  addIngredient() {
    this.ingredients.push(
      new FormGroup({
        item: new FormControl('', [Validators.required]),
        amount: new FormControl('', [Validators.min(1)]),
      })
    );
  }

  deleteIngredient(i: number) {
    this.ingredients.removeAt(i);
  }

  onSubmit() {
    const presentChildRoute = this.router.url.split('/');
    if (presentChildRoute[2] === 'new') {
      const newId = this.dataRecipe.recipes.subscribe.length + 1;
      const recipe = { id: newId, ...this.recipeForm.value };
      this.dataRecipe.addRecipe(recipe);
      this.router.navigateByUrl('');
    } else if (presentChildRoute[3] === 'edit') {
      const id = Number(presentChildRoute[2]);
      this.dataRecipe.recipes.subscribe((res) => {
        res[id - 1] = this.recipeForm.value;
        this.router.navigateByUrl('');
      });
    }
  }

  onCancel() {
    this.router.navigateByUrl('');
  }
}
