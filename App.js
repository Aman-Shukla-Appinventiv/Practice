import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Color } from './utils/constants';
import RealmApp from "./Realm/index"
import RealmContactSync from './RealmContactSync/index'
import FlatlistTest from './Flatlist/FlatlistExtraData';
const App = () => {
  return (
    <SafeAreaView style = {styles.mainConatainer}>
      {/* <RealmContactSync  /> */}
      {/* <RealmApp /> */}
      <FlatlistTest />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainConatainer: {
    flex: 1,
    backgroundColor: Color.grey
  }
})
export default App;
