import React from "react";
import Button from '@mui/material/Button';


const TodoList = () =>  {
    return (
        <div className="h-100 w-full flex-1 inset-y-0 left-0 justify-center bg-teal-lightest font-sans">
            <div className="bg-white rounded shadow p-6 m-4 w-2/5 lg:w-3/4 lg:max-w-lg ">
                <div className="mb-4">
                    <h1 className="text-grey-darkest">Todo List</h1>
                    <div className="flex mt-4">
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                               placeholder="Add Todo" />
                            <button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">
                                Add
                            </button>
                    </div>
                </div>

                <div>
                    <div className="flex mb-4 items-center">
                        <p className="w-full text-grey-darkest">Add another component to Tailwind Components</p>
                        <Button variant="contained" color="success" className="bg-black" >
                            Done
                        </Button>
                        <Button variant="outlined" color="error" >
                            Remove
                        </Button>
                    </div>
                    <div className="flex mb-4 items-center">
                        <p className="w-full line-through text-green">Submit Todo App Component to Tailwind
                            Components</p>
                        <button
                            className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-grey border-grey hover:bg-grey">Not
                            Done
                        </button>
                        <Button variant="outlined" color="error">
                            Remove
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoList;
