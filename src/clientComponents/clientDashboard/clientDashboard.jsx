import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

export const ClientDashboard = () => {

    return(<>
    <div style={{border: "solid black 1px"}}>

    <CiSearch />
    <input
        type="text"
        className="form-control empty"
        id="iconified"
      />
      <button>research</button>

    </div> 
        <h2>Search for Yoyr medecin</h2>
        <div style={{display:"grid",gridTemplateColumns: "auto auto auto " }}>
        
            <div style={{backgroundColor:"blue", width:"50%", height:"40%" }}>
                <img width={50} height={50} src="assets/hello.jpg"/>
                <br/>
                <span style={{display: "inline-block"}}><p style={{ display: "inline-block", margin: 0 }}>name :</p>
                <p style={{ display: "inline-block", margin: 0 }}>abdoo</p></span><br/>

                <p style={{ display: "inline-block", margin: 0 }}>family name :</p>
                <p style={{ display: "inline-block", margin: 0 }}>3bdili</p><br/>

                <p style={{ display: "inline-block", margin: 0 }}>specialite :</p>
                <p style={{ display: "inline-block", margin: 0 }}>dentiste</p><br/>

                <p>plus d'info ? </p>
                <button Link to="/Appointments.jsx"> take rende vous</button>
                <br/>
            </div>
            <div style={{backgroundColor:"blue", width:"50%" ,height:"40%" }}>
                <img width={50} height={50} src="assets/hello.jpg"/>
                <br/>
                <span style={{display: "inline-block"}}><p style={{ display: "inline-block", margin: 0 }}>name :</p>
                <p style={{ display: "inline-block", margin: 0 }}>abdoo</p></span><br/>

                <p style={{ display: "inline-block", margin: 0 }}>family name :</p>
                <p style={{ display: "inline-block", margin: 0 }}>3bdili</p><br/>

                <p style={{ display: "inline-block", margin: 0 }}>specialite :</p>
                <p style={{ display: "inline-block", margin: 0 }}>dentiste</p><br/>

                <p>plus d'info ? </p>
                <button>take rende vous</button>
                <br/>
            </div>
            <div>
            <div style={{backgroundColor:"blue", width:"50%", height:"40%",  }}>
                <img width={50} height={50} src="assets/hello.jpg"/>
                <br/>
                <span style={{display: "inline-block"}}><p style={{ display: "inline-block", margin: 0 }}>name :</p>
                <p style={{ display: "inline-block", margin: 0 }}>abdoo</p></span><br/>

                <p style={{ display: "inline-block", margin: 0 }}>family name :</p>
                <p style={{ display: "inline-block", margin: 0 }}>3bdili</p><br/>

                <p style={{ display: "inline-block", margin: 0 }}>specialite :</p>
    x             <p style={{ display: "inline-block", margin: 0 }}>dentiste</p><br/>

                <p>plus d'info ? </p>
                <button>take rende vous</button>
                <br/>
            </div>

            //
            <div style={{backgroundColor:"blue", width:"50%", height:"40%" }}>
                <img width={50} height={50} src="assets/hello.jpg"/>
                <br/>
                <span style={{display: "inline-block"}}><p style={{ display: "inline-block", margin: 0 }}>name :</p>
                <p style={{ display: "inline-block", margin: 0 }}>abdoo</p></span><br/>

                <p style={{ display: "inline-block", margin: 0 }}>family name :</p>
                <p style={{ display: "inline-block", margin: 0 }}>3bdili</p><br/>

                <p style={{ display: "inline-block", margin: 0 }}>specialite :</p>
                <p style={{ display: "inline-block", margin: 0 }}>dentiste</p><br/>

                <p>plus d'info ? </p>
                <button>take rende vous</button>
                <br/>
            </div>
            <div style={{backgroundColor:"blue", width:"50%" ,height:"40%" }}>
                <img width={50} height={50} src="assets/hello.jpg"/>
                <br/>
                <span style={{display: "inline-block"}}><p style={{ display: "inline-block", margin: 0 }}>name :</p>
                <p style={{ display: "inline-block", margin: 0 }}>abdoo</p></span><br/>

                <p style={{ display: "inline-block", margin: 0 }}>family name :</p>
                <p style={{ display: "inline-block", margin: 0 }}>3bdili</p><br/>

                <p style={{ display: "inline-block", margin: 0 }}>specialite :</p>
                <p style={{ display: "inline-block", margin: 0 }}>dentiste</p><br/>

                <p>plus d'info ? </p>
                <button>take rende vous</button>
                <br/>
            </div>
            <div>
            <div style={{backgroundColor:"blue", width:"50%", height:"40%",  }}>
                <img width={50} height={50} src="assets/hello.jpg"/>
                <br/>
                <span style={{display: "inline-block"}}><p style={{ display: "inline-block", margin: 0 }}>name :</p>
                <p style={{ display: "inline-block", margin: 0 }}>abdoo</p></span><br/>

                <p style={{ display: "inline-block", margin: 0 }}>family name :</p>
                <p style={{ display: "inline-block", margin: 0 }}>3bdili</p><br/>

                <p style={{ display: "inline-block", margin: 0 }}>specialite :</p>
                <p style={{ display: "inline-block", margin: 0 }}>dentiste</p><br/>

                <p>plus d'info ? </p>
                <button>take rende vous</button>
                <br/>
            </div>
            </div>
        </div>
        


    </div>
    
    </>)
};