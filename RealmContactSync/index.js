import Contacts from 'react-native-contacts';
import React, {useState} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Realm from 'realm';

export default function RealmContactSync() {
  const [data, setData] = useState(null);
    const mySchema = {
          name: 'Task',
          properties: {
            name: 'string',
            number: 'string',
            email: 'string',
          },
        };
    
        const realm = new Realm({
          path: 'myrealm',
          schema: [mySchema],
          deleteRealmIfMigrationNeeded: true,
        });
        
  const getContacts = () => {
    if (Platform.OS === 'ios') {
      Contacts.getAll().then(contacts => {
        console.log("Contacts : ", contacts)
        setData(contacts);
      });
    } else if (Platform.OS == 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
      }).then(
        Contacts.getAll().then(contacts => {
          setData(contacts);
        }),
      );
    }
  };

  const syncWithRealm = () => {
          realm.write(() => {
            data.map((item, i) => {
              realm.create('Task', {
                name: item.givenName + ' ' + item.familyName,
                number: item.phoneNumbers[0].number,
                email: item.emailAddresses.length == 0 ?  "null" : item.emailAddresses[0].email,
              });
            });
          });
  }

  const tasks = realm.objects('Task');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={getContacts} style={styles.button}>
        <Text>Get Contacts</Text>
      </TouchableOpacity>
      {data == null ? null : (
        <ScrollView style={styles.scrollView}>
          {data.map((element) => {
            return(
              <View style = {styles.eachBox}>
                <Text style = {styles.name}>{element.givenName} {element.familyName}</Text>
                <Text style = {styles.phone}>{element.phoneNumbers[0].number}</Text>
              </View>
            )
          })}
        </ScrollView>
      )}

<TouchableOpacity onPress={syncWithRealm} style={styles.button}>
        <Text>Sync With Realm</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
          {tasks.map((element) => {
            return(
              <View style = {styles.eachBox}>
                <Text style = {styles.name}>{element.name}</Text>
                <Text style = {styles.phone}>{element.number}</Text>
                <Text style = {styles.email}>{element.email}</Text>
              </View>
            )
          })}
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: '#00595A',
    width: '80%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 10,
  },
  scrollView: {
    backgroundColor: '#bcbcbc',
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
    fontSize: 20
  },
  phone: {
    color: "#555"
  }
});
