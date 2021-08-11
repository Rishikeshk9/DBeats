import logo from './logo.svg';
import './App.css';
import Navbar from './component/navbar.component';
import  Form  from './component/form.component';
import  Switcher from './component/switcher.component';
import  Connection from './component/connection.component';
import "../node_modules/noty/lib/noty.css";  

import "../node_modules/noty/lib/themes/metroui.css";  
 
function App() {
  
  return (
    
    <div className="bg-blue-50">
    <Navbar/>
    <Switcher/>
    <Connection/>

</div>
  );
}

export default App;
