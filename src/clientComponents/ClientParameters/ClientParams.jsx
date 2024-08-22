export const ClientParams = () => {

    return(<div>
        <nav style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'antiquewhite' }}>
            <img width={50} height={50} src="assets/hello.jpg" alt="home"></img>
            <h5>Centre d'aide ?</h5>
            <button>Let's Connect</button>
        </nav>
        
        <section style={{ backgroundColor: 'blue', width: '100%', height: '87vh', }}>
            <div style={{ backgroundColor: 'rgb(215, 139, 139)', width: '50%', alignItems: 'center' }}>
            <img src="src\hello.jpg"/>
            <label>Your name</label>
            <input type="text" /><br/>
            <label>Your family name</label>
            <input type="text" /><br/>
            <label>phone</label>
            <input type="text" /><br/>
            <label>email</label>
            <input type="text" /><br/>
            <label>age</label>
            <input type="text" /><br/>
            <label>ID</label>
            <input type="text" disabled value={"hollaa"}/><br/>

            <h2>change pass</h2>
            <label>privious </label>
            <input type="password" /><br/>
            <label>new</label>
            <input type="password" /><br/>
            <label>re new</label>
            <input type="password" /><br/>

            
        
            <button>save</button>
            </div>
        </section>
        
        </div>);
};