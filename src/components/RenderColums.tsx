import { Grid } from '@mui/material'
import Column from './Column'
import type { Task } from '../types/Tyeps'
import { DragDropContext } from '@hello-pangea/dnd';

type RenderColumnsProps = {
    COLUMNS: { id: 'backlog' | 'in_progress' | 'review' | 'done'; title: string }[];
    tasks: Task[];
    handleDragEnd: (result: any) => void;
};

function RenderColums({ COLUMNS, tasks, handleDragEnd }: RenderColumnsProps) {
    return (

        <DragDropContext onDragEnd={handleDragEnd}>
            <Grid
                container
                spacing={2}
                sx={{
                    margin: 0,
                    width: "100%",
                    flexWrap: { xs: 'wrap', md: 'nowrap' },
                    justifyContent: "center",
                    background: 'transparent',
                    pb: 2
                }}
            >
                {COLUMNS.map((col) => (
                    <Grid xs={12} sm={6} md={3} key={col.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Column
                            id={col.id}
                            title={col.title}
                            tasks={tasks.filter(t => t.column === col.id)}
                        />
                    </Grid>
                ))}
            </Grid>
        </DragDropContext>
    )
}

export default RenderColums