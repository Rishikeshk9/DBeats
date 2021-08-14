import logo from './logo.svg';
import './App.css';
import  Form  from './component/form.component';
import  Switcher from './component/switcher.component';
import  Connection from './component/connection.component';
import  Track from './component/track.component';
import  Switch from './component/switch.component';

import "../node_modules/noty/lib/noty.css";  

import "../node_modules/noty/lib/themes/metroui.css";  
 
function App() {
  
  return (
    
    <div className="bg-blue-50">
    <Switcher/>
    <Connection/>
    <Switch/>
     
</div>
  );
}

export default App;
