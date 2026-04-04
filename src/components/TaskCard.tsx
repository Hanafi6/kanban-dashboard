import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Paper, Typography, Box, IconButton, Stack } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import type { Task } from "../types/Tyeps";

interface TaskCardProps {
    task: Task;
    index: number;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}




const TaskCard: React.FC<TaskCardProps> = ({ task, index, onEdit, onDelete }) => {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <Box
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    sx={{
                        mb: 2,
                        transform: snapshot.isDragging ? "scale(1.05)" : "scale(1)",
                        transition: "transform 0.1s ease",
                        zIndex: snapshot.isDragging ? 1000 : 1,
                    }}
                >
                    <Paper
                        sx={{
                            p: 2,
                            bgcolor: "var(--bg)",
                            border: "1px solid",
                            borderColor: snapshot.isDragging ? "var(--accent)" : "var(--border)",
                            boxShadow: snapshot.isDragging ? "0 10px 20px rgba(0,0,0,0.2)" : "var(--shadow)",
                            borderRadius: "10px",
                            cursor: snapshot.isDragging ? "grabbing" : "grab",
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            "&:hover": {
                                borderColor: "var(--accent)",
                            }
                        }}
                    >
                        <Typography sx={{ fontWeight: 600, color: 'var(--text)' }}>
                            {task.title}
                        </Typography>

                        <Stack direction="row" spacing={0.5}>
                            <IconButton
                                size="small"
                                onClick={() => onEdit?.(task)}
                                sx={{
                                    color: 'var(--text)',
                                    opacity: 0.7,
                                    "&:hover": { color: '#2196f3', opacity: 1 }
                                }}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>

                            <IconButton
                                size="small"
                                onClick={() => onDelete?.(task.id)}
                                sx={{
                                    color: 'var(--text)',
                                    opacity: 0.7,
                                    "&:hover": { color: '#f44336', opacity: 1 }
                                }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Stack>
                    </Paper>
                </Box>
            )}
        </Draggable>
    );
};

export default React.memo(TaskCard);