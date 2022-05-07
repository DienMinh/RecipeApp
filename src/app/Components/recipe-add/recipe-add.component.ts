import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { RecipeService } from 'src/app/Services/recipe.service';

@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.scss'],
})
export class RecipeAddComponent implements OnInit {
  recipeForm!: FormGroup;
  imageSRC = '';

  constructor(
    private fb: FormBuilder,
    private dataRecipe: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    const presentChildRoute = this.router.url.split('/');
    if (presentChildRoute[3] === 'edit') {
      const id = +presentChildRoute[2];
      this.dataRecipe.recipes.subscribe((res) => {
        const form = this.recipeForm;
        const editRecipe = res.find((i) => i.id === id);
        form.addControl('id', this.fb.control(editRecipe.id));
        form.get('name')?.setValue(editRecipe.name);
        form.get('imageURL')?.setValue(editRecipe.imageURL);
        form.get('description')?.setValue(editRecipe.description);

        for (let i = 0; i < editRecipe.ingredients.length; i++) {
          this.addIngredient();
        }
        this.ingredientsAlias.setValue(editRecipe.ingredients);
      });
    }
    this.recipeForm.valueChanges.pipe(debounceTime(500)).subscribe((res) => {
      this.imageSRC = res.imageURL;
    });
  }

  initForm(): void {
    const controls = {
      name: this.fb.control('', [Validators.required]),
      imageURL: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [Validators.required]),
      ingredients: this.fb.array([]),
    };
    this.recipeForm = this.fb.group(controls);
  }

  addIngredient() {
    this.ingredientsAlias.push(this.newIngredient());
  }

  deleteIngredient(i: number) {
    this.ingredientsAlias.removeAt(i);
  }

  onSubmit() {
    if (this.recipeForm.invalid) {
      console.log('invalid form');
      return;
    }
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

  get ingredientsAlias(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  newIngredient(): FormGroup {
    return this.fb.group({
      item: this.fb.control('', [Validators.required]),
      amount: this.fb.control('', [Validators.required, Validators.min(1)]),
    });
  }
}
