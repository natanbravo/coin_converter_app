import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Picker from './src/components/Picker';
import api from './src/services/api';

export default function App() {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [coinBValue, setCoinBValue] = useState(0);

  const [coinValue, setCoinValue] = useState(null);
  const [convertedValue, setConvertedValue] = useState(0);

  useEffect(() => {
    async function loadCoin() {
      const response = await api.get('all');
      let coinArray = [];
      Object.keys(response.data).map(key => {
        coinArray.push({
          key: key,
          value: key,
          label: key,
        });
      });
      setCoin(coinArray);
      setLoading(false);
    }
    loadCoin();
  }, []);

  async function converter() {
    if (selectedCoin === null || coinBValue === null) {
      alert('Por favor, selcione uma moeda e preencha um valor');
    }

    const response = await api.get(`all/${selectedCoin}-BRL`);
    // console.log(response.data[selectedCoin].ask);
    let result = response.data[selectedCoin].ask * parseFloat(coinBValue);
    setConvertedValue(`R$ ${result.toFixed(2)}`);
    setCoinValue(coinBValue);

    Keyboard.dismiss();
  }

  if (loading) {
    return (
      <View style={styles.load}>
        <ActivityIndicator color={'#fff'} size={45} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'#101215'} barStyle={'light-content'} />

        <TouchableWithoutFeedback>
          <KeyboardAvoidingView>
            <SafeAreaView>
              <View style={styles.coinContainer}>
                <Text style={styles.title}>Conversor De Moeda</Text>
                <Picker coin={coin} onChange={coin => setSelectedCoin(coin)} />
              </View>

              <View style={styles.valueContainer}>
                <Text style={styles.converterTitle}>
                  Digite um valor para converter em (R$)
                </Text>
                <TextInput
                  placeholder="EX:150"
                  style={styles.userInput}
                  keyboardType={'numeric'}
                  onChangeText={value => setCoinBValue(value)}
                />
              </View>

              <TouchableOpacity style={styles.btnContainer}>
                <Text style={styles.btnText} onPress={converter}>
                  CONVERTER
                </Text>
              </TouchableOpacity>
              {convertedValue !== 0 && (
                <View style={styles.resultArea}>
                  <Text style={styles.resultCoinText}>
                    {coinValue} {selectedCoin}
                  </Text>
                  <Text style={styles.resultText}>Corresponde à </Text>
                  <Text style={styles.resultNumber}>{convertedValue}</Text>
                </View>
              )}
            </SafeAreaView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101215',
    alignItems: 'center',
  },
  coinContainer: {
    width: 350,
    backgroundColor: '#f9f9f9',
    paddingTop: 9,
    marginTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    marginBottom: 2,
  },
  title: {
    fontSize: 15,
    color: '#121212',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  valueContainer: {
    width: 350,
    backgroundColor: '#f9f9f9',
    paddingBottom: 9,
    paddingTop: 9,
  },
  userInput: {
    width: '100%',
    padding: 10,
    height: 45,
    fontSize: 20,
    marginTop: 8,
    color: '#121212',
  },
  converterTitle: {
    padding: 10,
    color: '#121212',
    fontSize: 15,
  },
  btnContainer: {
    width: 350,
    backgroundColor: '#ff0000',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
  resultArea: {
    width: 350,
    backgroundColor: '#000',
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  resultText: {
    color: '#f9f9f9',
    fontWeight: 'bold',
    fontSize: 22,
    letterSpacing: 1,
    fontStyle: 'italic',
    margin: 10,
    elevation: 2,
  },
  resultCoinText: {
    color: '#f9f9f9',
    fontWeight: 'bold',
    fontSize: 23,
    letterSpacing: 1,
  },
  resultNumber: {
    color: '#00ff00',
    fontWeight: 'bold',
    fontSize: 35,
    letterSpacing: 1,
    fontStyle: 'italic',
    margin: 10,
  },
  load: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
