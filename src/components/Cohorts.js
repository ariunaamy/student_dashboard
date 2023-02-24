import "./Cohorts.css"

function Cohorts({ data, onClick }) {

    const sortedStudents = data.sort((a, b) => Date.parse(b.cohort.cohortStartDate) - Date.parse(a.cohort.cohortStartDate))

    let list = sortedStudents.map((student) => {
        return student.cohort.cohortCode;
    })

    let cohortList = [...new Set(list)]; // new Set is an object //formatting cohort string by adding space 
    let formattedCohortList = cohortList.map((cohort) => { 
        let match = /\d+/.exec(cohort);
        return cohort.substring(0, match.index) + " " + cohort.slice(match.index)
    })


    let cohortsObject = {};
    for (let i = 0; i < cohortList.length; i++) {
        cohortsObject[cohortList[i]] = data.filter((student) => {
            let element;
            if (cohortList[i] === student.cohort.cohortCode) {
                element = student.id;
            }
            return element
        })
    }

    console.log(cohortsObject)

    let arr = Object.values(cohortsObject)

    return (
        <div className="cohorts_box">
            <h4>Choose a Class by Start Date</h4>
            <ul id="cohorts_list">
                <li>
                    <button id="all_students_button" type="button" onClick={() => onClick(data)}>All Students</button>
                </li>
                    {formattedCohortList.map((cohort, index) => {
                        return (
                            <li><button key={index} onClick={() => onClick(arr[index])}>{cohort}</button></li>
                        )
                    })}
            </ul>
        </div>
    )
}

export default Cohorts

//onClick={handleOnClick("All Students")}

