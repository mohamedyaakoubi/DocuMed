import { CiSearch } from "react-icons/ci";


export const Appointments = () => {

    return(<>
        <div>
            <h2>today's rendez -vous </h2>
            <h3>21 December 2024</h3>
            <img src="assets\hello.jpg" width={50} height={50}/>

        </div>

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
        <ul>
        <li><p>name</p><p>family name</p><p>contole</p><p>21 December 2024</p><p>at 10 am</p></li>
        <li><p>name</p><p>family name</p><p>first time</p><p>21 December 2024</p><p>at 10 am</p></li>
        <li><p>name</p><p>family name</p><p>second time</p><p>21 December 2024</p><p>at 10 am</p></li>
        <li><p>name</p><p>family name</p><p>controle</p><p>21 December 2024</p><p>at 10 am</p></li>
        </ul>
    </div>
        
    </>);
};