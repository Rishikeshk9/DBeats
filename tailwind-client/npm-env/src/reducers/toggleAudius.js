const initialState = true;

const toggleAudius = (state = initialState, action) =>{

    switch (action.type) {
        case "AUDIUSTOGGLE": return state?false:true;
           
            
    
        default: return state;
             
    }
}

export default toggleAudius;