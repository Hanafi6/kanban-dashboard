import { motion, AnimatePresence } from 'framer-motion';
import { useTaskStore } from '../store/Store';
import { useEffect, useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import '../Styels/Form.css';
import type { Task } from '../types/Tyeps';

const AddTaskModal = ({ isEditing }) => {
    const { isModalOpen, closeModal, selectTaske } = useTaskStore();
    const { createTask, updateTask } = useTasks();
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    useEffect(() => {
        if (selectTaske) {
            setTitle(selectTaske.title);
            setDesc(selectTaske.description || '');
        } else {
            setTitle('');
            setDesc('');
        }
    }, [selectTaske, isModalOpen, isEditing]);

    if (!isModalOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();


        if (!title.trim()) return;

        if (selectTaske && isEditing) {
            updateTask({
                ...selectTaske,
                title: title,
                description: desc,
            });
        } else {
            const newTask: Task = {
                id: crypto.randomUUID(),
                title: title,
                description: desc,
                column: 'backlog'
            };
            createTask(newTask);

        }

        setTitle('');
        setDesc('');
        closeModal();
    };


    return (
        <AnimatePresence key={'form'}>
            <div className="modal-overlay" onClick={closeModal}>
                <motion.div
                    key='modal'
                    className="modal-content"
                    transition={{ duration: 0.3, ease: 'linear', type: 'spring', stiffness: 300, damping: 20 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="modal-title">{selectTaske && isEditing ? 'Edit Task' : 'Add Task'}</h2>

                    <form onSubmit={handleSubmit} className="task-form">
                        <div className="input-group">
                            <label>Title</label>
                            <input
                                type="text"
                                value={title || ''}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Title of the task..."
                                autoFocus
                            />
                        </div>

                        <div className="input-group">
                            <label>Description</label>
                            <textarea
                                value={desc || ''}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder="More details about the task..."
                                rows={4}
                            />
                        </div>

                        <div className="modal-actions">
                            <button type="button" className="btn-cancel" onClick={closeModal}>
                                Cancel
                            </button>
                            <button type="submit" className="btn-submit">
                                {selectTaske && isEditing ? 'Update' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AddTaskModal;
