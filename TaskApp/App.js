import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

export default function App() {

  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');


  function addTask() {
    if (taskText === '') {
      return; 
    }
    let newTask = {
      id: Math.random().toString(), 
      text: taskText,
      done: false
    };
    setTasks([...tasks, newTask])
    setTaskText(''); 
  }

  function toggleTask(id) {
    let updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, done: !task.done };
      }
      return task;
    });
    setTasks(updatedTasks);
  }


  function deleteTask(id) {
    let remainingTasks = tasks.filter(task => task.id !== id);
    setTasks(remainingTasks);
  }


  function renderItem({ item }) {
    return (
      <View style={styles.taskItem}>
        <Text
          style={item.done ? styles.taskDone : styles.taskText}
          onPress={() => toggleTask(item.id)}
        >
          {item.text}
        </Text>
        <TouchableOpacity onPress={() => toggleTask(item.id)}>
          <Text style={styles.checkbox}>{item.done ? '[x]' : '[ ]'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTask(item.id)}>
          <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {}
      <TextInput
        style={styles.input}
        placeholder="Type a task"
        value={taskText}
        onChangeText={setTaskText}
      />
      <Button title="Add Task" onPress={addTask} />

      {}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 30
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 10
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 5
  },
  taskText: {
    flex: 1,
    fontSize: 16
  },
  taskDone: {
    flex: 1,
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: 'gray'
  },
  checkbox: {
    marginRight: 10,
    fontSize: 18
  },
  delete: {
    color: 'red'
  }
});
