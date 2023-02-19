import "./App.css"
import studentsData from "./data/data.json"
import Students from "./components/Students.js"
import Cohorts from "./components/Cohorts.js"
import { useState } from "react"

function App() {
  const [studentsInCohort, setStudentsInCohort] = useState(studentsData);
 

 
  function handleClick(cohort){
   setStudentsInCohort(cohort)
  }
 
  return (
    <div>
      <header>
      <h1>Student Dashboard</h1>
      </header>
      <main>
        <Cohorts data={studentsData} onClick={handleClick} />
        <Students data={studentsData} studentsInCohort={studentsInCohort} />
      </main>
    </div>
  );
}

export default App;
