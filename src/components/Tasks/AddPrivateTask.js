import React, { useState, useEffect} from 'react';
import { database } from "../../firebase-config";
import {doc, collection,updateDoc, onSnapshot, addDoc, query, orderBy, deleteDoc} from "firebase/firestore";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { getAuth } from "firebase/auth";
import CheckIcon from '@mui/icons-material/Check';


function AddPrivateTask() {
    const auth = getAuth();
    const user = auth.currentUser;
    const [input, setInput] = useState("")
    const docRef = doc(database, "users", user.uid); // this line creates reference the specific user  
    //Getting Tasks
    const [tasks, setTasks] = useState([])

    useEffect(()=> {      
      const q = query(collection(docRef, "tasks"),  orderBy("timestamp", "desc")); // here we create query collection for each specific user  
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setTasks(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
        setInput("")
      });
        return () => unsubscribe()
   }, [])   
  
//Add task
    const saveClick = (e) => {
      e.preventDefault()
      if(input) {
        addDoc(collection(docRef, "tasks"), {
          name: input,
          timestamp: new Date(),
          completed: false,
        }).catch(err => console.error(err))
      }
    }
  
//Remove task
    async function deleteDocument(id) {
        await deleteDoc(doc(docRef, "tasks", id));
    }
    
  //Update tasks name 
  async function updateDocument(id) {
    const itemRef = doc(docRef, "tasks", id);
    let name =  prompt("What would you like to update it to?")
    updateDoc(itemRef, {
      name: name,
      timestamp: new Date()
    })
  }

  //Mark completed
  async function handleChange(id) {
    const itemRef = doc(docRef, "tasks", id);      
    updateDoc(itemRef, {
      completed: true,
    })
    alert("Well done!! The task is completed")
  }

//HTML 
    return (
      <div className="w-full h-screen bg-gray-100 flex items-center justify-center flex-col">
        <h2 className="text-2xl text-gray-800 font-bold mb-6">Private tasks</h2>
            <div className="w-2/3 border shadow-md p-7">
      
          <div className="w-full ">
              {tasks.map(task => (
                <div className="border-b w-full h-16 flex items-center justify-between" key={task.id}>
                  <div className='listsView'>
                  {task.name}
                    <IconButton onClick={() => updateDocument(task.id)} sx={{ color: "#def0f2" }}>
                      <EditIcon/>
                    </IconButton>
                    <IconButton onClick={() => deleteDocument(task.id)}>
                        <DeleteIcon sx={{ color: "#eaabba" }}/>
                    </IconButton>
                    <IconButton onClick={() => handleChange(task.id)}>
                      <CheckIcon/>
                    </IconButton >
                  </div>
            </div>
              ))}          
          </div>
           <div> 
            <form className="flex items-center justify-between mb-7">
                  <input 
                    type="text" name="item" 
                    className="w-2/3 h-10 p-3 outline-none border border-gray-500"
                    value={input}
                    placeholder="Add new task"
                    onChange={e => setInput(e.target.value)}
                    />
                    <IconButton onClick={saveClick} sx={{ color: "#def0f2" }}>
                        <SaveIcon/>
                    </IconButton>
             </form>
            </div>    
        </div>
      </div>
    );
}
export default AddPrivateTask;
