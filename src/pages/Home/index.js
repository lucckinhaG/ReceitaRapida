import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Alert, Keyboard, FlatList } from 'react-native';

import {Ionicons} from '@expo/vector-icons'

import Logo from '../../components/logo';
import api from '../../services/api';
import { FoodList } from '../../components/foodlist';

import { useNavigation } from '@react-navigation/native';

import { Text as MotiText } from 'moti'

export default function Home() {
  const navigation = useNavigation();

  const [inputValue, setInputValue] = useState('');
  const [foods, setFoods] = useState([]);

  useEffect( () => {
    
    async function fetchApi(){
      const response = await api.get('/foods')
      setFoods(response.data)
    }

    fetchApi();

  }, [])

  function handleSearch(){
    if(!inputValue) return;

    let input = inputValue;
    setInputValue('');
    navigation.navigate('Search', {name: input})

  }

 return (
   <SafeAreaView style={styles.container}>
    <Logo/>
    <MotiText 
    style={styles.title}
    from={{opacity: 0,
    translateY: 15,
    }}
    animate={{
      opacity: 1,
      translateY: 0
    }}
    transition={{
      delay: 100,
      type: 'timing',
      duration: 650
    }}
    >Encontre a receita</MotiText>

    <MotiText 
    style={styles.title}
    from={{opacity: 0,
      translateY: 18,
      }}
      animate={{
        opacity: 1,
        translateY: 0
      }}
      transition={{
        delay: 200,
        type: 'timing',
        duration: 850
      }}
    >que combina com você</MotiText>

    <View style={styles.form}>
      <TextInput
        placeholder='Digite o nome da comida...'
        style={styles.input}
        value={inputValue}
        onChangeText={ ( text ) => setInputValue( text ) }
      />
      <TouchableOpacity onPress={handleSearch}>
        <Ionicons name="search" size={28} color={'#FFDB1B'}/>
      </TouchableOpacity>
    </View>

    <FlatList
      data={foods}
      keyExtractor={ (item) => String(item.id) }
      renderItem={ ({ item }) => <FoodList data={item} />}
      showsVerticalScrollIndicator={false}
    />
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F3F9FF',
        paddingTop: 40,
        paddingHorizontal: 14,
    },
    title:{
      fontSize: 26,
      fontWeight: 'bold',
      color: '#0e0e0e'
    },
    form:{
      width: '100%',
      backgroundColor: '#FFFCF1',
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 8,
      marginVertical: 16,
      padding: 10,
      borderWidth: 1,
      borderColor: '#FEDE6B',
      alignItems: 'center'
    },
    input:{
      width: '90%',
      maxWidth: '90%',
      height: 40,

    }
})