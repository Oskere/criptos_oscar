import { Component, } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, Modal, FlatList, ScrollView } from "react-native";

export default class Coin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibilidad: false,
      datosMonedas: [],
    }
  }

  removeParam(symbol) {
    const filter = symbol.replace("USDT", "");
    return filter;
  }

  removeMinus(priceChange) {
    return priceChange.startsWith('-') ? priceChange.slice(1) : priceChange;
  }

  Open = (coin) => {
    const datosMonedas = Object.keys(coin).map((key) => ({
      nombre: key,
      valor: coin[key],
    }));

    this.setState({ visibilidad: true, datosMonedas });
  };

  Close = () => {
    this.setState({ visibilidad: false, datosMonedas: [] });
  };

  render() {
    const { coin } = this.props;
    const { datosMonedas } = this.state;
    const filter = this.removeParam(coin.symbol);
    const priceChange = this.removeMinus(coin.priceChange);

    return (
      <View>

        <View style={styles.containerMonedas}>
          <View style={styles.coinName}>
            <TouchableOpacity style={styles.containerNames} onPress={() => this.Open(coin)}>
              <Text style={styles.coinName}>{filter}</Text>
              <Text style={styles.textSymbol}>{coin.symbol}</Text>
            </TouchableOpacity>

          </View>
          <View>
            <Text style={styles.textPrice}>${priceChange}</Text>
            <Text
              style={[
                styles.pricePercentage,
                coin.priceChangePercent > 0
                  ? styles.priceUp
                  : styles.priceDown,
              ]}
            >
              {coin.priceChangePercent}%
            </Text>
          </View>
        </View>

        <Modal visible={this.state.visibilidad} animationType="slide" >
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.back} onPress={this.Close}>
              <Text style={styles.backText}>Volver</Text>
            </TouchableOpacity>
            <ScrollView >
              {datosMonedas.map((coins, index) => (
                <View style={styles.modalRow} key={index}>
                  <Text style={styles.names}>{coins.nombre}</Text>
                  <Text style={styles.values}>{coins.valor}</Text>
                </View>
              ))}
            </ScrollView>

          </View>
        </Modal>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  containerMonedas: {
    backgroundColor: "#776B5D",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerNames: {
    marginLeft: 10,
  },
  coinName: {
    flexDirection: "row",
    color: '#F3EEEA',
  },
  text: {
    color: "#fff",
  },
  textPrice: {
    color: "#F3EEEA",
    fontWeight: "bold",
  },
  pricePercentage: {
    textAlign: "right",
  },
  priceUp: {
    color: "#00B589",
  },
  priceDown: {
    color: "#fc4422",
  },
  image: {
    width: 30,
    height: 30,
  },
  textSymbol: {
    color: "#EBE3D5",
    textTransform: "uppercase",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#776B5D",
    padding: 20,
  },
  back: {
    alignItems: "center",
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,

  },
  backText: {
    color: "#F3EEEA",
  },
  modalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: 'black',
    padding: 8,
  },
  names: {
    fontSize: 16,
    fontWeight: "bold",
    color: '#F3EEEA',
  },
  values: {
    fontSize: 16,
    color: '#F3EEEA',
  },

});