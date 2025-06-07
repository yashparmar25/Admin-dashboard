import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  TextField,
  Button,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

const initialColumns = {
  todo: {
    id: 'todo',
    title: 'To Do',
    items: [
      { id: '1', content: 'Design new dashboard layout' },
      { id: '2', content: 'Implement user authentication' },
    ],
  },
  inProgress: {
    id: 'inProgress',
    title: 'In Progress',
    items: [
      { id: '3', content: 'Create responsive tables' },
      { id: '4', content: 'Add data visualization charts' },
    ],
  },
  done: {
    id: 'done',
    title: 'Done',
    items: [
      { id: '5', content: 'Setup project structure' },
      { id: '6', content: 'Install dependencies' },
    ],
  },
};

const Kanban = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [newTask, setNewTask] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('todo');

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const addTask = () => {
    if (!newTask.trim()) return;

    const newItem = {
      id: Date.now().toString(),
      content: newTask,
    };

    setColumns({
      ...columns,
      [selectedColumn]: {
        ...columns[selectedColumn],
        items: [...columns[selectedColumn].items, newItem],
      },
    });

    setNewTask('');
  };

  const deleteTask = (columnId, itemId) => {
    setColumns({
      ...columns,
      [columnId]: {
        ...columns[columnId],
        items: columns[columnId].items.filter((item) => item.id !== itemId),
      },
    });
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Kanban Board
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          label="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          size="small"
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addTask}
          disabled={!newTask.trim()}
        >
          Add Task
        </Button>
      </Box>

      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{ display: 'flex', gap: 2, height: 'calc(100vh - 250px)' }}>
          {Object.entries(columns).map(([columnId, column]) => (
            <Paper
              key={columnId}
              sx={{
                flex: 1,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 300,
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                {column.title}
              </Typography>
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      flex: 1,
                      overflowY: 'auto',
                      '&::-webkit-scrollbar': {
                        width: '8px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        borderRadius: '4px',
                      },
                    }}
                  >
                    {column.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{ mb: 1 }}
                          >
                            <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}
                              >
                                <Typography>{item.content}</Typography>
                                <IconButton
                                  size="small"
                                  onClick={() => deleteTask(columnId, item.id)}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Paper>
          ))}
        </Box>
      </DragDropContext>
    </Box>
  );
};

export default Kanban;