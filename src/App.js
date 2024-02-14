import { DeleteIcon } from '@chakra-ui/icons';
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  IconButton,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

function App() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = (e) => {
    e.preventDefault();

    if (newTask.length > 0) {
      setTasks((prevState) => [
        ...prevState,
        { text: newTask, newTask, isChecked: false },
      ]);
      setNewTask('');
    }
  };

  const updateTask = (i, checked) => {
    let newTasks = [...tasks];
    newTasks[i].isChecked = checked;
    setTasks(newTasks);
  };

  const removeTask = (i) => {
    const newTasks = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  };

  return (
    <Flex w='100%' h='100vh'>
      <Flex w='100%' flexDir='column' ml='20%' mr='20%' mt='5%' color='white'>
        <Text fontSize={30} fontWeight={700}>
          App
        </Text>
        <Flex mt='5%'>
          <FormControl onSubmit={addTask}>
            <Input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder='Add Task'
              w={'50%'}
              variant='flushed'
            />
            <Button onClick={addTask} ml={5} bg={'blue.400'} color={'white'}>
              Add Task
            </Button>
          </FormControl>
        </Flex>
        <Tabs mt='5%' w='100%'>
          <TabList>
            <Tab>Incomplete Task</Tab>
            <Tab>completed Task</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Text>
                {tasks.map((task, i) =>
                  !task.isChecked ? (
                    <TaskItem
                      key={i}
                      updateTask={updateTask}
                      removeTask={removeTask}
                      task={task}
                      i={i}
                    />
                  ) : null
                )}
              </Text>
            </TabPanel>
            <TabPanel>
              <Text>
                {' '}
                {tasks.map((task, i) =>
                  task.isChecked ? (
                    <TaskItem
                      key={i}
                      removeTask={removeTask}
                      updateTask={updateTask}
                      task={task}
                      i={i}
                    />
                  ) : null
                )}
              </Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
}

const TaskItem = ({ task, i, updateTask, removeTask }) => {
  return (
    <Checkbox
      colorScheme='green'
      mb={10}
      w='100%'
      onChange={(e) => updateTask(i, e.target.checked)}
      flexDir='row'
      isChecked={task.isChecked}>
      <Flex w='100%' flexDir='row'>
        <Text color='white' alignSelf='center'>
          {task.text}
        </Text>
        <IconButton
          bg='red.600'
          pos={'absolute'}
          onClick={() => removeTask(i)}
          right={0}
          icon={<DeleteIcon />}
        />
      </Flex>
    </Checkbox>
  );
};

export default App;
