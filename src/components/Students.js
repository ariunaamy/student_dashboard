
import Student from './Student.js'


function Students({ data, studentsInCohort }) {


    let cohortCode = studentsInCohort[0].cohort.cohortCode;
    let match = /\d+/.exec(cohortCode);

    return (
        <div>
            <div className="students_header">
                <h3>{studentsInCohort === data ? "All Students" : cohortCode.substring(0, match.index) + " " + cohortCode.slice(match.index)}</h3>
                <p>Total Students: {studentsInCohort.length}</p>
            </div>
            <div className="students">
                {studentsInCohort.map((student, index) => {
                    return (
                        <Student key={index} student={student} />
                    )
                })
                }
            </div>
        </div>
    )
}

export default Students