import React, { useMemo, useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import {
  TableCell,
  TableHead,
  Table,
  TableRow,
  Paper,
  TableSortLabel,
  IconButton,
  CircularProgress,
  Alert,
  useTheme
} from '@mui/material';
import { Delete, Block, DragIndicator } from '@mui/icons-material';
import { TableVirtuoso } from 'react-virtuoso';
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useBlockUserMutation
} from '../../../services/api';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
  useSortable
} from '@dnd-kit/sortable';

const defaultColumns = [
  { id: 'email', label: 'Email', sortable: true },
  { id: 'role', label: 'Role', sortable: true },
  { id: 'isBlocked', label: 'Blocked', sortable: true },
  { id: 'actions', label: 'Actions', sortable: false },
];

const SortableHeaderCell = ({ column, sortBy, sortDirection, handleSort }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: column.id });

  const style = {
    transform: transform ? `translateX(${transform.x}px)` : undefined,
    transition,
    cursor: 'move'
  };

  return (
    <TableCell
      ref={setNodeRef}
      style={style}
      sortDirection={sortBy === column.id ? sortDirection : false}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {column.sortable ? (
          <TableSortLabel
            active={sortBy === column.id}
            direction={sortDirection}
            onClick={() => handleSort(column.id)}
          >
            {column.label}
          </TableSortLabel>
        ) : (
          column.label
        )}
        <IconButton
          size="small"
          {...attributes}
          {...listeners}
          sx={{ ml: 1, cursor: 'move' }}
        >
          <DragIndicator fontSize="small" />
        </IconButton>
      </div>
    </TableCell>
  );
};

const UsersTable = () => {
  const {
    data: users = [],
    isLoading,
    error
  } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [blockUser] = useBlockUserMutation();
  const [columns, setColumns] = useState(defaultColumns);
  const [sortBy, setSortBy] = useState('email');
  const [sortDirection, setSortDirection] = useState('asc');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleSort = (columnId) => {
    if (sortBy === columnId) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(columnId);
      setSortDirection('asc');
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setColumns((cols) => {
        const oldIndex = cols.findIndex(c => c.id === active.id);
        const newIndex = cols.findIndex(c => c.id === over.id);
        return arrayMove(cols, oldIndex, newIndex);
      });
    }
  };

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      if (a[sortBy] === b[sortBy]) return 0;
      const modifier = sortDirection === 'asc' ? 1 : -1;
      return a[sortBy] > b[sortBy] ? modifier : -modifier;
    });
  }, [users, sortBy, sortDirection]);

  if (isLoading) return <CircularProgress sx={{ m: 4 }} />;
  if (error) return <Alert severity="error">Error loading users</Alert>;

  return (
    <Paper elevation={3} style={{ height: 400 }}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <TableVirtuoso
          data={sortedUsers}
          components={{
            Scroller: React.forwardRef((props, ref) => (
              <TableContainer component={Paper} {...props} ref={ref} />
            )),
            Table: (props) => (
              <Table {...props} sx={{ minWidth: 800 }} />
            ),
            TableHead: React.forwardRef((props, ref) => (
              <TableHead {...props} ref={ref} />
            ))
          }}
          fixedHeaderContent={() => (
            <SortableContext
              items={columns}
              strategy={horizontalListSortingStrategy}
            >
              <TableRow>
                {columns.map((column) => (
                  <SortableHeaderCell
                    key={column.id}
                    column={column}
                    sortBy={sortBy}
                    sortDirection={sortDirection}
                    handleSort={handleSort}
                  />
                ))}
              </TableRow>
            </SortableContext>
          )}
          itemContent={(index, user) => columns.map((column) => {
            switch (column.id) {
              case 'actions':
                return (
                  <TableCell key="actions">
                    <IconButton
                      onClick={() => deleteUser(user.id)}
                      aria-label="Delete user"
                    >
                      <Delete />
                    </IconButton>
                    <IconButton
                      onClick={() => blockUser({ 
                        id: user.id, 
                        isBlocked: !user.isBlocked 
                      })}
                      aria-label={user.isBlocked ? "Unblock user" : "Block user"}
                    >
                      <Block color={user.isBlocked ? "error" : "inherit"} />
                    </IconButton>
                  </TableCell>
                );
              case 'isBlocked':
                return (
                  <TableCell key={column.id}>
                    {user.isBlocked ? 'Yes' : 'No'}
                  </TableCell>
                );
              default:
                return (
                  <TableCell key={column.id}>
                    {user[column.id]}
                  </TableCell>
                );
            }
          })}
        />
      </DndContext>
    </Paper>
  );
};

export default UsersTable;