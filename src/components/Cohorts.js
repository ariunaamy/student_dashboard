import "./Cohorts.css"

function Cohorts({ data, onClick }) {
    let list = data.map((student) => {
        return student.cohort.cohortCode;
    })

    let cohortList = [...new Set(list)];
    
    //formatting cohort string by adding space 
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

    let arr = Object.values(cohortsObject)

    return (
        <div className="cohorts">
            <h4>Choose a Class by Start Date</h4>
            <div className="cohorts_list">
                <button type="button" onClick={() => onClick(data)}>All Students</button>
                <ul>
                    {formattedCohortList.map((cohort, index) => {
                        return (
                            <li key={index} onClick={() => onClick(arr[index])}>{cohort}</li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Cohorts

//onClick={handleOnClick("All Students")}

