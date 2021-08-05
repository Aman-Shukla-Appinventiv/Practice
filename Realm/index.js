import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView
} from 'react-native';
import {vh, vw, normalize} from '../utils/dimension';
import Icon from 'react-native-vector-icons/Ionicons';
import {Color} from '../utils/constants';
import Realm from 'realm';
import Input from "../components/CustomTextInput"

export default function RealmApp() {
  const ref = useRef(null);
  const [modalVissible, setModalVissible] = React.useState(false);
  const [todo, setTodo] = React.useState('');
  const [refresh, setRefresh] = React.useState(false);

  const realm = new Realm({
    path: 'myrealm',
    schema: [
      {
        name: 'todoSchema',
        properties: {
          id: 'int',
          task: 'string',
        }
      }
    ],
    deleteRealmIfMigrationNeeded: true,
  });


  const tasks = realm.objects("todoSchema");
  

  const handleFinalAdd = () => {
    realm.write(() => {
      realm.create('todoSchema', {
        id: 1,
        task: ref.current.getData(),
      });
    });
  };
 

  const handleChangeText = text => {
    setTodo(text);
  };
  const handleDelete = (taskName) => {
    realm.write(() => {
      realm.delete(tasks.filtered(`task == \'${taskName}\'`));
      setRefresh(!refresh)
    })
  }

  return (
    <View style={styles.mainContainer}>
      {/*------- Heading -------- */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Todo List</Text>
      </View>

        {tasks.length == 0
         ? null
        : <ScrollView style = {styles.scrollView}>
          {tasks.map((element) => {
            return(
              <TouchableOpacity 
              key = {(Math.random()+Math.random()).toString()}
              onPress = {() => {handleDelete(element.task)}}
              style = {styles.eachBox}>
                <Text style = {styles.name}>{element.task}</Text>
              </TouchableOpacity>
            )
          })}
          </ScrollView>
        
        }

      {/*------- Modal -------- */}

      <Modal visible={modalVissible} transparent={true}>
        <TouchableOpacity
          onPress={() => {
            setModalVissible(false);
            setTodo('');
          }}
          style={styles.modalMainConatiner}>
          <View style={styles.content}>
            <Text>Enter the Task</Text>
           
            <Input
              placeholder="Enter the Task"
              style={styles.input}
              ref = {ref}
            />

            <TouchableOpacity
              onPress={() => {
                handleFinalAdd()
                setModalVissible(false);
                setTodo('');
              }}
              style={styles.add}>
              <Text>Add</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/*------- Add Button -------- */}

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          setModalVissible(true);
        }}>
        <Icon
          name="add-outline"
          size={normalize(35)}
          color={Color.headingText}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.background,
  },
  header: {
    height: vh(40),
    backgroundColor: Color.grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: normalize(25),
    fontWeight: 'bold',
    color: Color.headingText,
  },
  modalMainConatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.modalBackground,
  },
  content: {
    backgroundColor: Color.grey,
    width: '80%',
    padding: normalize(20),
    alignItems: 'center',
  },
  add: {
    backgroundColor: Color.headingText,
    width: '100%',
    height: vh(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: normalize(20),
    paddingVertical: vh(10),
    paddingHorizontal: vw(10),
    borderWidth: normalize(1),
    borderColor: Color.headingText,
    width: '100%',
    margin: normalize(10),
  },
  addBtn: {
    backgroundColor: Color.grey,
    width: vw(50),
    height: vh(50),
    margin: normalize(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(30),
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  scrollView: {
    flex: 1, 
  },
  eachBox: {
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
    margin: 10,
    padding: 5
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
    margin: 10
  },
});
