import React, { useEffect, useState } from 'react'
import { ListItem, Avatar } from 'react-native-elements'
import { FlatList, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

export default function App() {

  const [list, setList] = useState([])

  const keyExtractor = (item, index) => index.toString()
  const renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <ScrollView style={styles.scrollView}>
        <ListItem.Content>
          <ListItem.Title>{item.userId}</ListItem.Title>
          <ListItem.Subtitle>{item.id}</ListItem.Subtitle>
          <ListItem.Subtitle>{item.title}</ListItem.Subtitle>
          <ListItem.Subtitle>{item.completed}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ScrollView>
    </ListItem>
  )


  useEffect(() => {
    const BASE_URL = 'https://jsonplaceholder.typicode.com';
    getTodo(BASE_URL)
  }, []);

  async function getTodo(BASE_URL) {
    try {
      const res = await axios.get(`${BASE_URL}/todos?_page=1&_limit=10`);
      const todos = res.data;
      setList(todos)
      return todos;
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <FlatList
      style={styles.container}
      keyExtractor={keyExtractor}
      data={list}
      renderItem={renderItem}
    />
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff'
  }
});