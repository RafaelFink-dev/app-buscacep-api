import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Keyboard, Image } from "react-native"
import api from "./src/services/api";

export default function App() {
  const [cep, setCep] = useState('');
  const inputRef = useRef(null);
  const [cepUser, setCepUser] = useState(null);

  async function buscar() {
    if (cep == '' || cep.length != 8) {
      alert("Digite um cep válido!")
      setCep('')
      return;
    }

    try {
      const response = await api.get(`/${cep}/json`);
      setCepUser(response.data)
      Keyboard.dismiss()
    } catch (error) {
      console.log('ERROR: ' + error)
    }


  }

  function limpar() {
    setCep('')
    setCepUser('')
    inputRef.current.focus(); //Definir o foco no textinput
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.areaLogo}>
        <Image style={styles.logo}
          source={require('./src/img/logo.png')}
        />
      </View>


      <View style={{ alignItems: "center" }}>
        <Text style={styles.text}>Digite o CEP desejado:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 79003421"
          value={cep} //O valor que vai ficar 
          onChangeText={(texto) => setCep(texto)} //Quando usuario digitar, onde armazena
          keyboardType="numeric"
          ref={inputRef}
        />
      </View>

      <View style={styles.areaBtn}>
        <TouchableOpacity style={[styles.botao, { backgroundColor: '#1F75CD' }]} onPress={buscar}>
          <Text style={styles.botaoText}>
            Buscar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, { backgroundColor: '#CD3E1D' }]} onPress={limpar}>
          <Text style={styles.botaoText}>
            Limpar
          </Text>
        </TouchableOpacity>
      </View>

      {cepUser && //Se tiver resultado ele mostra
        <View style={styles.resultado}>
          <View style={styles.resultado2}>
            <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
            <Text style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
            <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
            <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text>
            <Text style={styles.itemText}>Estado: {cepUser.uf}</Text>
          </View>
        </View>
      }


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18
  },
  areaBtn: {
    alignItems: "center",
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: "space-around"
  },
  botao: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
  },
  botaoText: {
    color: '#FFF',
    fontSize: 15
  },
  resultado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 16
  },
  areaLogo: {
    alignItems: "center"
  },
  logo: {
    width: 100,
    height: 100,
  },
  resultado2: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: '#D3D3D3',
    borderRadius: 10,
    width: '90%',
    height: '90%',
    margin: 10
  }
})