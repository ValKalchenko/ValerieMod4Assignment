import React, { useState, useEffect } from 'react';
import styles from './styles';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Meeting from '../../components/Meeting';

// import openDatabase hook
import { openDatabase } from "react-native-sqlite-storage";

// use hook to create database
const schedulerDB = openDatabase({name: 'Scheduler.db'});

const meetingTableName = 'meetings';

const MeetingsScreen = props => {

  const navigation = useNavigation();
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      // declare empty array that will store results of SELECT
      let results = [];
      // declare transaction that will execute SELECT
      schedulerDB.transaction(txn => {
        // execute SELECT
        txn.executeSql(
          `SELECT * FROM ${meetingTableName}`,
          [],
          // callback function to handle results from SELECT
          (_, res) => {
            // get the number of rows selected 
            let len = res.rows.length;
            console.log('Number of rows: ' + len);
            

            // if more than one row of data was selected
            if ( len > 0){
              // loop through the rows of data
              for (let i = 0; i < len; i++){
                // push a row of data at a time onto results array
                let item = res.rows.item(i);

                results.push({
                  id: item.id,
                  title: item.title,
                  location: item.location,
                  date: item.date,
                });
              }
              // assign results array to lists state variable
              setMeetings(results);
            } else {
              // if no rows of data were selected
              // assign empty array to lists state variable
              setMeetings([]);
            }
          },
          error => {
            console.log('Error getting meetings ' + error.message);
          },
        )
      });
    });
    return listener;
  });

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={meetings}
          renderItem={({item}) => <Meeting post={item} />}
        />
      </View>
        <View style={styles.bottom}>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('Add Meeting')}
                >
                <Text style={styles.buttonText}>Add Meeting</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default MeetingsScreen;