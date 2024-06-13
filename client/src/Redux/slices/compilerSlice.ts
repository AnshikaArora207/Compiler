import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CompilerSliceStateType{
    fullCode:{
        html: string;
        css: string;
        javascript: string;
    };
    currentLanguage: "html" | "css" | "javascript";
}

const initialState:CompilerSliceStateType={
    fullCode:{
        html: `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>To-Do List</h1>
        <input type="text" id="taskInput" placeholder="Enter task...">
        <button id="addButton">Add Task</button>
        <ul id="taskList"></ul>
    </div>
    
    <script src="script.js"></script>
</body>
</html>        
        `,
        css: `
body {
    font-family: Arial, sans-serif;
    text-align: center;
}

.container {
    margin: 50px auto;
    width: 50%;
}

h1 {
    color: #333;
}

input[type="text"] {
    padding: 10px;
    width: 70%;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}

button:hover {
    background-color: #45a049;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    background-color: #f9f9f9;
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 5px;
}

        `,
        javascript: `
document.getElementById("addButton").addEventListener("click", function() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");

    if (taskInput.value.trim() !== "") {
        var taskText = taskInput.value.trim();
        var listItem = document.createElement("li");
        listItem.textContent = taskText;
        taskList.appendChild(listItem);
        taskInput.value = "";
    }
});

        `,
    },
    currentLanguage: "html",
}
const compilerSlice = createSlice({
    name: "compilerSlice",
    initialState,
    reducers:{
        updateCurrentLanguage:(state,action:PayloadAction<CompilerSliceStateType["currentLanguage"]>)=>{
            state.currentLanguage = action.payload; 
        },
        updateCodeValue:(state,action:PayloadAction<string>)=>{
            state.fullCode[state.currentLanguage] = action.payload;
        },
        updateFullCode:(state,action:PayloadAction<CompilerSliceStateType["fullCode"]>)=>{
            state.fullCode = action.payload;
        },
    },
});
export default compilerSlice.reducer;
export const {updateCurrentLanguage, updateCodeValue, updateFullCode} = compilerSlice.actions