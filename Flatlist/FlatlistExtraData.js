import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

let DATA = [
  {id: '1', name: 'aman'},
  {id: '2', name: 'vishal'},
  {id: '3', name: 'abhishek'},
  {id: '4', name: 'ashutosh'},
  {id: '5', name: 'narendra'},
];

const FlatlistTest = () => {
  const [data, setData] = useState(DATA);

  const handlePress = id => {
    setData(
      data.map(element => {
        if (id == element.id) {
          return {id: id, name: 'Changed'};
        }
        return element;
      }),
    );

    console.log('Data: ', data);
  };
  const renderData = ({item, index}) => (
    <TouchableOpacity
      onPress={() => {
        handlePress(item.id);
      }}
      style={styles.eachBox}>
      <Text style={styles.names}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={data}
        renderItem={renderData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  eachBox: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginVertical: 10,
    padding: 10,
  },
  names: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
  },
});

export default FlatlistTest;
