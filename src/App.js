import { Route, BrowserRouter, Switch } from 'react-router-dom';
import React from 'react';
import ContextProvider from './ContextProvider';
import './App.css';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Explore from './pages/Explore';
import Foods from './pages/Foods';
import ExploreFoods from './pages/ExploreFoods';
import ExploreFoodIngredients from './pages/ExploreFoodIngredients';
import ExploreNationalities from './pages/ExploreNationalities';
import Details from './pages/Details';
import ProcessRecipe from './pages/ProcessRecipe';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import Drinks from './pages/Drinks';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreDrinkIngredients from './pages/ExploreDrinkIngredients';
import './styles/Recipes.css';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/explore" component={ Explore } />
          <Route exact path="/foods" component={ Foods } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/explore/foods" component={ ExploreFoods } />
          <Route exact path="/explore/drinks" component={ ExploreDrinks } />
          <Route
            exact
            path="/explore/foods/ingredients"
            component={ ExploreFoodIngredients }
          />
          <Route
            exact
            path="/explore/drinks/ingredients"
            component={ ExploreDrinkIngredients }
          />
          <Route
            exact
            path="/explore/foods/nationalities"
            component={ ExploreNationalities }
          />
          <Route
            exact
            path="/explore/drinks/nationalities"
            component={ NotFound }
          />
          <Route exact path="/foods/:id" component={ Details } />
          <Route exact path="/drinks/:id" component={ Details } />
          <Route exact path="/foods/:id/in-progress" component={ ProcessRecipe } />
          <Route exact path="/drinks/:id/in-progress" component={ ProcessRecipe } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
