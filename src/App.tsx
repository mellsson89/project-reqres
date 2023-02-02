import {Container} from "@mui/material";
import {Route, Switch} from 'react-router-dom';
import React from "react";

import HomePage from "./views/HomePage";
import NotFound from "./views/NotFound";
function App() {

  return (
<Container>
<Switch>
  <Route exact path ="/" component={HomePage}/>
  <Route path="*" component={NotFound}/>
</Switch>
</Container>
  );
}

export default App;
