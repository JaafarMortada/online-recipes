import MyButton from "../../button";
import TextInput from "../../textInput/Index";
import "./styles.css"

const AddRecipeFromModal = () => {
    return ( 
        <div className="add-recipe-modal-container">
            <h1 className="add-recipe-header showcase-header">Share Your Own Recipe!!</h1>
            <TextInput 
                label={"Recipe's Name:"}
                placeholder={"Recipe's name"}
            />
            <TextInput
                label={"Recipe's Cuisine:"}
                placeholder={"Recipe's cuisine"}
            />
            <TextInput
                label={"Recipe's Cuisine:"}
                placeholder={"Recipe's cuisine"}    
            />
            <TextInput
                label={"Ingredient:"}
                placeholder={"Ingredient"}
            />
            <TextInput
                label={"Ingredient's Amount:"}
                placeholder={"Ingredient's amount"}
            />
            <TextInput
                label={"Images:"}
                type={"file"}
                multiple={true}
            />
            <div className={"add-recipe-modal-buttons-container"}>
                <MyButton label={"Add more ingredients"} styles={{width:"150px", padding:"10px 0 10px"}}/>
                <MyButton label={"Share!"} styles={{width:"150px", padding:"10px 0 10px"}}/>
            </div>
            
        </div>
    );
}

export default AddRecipeFromModal;