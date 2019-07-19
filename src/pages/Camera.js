import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
// import Dialog from 'react-native-dialog'; 
import { connect } from 'react-redux';

import Dados from '../models/Dados';
import adicionarIngresso from '../actions/adicionarIngresso';

class Camera extends React.Component {
	state = {
		hasCameraPermission: null,
		scanned: false,
		dialogVisible: false,
		infoIngresso: '',
		infoAdicional: ''
	};
	
	async componentDidMount() {
		this.getPermissionsAsync();
	}
	
	getPermissionsAsync = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ hasCameraPermission: status === 'granted' });
	};
	
	render() {
		const { hasCameraPermission, scanned } = this.state;

		if (hasCameraPermission === null) {
			return <Text>Requisitando a permissão para a camera</Text>;
		}
		if (hasCameraPermission === false) {
			return <Text>Não há acesso a camera</Text>;
		}

		return (
			<View
				style={{
					flex: 1,
					flexDirection: 'column',
					justifyContent: 'flex-end',
					paddingTop: getStatusBarHeight() + 10,
					paddingBottom: getBottomSpace() + 10
				}}
			>
                <StatusBar barStyle='light-content' />

                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />

                { scanned && (
                    <Button 
                        title={'Toque para escanear o próximo'} 
                        onPress={() => this.setState({ scanned: false })} 
                        color={'rgba(75, 61, 161, 1)'}
                    />
				)}
				
				{/* <Dialog.Container visible={this.state.dialogVisible}>
					<Dialog.Title>Informação adicional</Dialog.Title>
					<Dialog.Description>Digite o valor que deseja atribuir a este ingresso</Dialog.Description>

					<Dialog.Input placeholder='Informação' autoCapitalize='none' autoCorrect={false} />

					<Dialog.Button label='Cancelar' onPress={() => {
							this.setState({ dialogVisible: false });
							this.handleBarCodeScanned({
								type: '',
								data: this.state.infoIngresso
							});
						}} 
					/>
					<Dialog.Button label='Adicionar' onPress={() => this.handleAddCode(this.state.infoIngresso)} />
				</Dialog.Container> */}
			</View>
		);
	}
	
	handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: true });
		Alert.alert('Código lido', `Informação do ingresso: ${data}`, [
			{
				text: 'Cadastrar',
                onPress: () => { 
					var verificacao = this.props.dados.valoresLidos.find(element => element === data);

					if (verificacao) {
						return Alert.alert('Ocorreu um erro', 'Este ingresso já foi lido!');
					}

					const valores = this.props.dados.valoresLidos;
					valores.push(data);

					return this.props.adicionarIngresso(valores);
				}
			},
			// {
			// 	text: 'Adicionar valor',
			// 	onPress: () => { 
			// 		var verificacao = state.dados.valoresLidos.find(function(element) {
			// 			return element === data;
			// 		});

			// 		if (verificacao === true) {
			// 			return Alert.alert('Oops', 'Este ingresso já foi lido!');
			// 		}

			// 		this.setState({ infoIngresso: data })
			// 		return this.showDialog();
			// 	}
			// }
		]);
	};
	
	handleAddCode = (valoresLidos) => {
		// this.props.dados.valoresLidos.push(valor);
		// this.props.dados.qtdPessoas += 1;

		return {
			type: 'ADICIONAR_VALOR',
			valoresLidos
		}
	}

	showDialog = () => {
		this.setState({ dialogVisible: true });
	}
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    adicionarIngresso: (valoresLidos) => dispatch(adicionarIngresso(valoresLidos))
}) 

export default connect(mapStateToProps, mapDispatchToProps)(Camera);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: '#fff',
		// alignItems: 'center',
		// justifyContent: 'center',
	},

	centerText: {
		flex: 1,
		fontSize: 18,
		padding: 32,
		color: '#777',
	},

	textBold: {
		fontWeight: '500',
		color: '#000',
	},

	buttonText: {
		fontSize: 21,
		color: 'rgb(0,122,255)',
	},

	buttonTouchable: {
		padding: 16,
	},

	bottomBar: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'rgba(0,0,0,0.5)',
		padding: 15,
		flexDirection: 'row',
    },
    
	url: {
		flex: 1,
    },

	urlText: {
		color: '#fff',
		fontSize: 20,
	},
      
    cancelButton: {
		marginLeft: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
    
    cancelButtonText: {
		color: 'rgba(255,255,255,0.8)',
		fontSize: 18,
	},
});
