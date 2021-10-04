import React, { useContext, useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MyList from '../pages/MyList/MyList';
import Home from '../pages/Home/Home';
import { Modal } from 'react-hook-modal';
import localforage from 'localforage';
import { Toaster } from 'react-hot-toast';

function App() {
  const mount = useRef(false);
  const { cacheMyList, myListPokemon, setCacheMyList, setMyListPokemon } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      let data = JSON.parse((await localforage.getItem('cacheMyList')) || '{}');
      setCacheMyList(data);
      data = JSON.parse((await localforage.getItem('myListPokemon')) || '[]');
      setMyListPokemon(data);
    })();
  }, []);

  useEffect(() => {
    if (!mount.current) {
      mount.current = true;
      return;
    }
    (async () => {
      await localforage.setItem('cacheMyList', JSON.stringify(cacheMyList));
      await localforage.setItem('myListPokemon', JSON.stringify(myListPokemon));
      mount.current = true;
    })();
  }, [myListPokemon, cacheMyList]);

  return (
    <React.Fragment>
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
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
        }}
      />
      <Modal
        styles={{
          container: { color: '#fff', backgroundColor: '#252525' },
          header: { backgroundColor: '#1E1E1E', color: '#fff' },
        }}
      ></Modal>
    </React.Fragment>
  );
}

//////GLOBAL CONTEXT DATA ///////
export const AppContext = React.createContext({
  myListPokemon: [],
  setMyListPokemon: (data: any): any => {},
  cacheMyList: {},
  setCacheMyList: (data: any): any => {},
});

export const AppContextProvider = ({ children }: { children: any }) => {
  const [myListPokemon, setMyListPokemon] = useState([]);
  const [cacheMyList, setCacheMyList] = useState({});

  return (
    <AppContext.Provider
      value={{
        myListPokemon: myListPokemon,
        setMyListPokemon: setMyListPokemon as any,
        cacheMyList: cacheMyList,
        setCacheMyList: setCacheMyList as any,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default App;
