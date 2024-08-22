import React, { useState } from 'react';


export const DocSignUp = () => {
    
    const [selectedOption, setSelectedOption] = useState('');

  // Handle change in selection (arrow function)
    const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

    return(<>
        
        <div>
        <nav style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'antiquewhite' }}>
            <img src="c:/Users/GigaByte/Desktop/new project/3584597.jpg" alt="Logo" style={{ width: '50px' }} />
            <h5>Centre d'aide ?</h5>
            <button>Let's Connect</button>
        </nav>
        
        <section style={{ backgroundColor: 'blue', width: '100%', height: '87vh', marginTop: '-20px' }}>
            <div style={{ backgroundColor: 'rgb(215, 139, 139)', width: '50%', alignItems: 'center' }}>
            <label>Your name</label>
            <input type="text" /><br/>
            <label>Your family name</label>
            <input type="text" /><br/>
            <label>phone</label>
            <input type="text" /><br/>
            <label>email</label>
            <input type="text" /><br/>
            <label>CIN</label>
            <input type="text" /><br/>
            <label>Proof</label>
            <input type="text" /><br/>
            <label>code postal</label>
            <input type="text" /><br/>
            <label htmlFor="select-list">specialite</label>
            <select id="select-list" value={selectedOption} onChange={handleChange}>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </select>
            <label>passs</label>
            <input type="password" /><br/>
            <label>re pass</label>
            <input type="password" /><br/>
            <h1>{selectedOption}</h1>
            <button>let's gooo</button>
            </div>
        </section>
        
        
        </div>

</>);
};