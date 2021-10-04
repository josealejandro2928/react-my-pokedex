import React from 'react';
import Layout from '../components/Layout/Layout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MyList from '../pages/MyList/MyList';
import Home from '../pages/Home/Home';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/my-list">
            <MyList></MyList>
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
