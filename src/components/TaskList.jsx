import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getTasks, reset } from '../features/tasks/taskSlice';
import TaskItem from './TaskItem';
import Spinner from './Spinner';

const TaskList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks, isLoading, isError, message } = useSelector((state) => state.tasks);

  //Dispatch action when page load
  useEffect(() => {
    if (isError) console.log(message);
    dispatch(getTasks());
    //This runs right before the component unmounts or before the effect re-runs
    return () => dispatch(reset()); //Cleanup when component unmounts
  }, [navigate, isError, message, dispatch]);

  return isLoading ? (
    <Spinner />
  ) : (
    <section className="content">
      {tasks.length > 0 ? (
        <div className="tasks">
          {/* Map through the array and forward each element */}
          {tasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>
      ) : (
        <div>No task available yet</div>
      )}
    </section>
  );
};

export default TaskList;
