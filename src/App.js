import "./App.css"
import studentsData from "./data/data.json"
import Students from "./components/Students.js"
import Cohorts from "./components/Cohorts.js"
import { useState } from "react"
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';



function App() {
  const [studentsInCohort, setStudentsInCohort] = useState(studentsData);
 

 
  function handleClick(cohort){
   setStudentsInCohort(cohort)
   console.log(cohort.length)
  }
 
  return (
    <div className="body">
      <header className="header">
      <h1>Student Dashboard</h1>
      <div className="icons">
      <a  href="https://github.com/ariunaamy"><FaGithub size={32} color="white"/></a>
      <a  href="https://www.linkedin.com/in/ariunaa-myagmar"><FaLinkedin size={32} color="white"/></a>
      </div>
      
      </header>
      <main>
        <Cohorts data={studentsData} onClick={handleClick} />
        <Students data={studentsData} studentsInCohort={studentsInCohort} />
      </main>
      {/* <footer>
        <p></p>
      </footer> */}
    </div>
  );
}

export default App;
