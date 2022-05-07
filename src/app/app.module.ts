import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RecipesComponent } from './Components/recipes/recipes.component';
import { ShoppingListComponent } from './Components/shopping-list/shopping-list.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { RecipeAddComponent } from './Components/recipe-add/recipe-add.component';
import { RecipeDetailComponent } from './Components/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './Components/recipe-list/recipe-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    ShoppingListComponent,
    NavBarComponent,
    PageNotFoundComponent,
    RecipeAddComponent,
    RecipeDetailComponent,
    RecipeListComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
