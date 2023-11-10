import { StatusBar } from 'react-native';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, SafeAreaView } from 'react-native';
import Coin from './componentes/Coin';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      refreshing: false,
      search: "",
    }
  }


  loadData = async () => {
    try {
      const res = await fetch(
        "https://api.binance.com/api/v3/ticker/24hr"
      );
      const datos = await res.json();
      const datos2 = datos.filter((coin) => coin.symbol.includes("USDT"));
      this.setState({ coins: datos2 });
    } catch (error) {
      console.error("Error", error);
    }
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { coins, refreshing, search } = this.state;

    return (
      <SafeAreaView  style={[styles.container]}>
        <StatusBar backgroundColor="black" barStyle="light-content" />

        <View style={styles.header}>
          <Text style={styles.title}>CryptoBros ™</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search a Coin"
            placeholderTextColor="#F3EEEA"
            onChangeText={(text) => this.setState({ search: text })}
          />
        </View>


        <FlatList
          style={styles.list}
          data={coins.filter(
            (coin) =>
              coin.symbol.toLowerCase().includes(search.toLowerCase())
          )}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Coin coin={item}  />
          )}
          refreshing={refreshing}
          onRefresh={async () => {
            this.setState({ refreshing: true });
            await this.loadData();
            this.setState({ refreshing: false });
          }}
        />
    </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#776B5D",
    flex: 1,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    marginTop: 10,
  },
  list: {
    width: "90%",
  },
  searchInput: {
    color: "#F3EEEA",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "40%",
    textAlign: "center",
  },
});