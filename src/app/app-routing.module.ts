import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipesComponent } from './Components/recipes/recipes.component';
import { ShoppingListComponent } from './Components/shopping-list/shopping-list.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { RecipeAddComponent } from './Components/recipe-add/recipe-add.component';
import { RecipeDetailComponent } from './Components/recipe-detail/recipe-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'recipes',
    pathMatch: 'full',
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      {
        path: 'new',
        component: RecipeAddComponent,
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
      },
      {
        path: ':id/edit',
        component: RecipeAddComponent,
      },
    ],
  },
  {
    path: 'shop-list',
    component: ShoppingListComponent,
    children: [
      {
        path: ':id',
        component: ShoppingListComponent,
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
