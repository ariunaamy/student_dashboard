import "./Students.css"
import { useState } from "react";

function Students({ data, studentsInCohort }) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [showMore, setShowMore] = useState(false);
    
    function addBirthday(student) {
        let dob = student.dob.split("/")
        return months[parseInt(dob[0] - 1)] + " " + dob[1] + ", " + dob[2];
    }
    
    function onTrackToGraduate(student){
        let str = "";
        if(student.certifications.resume === true &&
            student.certifications.linkedin === true &&
            student.certifications.github === true &&
            student.certifications.mockInterview === true &&
            student.codewars.current.total > 600
            ){
              str = "On Track to Graduate";
            }
            return str;
    }

    function displayShowMore(student){
        return (
            <div className="show_more_content">
                <div className="codewars">
                    <h4>Codewars:</h4>
                    <p><span>Current Total:</span> {student.codewars.current.total}</p>
                    <p><span>Last Week:</span> {student.codewars.current.lastWeek}</p>
                    <p><span>Goal:</span> {student.codewars.goal.total}</p>
                    <p><span>Percent of Goal Achieved:</span> {~~((student.codewars.current.total / student.codewars.goal.total) * 100)}%</p>
                </div>
            </div>
        )
    }

    
    return (
        <div className="students">
            <h3>{studentsInCohort === data ? "All Students" : studentsInCohort[0].cohort.cohortCode}</h3>
            <p>Total Students: {studentsInCohort.length}</p>
           {studentsInCohort.map((student) => {
           return (
            <>
          <div className="card" key={student.id}>
              <img src={student.profilePhoto} alt={student.names.preferredName} />
              <div>
                  <h4>{student.names.preferredName} {student.names.middleName[0]}. {student.names.surname}</h4>
                  <p>{student.username}</p>
                  <p><span>Birthday:</span> {addBirthday(student)}</p>
                  <button onClick={()=>setShowMore(!showMore)}>{ showMore ? "Show less..." : "Show more..."}</button>  
              </div>
              <div>
                <p><span>{onTrackToGraduate(student)}</span></p>
              </div>
          <div className="show_more">
            {showMore ? displayShowMore(student) : null}</div>
          </div>
          </>    
      )
  })}
        </div>
    )
}

export default Students