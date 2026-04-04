import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/axiosInstance';
import type { Task } from '../types/Tyeps';

export const useTasks = (search: string = '') => {
    const queryClient = useQueryClient();

    const { data: tasks = [], isLoading } = useQuery({
        queryKey: ['tasks', search],
        queryFn: async () => {
            const response = await api.get<Task[]>(`/tasks`);
            return response.data;
        },
    });

    const createTaskMutation = useMutation({
        mutationFn: (newTask: Omit<Task, 'id'>) => api.post('/tasks', newTask),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
    });

    const updateTaskMutation = useMutation({
        mutationFn: (updatedTask: Task) => api.put(`/tasks/${updatedTask.id}`, updatedTask),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
    });

    const deleteTaskMutation = useMutation({
        mutationFn: (id: string) => api.delete(`/tasks/${id}`),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
    });

    return {
        tasks,
        isLoading,
        createTask: createTaskMutation.mutate,
        updateTask: updateTaskMutation.mutate,
        deleteTask: deleteTaskMutation.mutate,
    };
};