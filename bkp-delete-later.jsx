const newStateTask = oldStateTasks.reduce((acc, item, index) => {
  index !== indexTask && (acc = [...acc, item]);
  return acc;
}, []);
