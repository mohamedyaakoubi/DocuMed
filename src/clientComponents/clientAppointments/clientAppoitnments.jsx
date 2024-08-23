export const ClientAppointments = () => {

    return(<>
        <div style={{backgroundColor:"green", alignItems:"left" , width:"50%"}}>
            <h2>Is this your first appointment ?</h2>
            <button>yes</button><br/>
            <button>No</button>
        </div>
        <div style={{backgroundColor:"blue",float:"right" , width:"50%"}}>
            <img src="assets\hello.jpg" width={50} height={50}/>
            <span style={{display: "inline-block"}}><p style={{ display: "inline-block", margin: 0 }}>name :</p>
                <p style={{ display: "inline-block", margin: 0 }}>abdoo</p></span><br/>

                <p style={{ display: "inline-block", margin: 0 }}>family name :</p>
                <p style={{ display: "inline-block", margin: 0 }}>3bdili</p><br/>

                <p style={{ display: "inline-block", margin: 0 }}>specialite :</p>
                <p style={{ display: "inline-block", margin: 0 }}>dentiste</p><br/>
        </div>
    </>);
};