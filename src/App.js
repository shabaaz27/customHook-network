import React, { useEffect, useState,useCallback } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
const [tasks,setTasks] = useState([])




  const {isLoading,error,sendRequest : fetchTasks}  = useHttp(transformTasks)

  
 
  useEffect(() => {
    const transformTasks = (taskObj) =>{
      const loadedTasks = [];
      
      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }
    
      setTasks(loadedTasks);
    }
    fetchTasks(
      {url:'https://instant-ground-308109-default-rtdb.firebaseio.com/tasks.json'}
      ,transformTasks
      );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
