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

    const [showConfirm, setShowConfirm] = useState(false);

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

    const isDirty = isEditing && selectTaske && (
        title !== (selectTaske.title || '') ||
        desc !== (selectTaske.description || '')
    );


    const closeModalWithConfirm = () => {
        if (isDirty) {
            setShowConfirm(true);
        } else {
            closeModal();
        }
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();


        if (!title.trim()) return;

        if (selectTaske) {
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
                            <button type="button" className="btn-cancel" onClick={closeModalWithConfirm}>
                                Cancel
                            </button>
                            <button type="submit" className="btn-submit">
                                {selectTaske && isEditing ? 'Update' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
            <AnimatePresence key={'confirm'}>
                {showConfirm && (
                    <motion.div
                        key={'confirm'}
                        className="confirm-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="confirm-box">
                            <div className="confirm-buttons">
                                <button onClick={() => setShowConfirm(false)} className="btn-stay">كمل تعديل</button>
                                <button onClick={closeModal} className="btn-leave">اخرج وإرمي التعديلات</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </AnimatePresence>
    );
};

export default AddTaskModal;