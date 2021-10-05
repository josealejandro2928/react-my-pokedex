/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MyPokedex from '../pages/MyPokedex/MyPokedex';
import Home from '../pages/Home/Home';
import { Modal } from 'react-hook-modal';
import localforage from 'localforage';
import { Toaster } from 'react-hot-toast';

function App() {
  const mount = useRef(false);
  const { cacheMyPokedex, myPokedex, setCacheMyPokedex, setMyPokedex } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      let data = JSON.parse((await localforage.getItem('cacheMyPokedex')) || '{}');
      setCacheMyPokedex(data);
      data = JSON.parse((await localforage.getItem('myPokedex')) || '[]');
      setMyPokedex(data);
    })();
  }, []);

  useEffect(() => {
    if (!mount.current) {
      mount.current = true;
      return;
    }
    (async () => {
      await localforage.setItem('cacheMyPokedex', JSON.stringify(cacheMyPokedex));
      await localforage.setItem('myPokedex', JSON.stringify(myPokedex));
      mount.current = true;
    })();
  }, [myPokedex, cacheMyPokedex]);

  return (
    <React.Fragment>
      <Router>
        <Layout>
          <Switch>
            <Route path="/my-list">
              <MyPokedex></MyPokedex>
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
  myPokedex: [],
  setMyPokedex: (data: any): any => {},
  cacheMyPokedex: {},
  setCacheMyPokedex: (data: any): any => {},
});

export const AppContextProvider = ({ children }: { children: any }) => {
  const [myPokedex, setMyPokedex] = useState([]);
  const [cacheMyPokedex, setCacheMyPokedex] = useState({});

  return (
    <AppContext.Provider
      value={{
        myPokedex: myPokedex,
        setMyPokedex: setMyPokedex as any,
        cacheMyPokedex: cacheMyPokedex,
        setCacheMyPokedex: setCacheMyPokedex as any,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default App;
