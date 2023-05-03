import HomeView from './components/HomeView';
import LoginView from './components/LoginView';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

function App() {

  return (
    <main className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/home" element={<HomeView />} />
        </Routes>
        </BrowserRouter>
  
    </main>
  );
}

export default App;