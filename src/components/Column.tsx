import React from "react";
import type { ColumnProps, Task } from "../types/Tyeps";
import { Droppable } from "@hello-pangea/dnd";
import { Paper, Typography, Box } from "@mui/material";
import TaskCard from "./TaskCard"; // استيراد الكامبوننت الجديد
import { useTasks } from "../hooks/useTasks";
import { useTaskStore } from "../store/Store";

const columnColors = {
    backlog: "#ff9800",
    in_progress: "#2196f3",
    done: "#4caf50",
    review: "#9c27b0"
};

const Column: React.FC<ColumnProps> = React.memo(({ title, id, tasks }) => {
    const borderColor = columnColors[id as keyof typeof columnColors] || "var(--border)";

    const { deleteTask } = useTasks();
    const { openModal, isModalOpen, setSelectTaske } = useTaskStore();


    const onEdit = (task: Task) => {
        if (!isModalOpen) {
            setSelectTaske(task, true);
            openModal(task);
        }
    }

    const onDelete = (taskId: string) => {
        deleteTask(taskId);
    }
    return (
        <Paper
            sx={{
                p: 2,
                bgcolor: "var(--social-bg)",
                border: "2px solid",
                borderColor: borderColor,
                borderRadius: "16px",
                width: "100%",
                maxWidth: "350px",
                minWidth: "280px",
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    mb: 2,
                    fontWeight: "bold",
                    borderLeft: `5px solid ${borderColor}`,
                    pl: 1
                }}
            >
                {title}
            </Typography>

            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <Box
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        sx={{
                            flexGrow: 1,
                            transition: "all 0.3s ease",
                            bgcolor: snapshot.isDraggingOver ? "var(--accent-bg)" : "transparent",
                            borderRadius: "12px",
                            minHeight: "150px",
                            maxHeight: "400px",
                            p: 1
                        }}
                    >
                        {tasks.map((task, index) => (
                            <TaskCard key={task.id} task={task} index={index} onDelete={onDelete} onEdit={onEdit} />
                        ))}
                        {provided.placeholder}
                    </Box>
                )}
            </Droppable>
        </Paper>
    );
});

export default Column;