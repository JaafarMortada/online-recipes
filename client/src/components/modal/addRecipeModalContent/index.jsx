import MyButton from "../../button";
import TextInput from "../../textInput/Index";
import { useState } from "react";
import { sendRequest } from '../../../config/request';

import "./styles.css"

const AddRecipeFromModal = () => {

    const [files, setFiles] = useState([])

    const handleFile = (e) => {
        const newFiles = []
        for(let i = 0; i < e.target.files.length; i++){
            newFiles.push(e.target.files[i])
        }
        setFiles(newFiles)
    } // https://stackoverflow.com/questions/70473346/how-do-i-get-mutliple-files-in-usestate-in-reactnext-js

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

    const handleSubmitClick = async () => {

        const create_recipe_button = document.getElementById("create-recipe-button")
        create_recipe_button.innerHTML = 'Sharing...'
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('cuisine', data.cuisine);
        formData.append('ingredients', JSON.stringify(ingredients));
        for (const file of files) {
            formData.append('image_url[]', file);
        }

        try {
            const response = await sendRequest({
                method: "POST",
                route: "/api/create_recipe",
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });
            if(response.status === "success"){
                create_recipe_button.innerHTML = 'success'
                setFiles([])
                setData({
                    name: '',
                    cuisine: '',
                    ingredient: '',
                    amount: '',
                })
                setIngredients([])
            } else {
                create_recipe_button.innerHTML = 'Failed'
                create_recipe_button.style.backgroundColor = 'rgb(255, 109, 109)'
                setTimeout(() => { 
                    create_recipe_button.innerHTML = 'Share!' 
                    create_recipe_button.style.backgroundColor = 'rgb(247, 129, 91)'
                }, 3000)
            }
        } catch (error) {
            console.log(error)
            create_recipe_button.innerHTML = 'Try Again' 
        }
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
                onChange={handleFile}
            />
            <div className={"add-recipe-modal-buttons-container"}>
                <MyButton 
                    label={"Add more ingredients"} 
                    styles={{width:"150px", padding:"10px 0 10px"}}
                    onClick={handleAddClick}
                />
                <MyButton 
                    id={"create-recipe-button"}
                    label={"Share!"} 
                    styles={{width:"150px", padding:"10px 0 10px"}}
                    onClick={handleSubmitClick}
                />
            </div>
            
        </div>
    );
}

export default AddRecipeFromModal;