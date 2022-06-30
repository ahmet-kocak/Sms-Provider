import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import SmsProvider from './components/SmsProvider';
import LoginAuth from './components/LoginAuth';
import Page404 from './components/Page404';


function App() {
  return (
    <div className="App">
    
      <Routes>
      <Route path="*" element={<Page404/>} />
      <Route path="/" element={<LoginAuth/>} />
      <Route path='/user' element={<SmsProvider />} />
      </Routes>
 
    </div>
  );
}

export default App;