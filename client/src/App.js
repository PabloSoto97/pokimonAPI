import { Home, Detail, Form, Landing } from "./views";
import { Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Route exact path="/" component={Landing} />
      <Route exact path="/create" component={Form} />
      <Route exact path="/pokemons/:id" component={Detail} />

      <Route exact path="/home" render={() => <Home />} />
    </div>
  );
}

export default App;
