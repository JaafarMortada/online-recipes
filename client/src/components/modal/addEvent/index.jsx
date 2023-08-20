import Datetime from "react-datetime";
import TextInput from "../../textInput/Index";
import MyButton from "../../button";
import { useState } from "react";
import moment from "moment";
import "react-datetime/css/react-datetime.css";

const AddCalenderEvent = () => {

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate)
        // console.log(newDate ? moment(newDate).format("YYYY-MM-DD") : null)
    };

    return ( 
        <div className="add-recipe-modal-container">
            <h1 className="add-recipe-header showcase-header">Add a Calender Event!</h1>
            <label>Pick a Date:</label>
            <Datetime input={ false } onChange={handleDateChange} timeFormat={false} dateFormat={true}/>
            <TextInput
                label={"Meal's Name:"}
                placeholder={"Meal's name"}
            />
            <div className={"add-recipe-modal-buttons-container"}>
                <MyButton label={"Add to Calender"} styles={{width:"150px", padding:"10px 0 10px"}}/>
            </div>
        </div>
    );
}

export default AddCalenderEvent;