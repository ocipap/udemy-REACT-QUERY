import "./App.css";
import {InfinitePeople} from "./people/InfinitePeople";
import {InfiniteSpecies} from "./species/InfiniteSpecies";
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtoolsPanel} from 'react-query/devtools'


const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Infinite SWAPI</h1>
        {/*<InfinitePeople/>*/}
        <InfiniteSpecies/>
        <ReactQueryDevtoolsPanel/>
      </div>

    </QueryClientProvider>
  );
}

export default App;
