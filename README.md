# react-my-pokedex
It is a sample project for testing frontend skills using react library.
Simple React app for searching pokemons
The app was generated using create-react-app with **typescripts** and **sass**.
No external css framework was used. Only fontawesome and google font CDN was used in the project.

#### 1- Project structure
1. **components** : Contains all general application components such as: Loader, ListGridPokemonts, Header, Layout
2. **hooks**: Contains the custom hook for the app ej: useEffectUpdate (using o react to changes of a variable, without the initial call) and usePokedex:  A custom hook that uses the Context Api to handle the pokemon that the user selects to their pokedex.
3. **pages**: Contains the Component for the routing of the app: Home, MyPokedex and a Profile of the Pokemon
4. **services** Contains the functions for communicating with external apis through axios.

![structure-forlder](https://react-my-pokedex.surge.sh/folder-structure.jpeg)

#### 2- Pokedex Hook
```tsx
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AppContext } from '../App/App';

const usePokedex = () => {
  const { cacheMyPokedex, myPokedex, setMyPokedex, setCacheMyPokedex } = useContext<any>(AppContext);

  function onTooglePokemon(pokemon: any) {
    if (!cacheMyPokedex[pokemon.name]) {
      setCacheMyPokedex({ ...cacheMyPokedex, [pokemon.name]: true });
      setMyPokedex([...myPokedex, pokemon]);
      toast.success(
        <p>
          Pokemon <strong style={{ textTransform: 'capitalize' }}>{pokemon.name}</strong> added to your pokedex
        </p>
      );
    } else {
      setCacheMyPokedex({ ...cacheMyPokedex, [pokemon.name]: false });
      setMyPokedex(myPokedex.filter((el: any) => el.name !== pokemon.name));
      toast.success(
        <p>
          Pokemon <strong style={{ textTransform: 'capitalize' }}>{pokemon.name}</strong> removed from your pokedex
        </p>
      );
    }
  }
  return { tooglePokemon: onTooglePokemon, cacheMyPokedex, myPokedex };
};

export default usePokedex;
```
#### 3- Context Api used for sharing data accross multiples component in the app
```tsx
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
```
![home](https://react-my-pokedex.surge.sh/home.png)
![profile](https://react-my-pokedex.surge.sh/profile.png)

### 4- Running the App
Before cloning the repo, you must follow these steps to start the application in your local environment (you must have a correct version of node)
1. ``` npm install ``` or ``` yarn ``` I choose yarn over the npm
2. ``` yarn start ``` start the development server on  port 3000
3.  ``` yarn test ``` runs some unit test 

## [Demo](https://react-my-pokedex.surge.sh)
