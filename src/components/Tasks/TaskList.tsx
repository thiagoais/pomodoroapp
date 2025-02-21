import React, { useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import TaskItem from "./TaskItem";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  tasks?: Task[];
  onTasksChange?: (tasks: Task[]) => void;
}

const TaskList = ({
  tasks: propTasks,
  onTasksChange = () => {},
}: TaskListProps) => {
  const defaultTasks: Task[] = [
    { id: "1", text: "Complete the Pomodoro timer", completed: false },
    { id: "2", text: "Add task animations", completed: true },
    { id: "3", text: "Implement drag and drop", completed: false },
  ];

  const [tasks, setTasks] = useState<Task[]>(propTasks || defaultTasks);
  const [newTaskText, setNewTaskText] = useState("");
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      text: newTaskText,
      completed: false,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    onTasksChange(updatedTasks);
    setNewTaskText("");
  };

  const handleDelete = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    onTasksChange(updatedTasks);
  };

  const handleComplete = (taskId: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task,
    );
    setTasks(updatedTasks);
    onTasksChange(updatedTasks);
  };

  const handleReorder = (reorderedTasks: Task[]) => {
    setTasks(reorderedTasks);
    onTasksChange(reorderedTasks);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-xl bg-card/50 backdrop-blur-lg border border-border shadow-lg">
      <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
        <Input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </form>

      <Reorder.Group
        axis="y"
        values={tasks}
        onReorder={handleReorder}
        className="space-y-2"
      >
        <AnimatePresence>
          {tasks.map((task) => (
            <Reorder.Item
              key={task.id}
              value={task}
              onDragStart={() => setDraggedTaskId(task.id)}
              onDragEnd={() => setDraggedTaskId(null)}
            >
              <TaskItem
                id={task.id}
                text={task.text}
                completed={task.completed}
                onComplete={handleComplete}
                isDragging={draggedTaskId === task.id}
                onDelete={() => handleDelete(task.id)}
              />
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>

      {tasks.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-muted-foreground py-8"
        >
          No tasks yet. Add one above!
        </motion.p>
      )}
    </div>
  );
};

export default TaskList;
