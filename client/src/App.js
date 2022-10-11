import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landingpage from "./Components/Landingpage/Landingpage";
import Main from "./Components/Main/Main";
import CountryDetails from "./Components/CountryDetails/CountryDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landingpage} />
          <Route path="/main" component={Main} />
          <Route path="/countries/:id" component={CountryDetails} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
