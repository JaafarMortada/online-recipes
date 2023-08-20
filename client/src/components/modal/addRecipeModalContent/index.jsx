import MyButton from "../../button";
import TextInput from "../../textInput/Index";
import { useState } from "react";
import "./styles.css"

const AddRecipeFromModal = () => {

    const [data, setData] = useState({
        name:"",
        cuisine:"",
        ingredient: "",
        amount:"",
    });

    const handleDataChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const [ingredients, setIngredients] = useState([]);

    const handleAddClick = () => {
        const ingredient = {
            name: data.ingredient,
            amount: data.amount
        }
        setIngredients([...ingredients, ingredient])
        setData({
            name: data.name,
            cuisine:data.cuisine,
            ingredient: "",
            amount:"",
        })
    }

    const handleSubmitClick = () => {
        console.log({name: data.name, cuisine: data.cuisine, ingredients:JSON.stringify(ingredients)})
    }
    
    return ( 
        <div className="add-recipe-modal-container">
            <h1 className="add-recipe-header showcase-header">Share Your Own Recipe!!</h1>
            <TextInput 
                name={"name"}
                label={"Recipe's Name:"}
                placeholder={"Recipe's name"}
                onChange={handleDataChange}
                value={data.name}
            />
            <TextInput
                name={"cuisine"}
                label={"Recipe's Cuisine:"}
                placeholder={"Recipe's cuisine"}
                onChange={handleDataChange}
                value={data.cuisine}
            />
            <TextInput
                name={"ingredient"}
                label={"Ingredient:"}
                placeholder={"Ingredient"}
                onChange={handleDataChange}
                value={data.ingredient}
            />
            <TextInput
                name={"amount"}
                label={"Ingredient's Amount:"}
                placeholder={"Ingredient's amount"}
                onChange={handleDataChange}
                value={data.amount}
            />
            <TextInput
                label={"Images:"}
                type={"file"}
                multiple={true}
            />
            <div className={"add-recipe-modal-buttons-container"}>
                <MyButton 
                    label={"Add more ingredients"} 
                    styles={{width:"150px", padding:"10px 0 10px"}}
                    onClick={handleAddClick}
                />
                <MyButton 
                    label={"Share!"} 
                    styles={{width:"150px", padding:"10px 0 10px"}}
                    onClick={handleSubmitClick}
                />
            </div>
            
        </div>
    );
}

export default AddRecipeFromModal;