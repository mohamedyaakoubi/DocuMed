import { CiSearch } from "react-icons/ci";

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
    <div>
        <h2>Search for Yoyr medecin</h2>
        <div>
            <img width={50} height={50} src="assets/hello.jpg"/>
            <br/>
            <span style={{display: "inline-block"}}><h4>name :</h4>
            <h6>abdoo</h6></span><br/>
            <h4>name :</h4>
            <h6>abdoo</h6>
        </div>

    </div>
      </>)
};