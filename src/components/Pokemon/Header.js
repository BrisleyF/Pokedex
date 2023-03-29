import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import getColorByPokemonType from "../../utils/getColorByPokemonType";

export default function Header(props) {
  const { name, order, image, type } = props;

  const color = getColorByPokemonType(type);

  const bgStyle = [{ backgroundColor: color, ...styles.bg }];

  return (
    <>
      <View style={bgStyle} />
      <View style={styles.content}>
				<View style={styles.header}>
					<Text style={styles.name}>{name}</Text>
					<Text style={styles.order}>#{ `${order}`.padStart(3,0) }</Text>
				</View>
        <View style={styles.contentImg}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  bg: {
    width: "100%",
    height: 400,
    position: "absolute",
		borderBottomEndRadius: 300,
		borderBottomLeftRadius: 300,
		transform: [{scaleX: 1.5}]
  },
	content: {
		marginHorizontal: 20,
		marginTop: 30,

	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: 20
	},
	name: {
		textTransform: 'capitalize',
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 27
	},
	order: {
		color: '#fff',
		fontWeight: 'bold',
	},
  contentImg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: 30,
  },
  image: {
    width: 250,
    height: 320,
		resizeMode: 'contain'
  },
});
