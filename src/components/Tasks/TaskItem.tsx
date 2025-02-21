import React from "react";
import { motion } from "framer-motion";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

interface TaskItemProps {
  id?: string;
  text?: string;
  completed?: boolean;
  onComplete?: (id: string) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  isDragging?: boolean;
  onDelete?: () => void;
}

const TaskItem = ({
  id = "1",
  text = "Complete this task",
  completed = false,
  onComplete = () => {},
  onDragStart = () => {},
  onDragEnd = () => {},
  isDragging = false,
  onDelete = () => {},
}: TaskItemProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{
        opacity: 0,
        x: -100,
        transition: {
          duration: 0.3,
          ease: "anticipate",
        },
      }}
      className={cn(
        "flex items-center gap-4 p-4 rounded-lg bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "border border-border hover:border-border/80 transition-colors",
        isDragging && "cursor-grabbing shadow-lg",
        completed && "opacity-50",
      )}
    >
      <button
        className="cursor-grab hover:cursor-grabbing p-1 text-muted-foreground hover:text-foreground transition-colors"
        onMouseDown={onDragStart}
        onMouseUp={onDragEnd}
      >
        <GripVertical size={20} />
      </button>

      <Checkbox
        id={`task-${id}`}
        checked={completed}
        onCheckedChange={() => onComplete(id)}
        className="data-[state=checked]:bg-primary"
      />

      <label
        htmlFor={`task-${id}`}
        className={cn(
          "flex-1 text-sm font-medium cursor-pointer",
          completed && "line-through text-muted-foreground",
        )}
      >
        {text}
      </label>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-destructive"
        onClick={onDelete}
      >
        <Trash2 size={18} />
      </Button>
    </motion.div>
  );
};

export default TaskItem;
