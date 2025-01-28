import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-teal/theme.css';
import 'primeicons/primeicons.css';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
