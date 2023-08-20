import Datetime from "react-datetime";
import TextInput from "../../textInput/Index";
import MyButton from "../../button";
import { useState } from "react";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import { sendRequest } from '../../../config/request';


const AddCalenderEvent = () => {

    const [selectedDate, setSelectedDate] = useState(null);

    const [data, setData] = useState({
        meal: "",
    })
    const handleDateChange = (newDate) => {
        setSelectedDate(newDate)
        // console.log(newDate ? moment(newDate).format("YYYY-MM-DD") : null)
    };

    const handleDataChange = (e)=>{
        setData({...data, [e.target.name]: e.target.value})
    }

    const addEventHandler = async () => {
        const add_event_btn = document.getElementById("add-event-btn")
        add_event_btn.innerHTML = 'Adding Event...'
        try {
            const response = await sendRequest({
                method: "POST",
                route: "/api/set_plan",
                body: {meal: data.meal, date: selectedDate ? moment(selectedDate).format("YYYY-MM-DD") : null},
            });
            if(response.events){
                add_event_btn.innerHTML = 'success'
            } else {
                add_event_btn.innerHTML = 'Failed'
                add_event_btn.style.backgroundColor = 'rgb(255, 109, 109)'
                setTimeout(() => { 
                    add_event_btn.innerHTML = 'Add to Calender' 
                    add_event_btn.style.backgroundColor = 'rgb(247, 129, 91)'
                }, 3000)
            }
        } catch (error) {
            console.log(error)
            add_event_btn.innerHTML = 'Try Again' 
        }
    }
    return ( 
        <div className="add-recipe-modal-container">
            <h1 className="add-recipe-header showcase-header">Add a Calender Event!</h1>
            <label>Pick a Date:</label>
            <Datetime input={ false } onChange={handleDateChange} timeFormat={false} dateFormat={true}/>
            <TextInput
                name={"meal"}
                label={"Meal's Name:"}
                placeholder={"Meal's name"}
                onChange={handleDataChange}
            />
            <div className={"add-recipe-modal-buttons-container"}>
                <MyButton 
                    id={"add-event-btn"}
                    label={"Add to Calender"} 
                    styles={{width:"150px", padding:"10px 0 10px"}}
                    onClick={addEventHandler}
                    />
            </div>
        </div>
    );
}

export default AddCalenderEvent;