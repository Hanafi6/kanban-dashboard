import { useTasks } from './hooks/useTasks';
import { Box, Typography } from '@mui/material';
import { useTaskStore } from './store/Store';
import RenderColums from './components/RenderColums';

import { Fab } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

import styels from './App.module.css'
import AddTaskModal from './components/Form';
import { AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';

const { continer } = styels
const COLUMNS: { id: 'backlog' | 'in_progress' | 'review' | 'done'; title: string }[] = [
  { id: 'backlog', title: 'Backlog' },
  { id: 'in_progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

function App() {
  const { openModal, isModalOpen, searchQuery, IsEdit } = useTaskStore();
  const { tasks, isLoading, updateTask } = useTasks();


  const filteredTasks = useMemo(() => {
    return tasks.filter(task =>

      task?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task?.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tasks, searchQuery]);


  // const newTasks = tasks.map(task => 
  //   task.id === updatedId ? { ...task, title: "New Title" } : task
  // );
  // setTasks(newTasks);

  const handleDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      if (source.index === destination.index) return;

      const columnTasks = tasks.filter(t => t.column === source.droppableId);
      const updatedTasks = Array.from(columnTasks);

      const [reorderedItem] = updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, reorderedItem);

    } else {
      const draggedTask = tasks.find(t => t.id === draggableId);
      if (draggedTask) {
        updateTask({ ...draggedTask, column: destination.droppableId });
      }
    }
  };
  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <div className={continer}>
      <Typography variant="h4" gutterBottom sx={{ background: 'var(--bg)', boxShadow: 'var(--shadow)' }}>My Kanban Board</Typography>
      <Box sx={{ display: 'flex', gap: 2, background: 'var(--bg)', boxShadow: 'var(--shadow)', padding: 2, borderRadius: 1 }}>
        <RenderColums handleDragEnd={handleDragEnd} COLUMNS={COLUMNS} tasks={filteredTasks} />
      </Box>
      <Fab
        color="primary"
        aria-label="add"
        onClick={openModal}
        sx={{ position: 'fixed', bottom: 32, right: 32, bgcolor: 'var(--accent)' }}
      >
        <AddIcon />
      </Fab>


      <AnimatePresence mode='sync'>
        {isModalOpen && <AddTaskModal isEditing={IsEdit} />}
      </AnimatePresence>
    </div >
  );
}

export default App