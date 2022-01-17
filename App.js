import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  Button,
  Text,
  View,
  Pressable,
  FlatList,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

function LandingPage({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.holder}>
        <Image
          source={require('./assert/src/G-QUOTES.png')}
          style={styles.image}
        />
        <ScrollView>
          <View style={styles.info}>
            <Text style={styles.baseText}>Welcome to G-quotes</Text>
            <Text style={styles.innerText}>
              Get 10 insperation quotes daily for free from G-Quotes.
            </Text>
          </View>
          <Pressable
            style={styles.buttonStyle}
            onPress={() => navigation.navigate('HOME PAGE')}>
            <Text style={styles.buttonTextStyle}>Check out today's quotes</Text>
          </Pressable>
        </ScrollView>
        <View style={styles.footer}>
          <Text style={{color: 'black'}}>Powered by Umeskia Softwares</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

function HomePage({navigation}) {
  const backImage = {
    uri: 'https://umeskiasoftwares.com/images/Gquote.png',
  };
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    fetch('https://goodwillpeers.com/api/v1/m')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <SafeAreaView style={styles.container1}>
      <ImageBackground source={backImage} resizeMode="cover">
        {isLoading ? (
          <Text>Loading quotes...</Text>
        ) : (
          <FlatList
            data={data.quotes}
            keyExtractor={({no}, index) => no}
            refreshControl={<RefreshControl />}
            renderItem={({item}) => (
              <View style={styles.CardView}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.textquote}>
                    <Text style={styles.qoutenum}>{item.no} :- </Text>
                    {item.qoute}
                    <Text style={styles.qoutename}> by {item.mentor}</Text>
                  </Text>
                </View>
              </View>
            )}
          />
        )}
        <View style={styles.footer2}>
          <Text style={{color: 'white'}}>Powered by Umeskia Softwares</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name=" "
          options={{headerShown: false}}
          component={LandingPage}
        />
        <Stack.Screen
          name="HOME PAGE"
          component={LandingPage}
          component={HomePage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CED8F2',
    alignContent: 'center',
    justifyContent: 'center',
  },
  container1: {
    flex: 1,
    //backgroundColor: '#CED8F2',
  },
  textquote: {
    color: 'black',
    fontSize: 18,
  },
  qoutenum: {
    color: 'blue',
  },
  qoutename: {
    color: 'green',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 25,
  },
  holder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    height: 54,
    width: 250,
    marginTop: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#742EED',
    alignSelf: 'center',
    shadowRadius: 5,
    shadowOpacity: 0.7,
    shadowColor: 'rgba(46, 229, 157, 0.5)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  buttonTextStyle: {
    color: '#fdfdfd',
    fontWeight: '700',
  },
  baseText: {
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
  },
  innerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  info: {
    marginLeft: '15%',
    marginRight: '15%',
  },
  footer: {
    width: '100%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -150,
  },
  CardView: {
    height: 'auto',
    minHeight: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: '#CED8F2',
  },
  footer2: {
    width: '100%',
    height: 30,
    backgroundColor: '#742EED',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    position: 'absolute',
  },
  image2: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: '50%',
  },
});
