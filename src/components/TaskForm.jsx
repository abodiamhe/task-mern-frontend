import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createTask } from '../features/tasks/taskSlice';
import { useNavigate } from 'react-router-dom';

const TaskForm = () => {
  const [text, setTest] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Dispatch an action that send task input to slice
  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createTask({ text })); //send the entered data to create task
    setTest(''); //Reset the useState
    navigate('/alltasks'); //navigate to task list page when user submit
  };

  return (
    <>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="text" style={{ fontWeight: 'bolder' }}>
              Enter Task
            </label>
            <input type="text" id="text" value={text} onChange={(e) => setTest(e.target.value)} />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Add Task
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default TaskForm;
