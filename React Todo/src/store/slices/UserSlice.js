import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    Todos: []
}
const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addItem(state, action) {
            state.Todos.push(action.payload)
        },
        deleteItem(state, action) {
            state.Todos = state.Todos.filter((todo) => todo.id !== action.payload.id);
        },

        editItem(state, action) {
            state.Todos = state.Todos.map((elem) => {
                if (elem.id === action.payload.id) {
                    return { ...state.Todos, text: action.payload.text }
                }
                return elem;
            })
        },
        completeItem(state, action) {
            // let todoArr = []
            state.Todos = state.Todos.map(todo => {
                if (todo.id === action.payload.id) {
                    return { ...state.Todos, isComplete : true, text:action.payload.text  }
                    
                }
                return todo;
            })
        }
    }
})

export default todoSlice.reducer;
export const { addItem, deleteItem, editItem, completeItem } = todoSlice.actions;