import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native'

import { FoodList } from '../../components/foodlist'

import { getFavorites } from '../../tools/storage'

export default function Favorites() {
  const [ recipes, setRecipes ] = useState([]);
  const isFocused = useIsFocused();

  useEffect( () => {
    let isActive = true;

    async function getRecipes(){
      const result = await getFavorites("@appreceitas");
      if(isActive){
        setRecipes(result);
      }
    }

    if(isActive){
      getRecipes();
    }

    return () => {
      isActive = false;
    }

    
  }, [isFocused])

 return (
   <View style={styles.container}>
    <Text style={styles.title}>Receitas Favoritas</Text>

    {recipes.length === 0 && (
      <Text>Você ainda não possui nenhuma receita salva!</Text>
    )}

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{marginTop: 14}}
        data={recipes}
        keyExtractor={ (item) => String(item.id) }
        renderItem={ ({ item }) => <FoodList data={item}/>}
      />
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F3F9FF',
        paddingStart: 14,
        paddingEnd: 14,
        paddingTop: 40,
    },
    title:{
      color: '#000',
      fontWeight: 'bold',
      fontSize: 24,
    }
})