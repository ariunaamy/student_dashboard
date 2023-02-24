
import "./Students.css"
import { useState } from "react";
import { FaTimes } from 'react-icons/fa';
import { FcCheckmark } from 'react-icons/fc';

function Student({ student }) {

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [showMore, setShowMore] = useState({boolean:false});
    const [commenter, setCommenter] = useState("");
    const [comment, setComment] = useState("");
    const [arr, setArr] = useState([]);

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

    function displayShowMore(studentId, student) {
        const scorePercent = ~~((student.codewars.current.total / student.codewars.goal.total) * 100);

        function changeColor(color){
            if(scorePercent >= 100){
                color = "green"
            }
            if(scorePercent >=50 && scorePercent < 100 ){
                color = "orange";
            }
            if (scorePercent<50 ){
                color = "red"
            }
            return color
        }
       
        if (student.id === studentId) {
        return (
            <div style={{height: "100%"}} className="show_more_content" key={student}>
                <div className="all_scores">
                    <div className="codewars">
                    <h4>Codewars:</h4>
                    <p><span>Current Total:</span> {student.codewars.current.total}</p>
                    <p><span>Last Week:</span> {student.codewars.current.lastWeek}</p>
                    <p><span>Goal:</span> {student.codewars.goal.total}</p>
                    <p><span>Percent of Goal Achieved:</span> <span style={{color:changeColor()}}>{scorePercent}%</span></p>
                    </div>
                    <div className="scores">
                        <h4>Scores:</h4>
                        <p><span>Assignments:</span> {student.cohort.scores.assignments * 100}%</p>
                        <p><span>Projects:</span> {student.cohort.scores.projects * 100}%</p>
                        <p><span>Assessments:</span> {student.cohort.scores.assessments * 100}%</p>
                    </div>
                    <div className="certifications">
                        <h4>Certifications</h4>
                        <p><span>Resume:</span>{student.certifications.resume === false ? (<FaTimes color="red" />) : (<FcCheckmark />)}</p>
                        <p><span>LinkedIn:</span> {student.certifications.linkedin === false ? (<FaTimes color="red" />) : (<FcCheckmark />)}</p>
                        <p><span>Mock Interview:</span> {student.certifications.mockInterview === false ? (<FaTimes color="red" />) : (<FcCheckmark />)}</p>
                        <p><span>GitHub:</span> {student.certifications.github === false ? (<FaTimes color="red" />) : (<FcCheckmark />)}</p>
                    </div>
                </div>
                <div className="comments">
                    <form onSubmit={(e) => handleSubmit(e, student.id)}>
                        <fieldset>
                            <p>
                                <label htmlFor="commenter">Commenter Name</label>
                                <input value={commenter} name="commenter" type="text" onChange={handleCommenterChange} ></input>
                            </p>
                            <p>
                                <label htmlFor="comment">Comment</label>
                                <input value={comment} name="comment" type="text" onChange={handleCommentChange} ></input>
                            </p>
                            <p>
                                <button type="submit">Add Note</button>
                            </p>
                        </fieldset>
                    </form>
                    <ul>
                        {student.notes.map((note)=> `${note.commenter} says, "${note.comment}"` )/* {`${student[0].notes.commenter} ${student[0].notes.comment}`} */}
                        {arr.filter((item) => {
                            return item.studentId === student.id;
                        }).map((comment, index) => {
                            return (
                                <li key={index}>{comment.commentText}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>

        )
        }
    }

    function handleSubmit(e, studentId) {
        e.preventDefault();  
           
        
        if(comment === "" || commenter === ""){
            alert("Please write your name and comment")
        } else {
            let obj = {
                studentId: studentId,
                commentText: `${commenter} says, "${comment}"`
            }
            setArr([...arr, obj])
            setComment("");
            setCommenter("");
        }
        }
       

    const handleCommentChange = (e) => {
        setComment(e.target.value)
    };
    const handleCommenterChange = (e) => {
        setCommenter(e.target.value)
    };

    function handleShowMore(studentId){
        if(showMore.boolean === true){
            setShowMore({boolean: false,
                [studentId]: false})
        } if(showMore.boolean === false){
            setShowMore({boolean: true,
                [studentId]: true})
        }
    }
    
    return (
        <div className="card" key={student.id}>
            <div className="general_info">
                <img src="https://marketplace.canva.com/EAEeKXthBnE/2/0/1600w/canva-purple-blue-and-pink-gamer-girl-twitch-profile-picture-HtVoUFTqSsk.jpg" alt={student.names.preferredName} />
                <div>
                    <h4>{student.names.preferredName} {student.names.middleName[0]}. {student.names.surname}</h4>
                    <p>{student.username}</p>
                    <p><span>Birthday:</span> {addBirthday(student)}</p>
                    <button id="show_more" onClick={()=>handleShowMore(student.id)}>{showMore.boolean && showMore[student.id] ? "Show less..." : "Show more..."}</button>
                </div>
                <p id="onTrackToGraduate"><span>{onTrackToGraduate(student)}</span></p>
            </div>
            {showMore.boolean && showMore[student.id] ? displayShowMore(student.id, student) : null}
        </div>

    )
}

export default Student