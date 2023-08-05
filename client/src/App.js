import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {Routes} from 'react-router-dom';
import Landing from './components/layout/Landing'
import Auth from './views/Auth';
import AuthContextProvider from './context/AuthContext';
import Dasboard from './views/Dasboard'
import ProtectedRoute from './components/routing/ProtectedRoute';
import About from './views/About';
import PostContextProvider from './context/PostContext';

// import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <AuthContextProvider>
<PostContextProvider>
<Router>
      <Routes>
        <Route  path='/' element={<Landing/>} />
        {/* <Route  path='/login' element={<Login/>} /> */}
        {/* <Route  exact path='/login' render={(props)=> <Auth {...props} authRoute='login' />} />
        <Route   exact path='/register' render={(props)=> <Auth {...props} authRoute='register' />} /> */}

        <Route  path='/login' element={ <Auth authRoute='login' /> } />
       


        <Route  path='/register' element={ <Auth authRoute='register' /> } />
        
        <Route exact path='/dasboard' element={<ProtectedRoute><Dasboard/></ProtectedRoute>} />
        <Route exact path='/about' element={<ProtectedRoute><About/></ProtectedRoute>} />

        {/* <Route exact path='/dasboard' element={<Dasboard/>} /> */}
        
      </Routes>
    </Router></PostContextProvider>
    </AuthContextProvider>
    
  )
}

export default App;
