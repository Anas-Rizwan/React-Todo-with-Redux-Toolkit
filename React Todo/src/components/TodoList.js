import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem, deleteItem, editItem, completeItem } from '../store/slices/UserSlice';
import { useSelector } from 'react-redux';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

function TodoList() {

  const dispatch = useDispatch()

  const item = useSelector((state) => {
    return state.todos.Todos
  })
  console.log(item);

  const [input, setInput] = useState("");
  const [complete, setcomplete] = useState(false);
  const [toggle, settoggle] = useState(false);
  const [edit, setedit] = useState(null);
  const [Completevalue, setCompletevalue] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    if (!input) {
      alert("Plz Fill The Field")
    }
    else if (input && toggle) {
      console.log("input", input);

      settoggle(false)

      console.log("toggletttt");
      dispatch(editItem({
        id: edit,
        text: input,
        isComplete: false,
      }))
    }

    else {

      dispatch(addItem({
        id: Math.floor(Math.random() * 1000),
        text: input,
        isComplete: false,
      }))
      // )

    }
    setInput('');
  };


  const updateTodo = (val) => {
    let newItem = item.find((elem) => {
      return elem.id === val.id
    })

    setInput(newItem.text)
    settoggle(true)
    setedit(val.id)

  };

  const removeTodo = id => {
    console.log("id", id);
    dispatch(deleteItem({ id: id }))

  };

  const completeTodo = value => {
    dispatch(completeItem({
      id: value.id,
      text: value.text,
    }))
  };

  const handleChange = e => {
    setInput(e.target.value);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className='todo-form'>
        {toggle ? (
          <>
            <h1>Update Plan for Today?</h1>
            <input
              placeholder='Update your item'
              value={input}
              onChange={handleChange}
              name='text'

              className='todo-input edit'
            />
            <button onClick={handleSubmit} className='todo-button edit'>
              Update
            </button>
          </>
        ) : (
          <>
            <h1>What's the Plan for Today?</h1>
            <input
              placeholder='Add a todo'
              value={input}
              onChange={handleChange}
              name='text'
              className='todo-input'

            />
            <button onClick={handleSubmit} className='todo-button'>
              Add todo
            </button>
          </>
        )}
      </form>
      {
        item.map((todo, id) => (

          <div
            className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
            key={id}
          >
            <div key={todo.id} style={{ cursor: 'pointer' }} onClick={() => completeTodo(todo)}>
              <h3>{todo.text}</h3>
            </div>
            {todo.isComplete ?
              "" :
              <div className='icons'>
                <RiCloseCircleLine
                  onClick={() => removeTodo(todo.id)}
                  className='delete-icon'
                />
                <TiEdit
                  onClick={() => updateTodo(todo)}
                  className='edit-icon'
                />
              </div>
            }
          </div>
        ))
      }

    </>
  );
}

export default TodoList;
