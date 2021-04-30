import React from "react";
import { Route, Switch } from "react-router";
import Article from "./pages/article";
import Authentication from "./pages/authentication";
import CreateArticle from "./pages/createArticle/createArticle";
import EditArticle from "./pages/editArticle";
import GlobalFeed from "./pages/globalFeed";
import Settings from "./pages/settings";
import TagFeed from "./pages/tagFeed";
import UserProfile from "./pages/userProfile";
import YourFeed from "./pages/yourFeed/yourFeed";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={GlobalFeed} exact />
      <Route path="/profiles/:slug" component={UserProfile} />
      <Route path="/profiles/:slug/favorites" component={UserProfile} />
      <Route path="/settings" component={Settings} />
      <Route path='/articles/new' component={CreateArticle} />
      <Route path='/articles/:slug/edit' component={EditArticle} />
      <Route path="/feed" component={YourFeed} />
      <Route path="/tags/:slug" component={TagFeed} />
      <Route path="/login" component={Authentication} />
      <Route path="/register" component={Authentication} />
      <Route path="/articles/:slug" component={Article} />
    </Switch>
  );
};
export default Routes;
