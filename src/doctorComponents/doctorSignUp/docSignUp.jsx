export const docSignUp = () => {

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
            
            <button>let's gooo</button>
            </div>
        </section>
        
        <footer style={{ backgroundColor: 'aquamarine' }}>
            <center>Hello here footer</center>
        </footer>
        </div>

</>);
};