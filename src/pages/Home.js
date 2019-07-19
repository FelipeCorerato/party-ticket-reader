import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, FlatList, Animated } from 'react-native';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GestureHandler } from 'expo';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Dados from '../models/Dados';
import store from '../store';

const { Swipeable } = GestureHandler;

// class Home extends React.Component {
//     componentWillMount() {
//         if (Dados.nomeEvento === null && Dados.qtdPessoas === null && Dados.valoresLidos === null) {
//             this.inicializarDados();
//             alert('eae')
//         }
//     }

//     inicializarDados = () => {
//         Dados.nomeEvento = 'PD Party';
//         Dados.qtdPessoas = 2;
//         Dados.valoresLidos = ['714', '315']; 
//     }

//     handleExclusao = (valor) => {
//         for (var i = 0; i < Dados.valoresLidos.length; i++) {
//             if (Dados.valoresLidos[i] === valor)
//                 Dados.valoresLidos.splice(i, 1);
//         }

//         Dados.qtdPessoas -= 1;
//     }

//     render() {
//         const BotaoExcluir = ({progress, dragX, onPress}) => {
//             const scale = dragX.interpolate({
//                 inputRange: [-100, 0],
//                 outputRange: [1, 0],
//                 extrapolate: 'clamp'
//             });
        
//             return (
//                 <TouchableOpacity style={{ backgroundColor: '#dd2c00', justifyContent: 'center', }} onPress={onPress}>
//                     <Animated.Text style={[{ color: '#fff', fontWeight: '600', padding: 15 }, { transform: [{ scale }] }]}>Deletar</Animated.Text>
//                 </TouchableOpacity>
//             )
//         }

//         return(
//             <View style={styles.container}>
//                 <StatusBar barStyle='light-content' />
//                 <Header 
//                     headerTitle={nomeEvento} 
//                     headerTitleStyle={styles.headerTitle} 
//                     headerStyle={styles.header}
//                     rightButton={(
//                         <TouchableOpacity 
//                             onPress={() => this.props.navigation.navigate('Camera')}
//                             style={{
//                                 marginRight: 10,
//                                 alignItems: 'center'
//                             }}
//                         >
//                             <Icon name='camera' color={'white'} size={25}  />
//                         </TouchableOpacity>
//                     )}
//                     leftButton={(
//                         <View style={{  marginLeft: 10 }}>
//                             <Icon name='camera' color={'transparent'} size={25}  />
//                         </View>
//                     )}
//                 />
                
//                 <View style={{ 
//                         padding: 10, 
//                         backgroundColor: '#fff',
//                         borderBottomColor: '#dddddd', 
//                         borderBottomWidth: 0.5,
//                         alignItems: 'center',
//                         justifyContent: 'center'
//                     }}
//                 >
//                     <Text style={styles.numeroPessoasTitle}>Ingressos lidos: {Dados.qtdPessoas}</Text>
//                 </View>

//                 <FlatList 
//                     data={Dados.valoresLidos}
//                     keyExtractor={(item, index) => index.toString()}
//                     renderItem={({ item }) => (
//                         <Swipeable
//                             renderRightActions={(progress, dragX) => <BotaoExcluir progress={progress} dragX={dragX} onPress={() => this.props.deletarValor(item)} />}
//                         >
//                             <View style={styles.itemLista}>
//                                 <Text style={{ fontSize: 22 }}>{item}</Text>
//                             </View>
//                         </Swipeable>
//                     )}
//                    refreshing={this.state.refreshing}
//                    onRefresh={this.handleRefresh}
//                 />

//                 <TouchableOpacity onPress={() => {
//                         alert(`Dados lidos: ${JSON.stringify(Dados.valoresLidos)} Numero de pessoas: ${Dados.qtdPessoas}`)
//                     }}
//                 >
//                     <Text>teste</Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     }
// }

function handleExclusao(valoresLidos) {
    return{
        type: 'DELETAR_VALOR',
        valoresLidos
    }
}

function handleAdicionar(valoresLidos) {
    return {
        type: 'ADICIONAR_VALOR',
        valoresLidos
    }
}

function handleRefresh() {
    return {
        type: 'REFRESH'
    }
}

const BotaoExcluir = ({progress, dragX, onPress}) => {
    const scale = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    });

    return (
        <TouchableOpacity style={{ backgroundColor: '#dd2c00', justifyContent: 'center', }} onPress={onPress}>
            <Animated.Text style={[{ color: '#fff', fontWeight: '600', padding: 15 }, { transform: [{ scale }] }]}>Deletar</Animated.Text>
        </TouchableOpacity>
    )
}

var refreshing = false;

const Home = ({ navigation, state, dispatch }) => (
    <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <Header 
            headerTitle={state.dados.nomeEvento} 
            headerTitleStyle={styles.headerTitle} 
            headerStyle={styles.header}
            rightButton={(
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Camera')}
                    style={{
                        marginRight: 10,
                        alignItems: 'center'
                    }}
                >
                    <Icon name='camera' color={'white'} size={25}  />
                </TouchableOpacity>
            )}
            leftButton={(
                <View style={{  marginLeft: 10 }}>
                    <Icon name='camera' color={'transparent'} size={25}  />
                </View>
            )}
        />
        
        <View style={{ 
                padding: 10, 
                backgroundColor: '#fff',
                borderBottomColor: '#dddddd', 
                borderBottomWidth: 0.5,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Text style={styles.numeroPessoasTitle}>Ingressos lidos: {state.dados.valoresLidos.length}</Text>
        </View>

        <FlatList 
            data={state.dados.valoresLidos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <Swipeable
                    onRef={(swipe) => this.swipe = swipe}
                    renderRightActions={(progress, dragX) => <BotaoExcluir progress={progress} dragX={dragX} onPress={() => {
                        const valores = state.dados.valoresLidos;
                    
                        for (var i = 0; i < valores.length; i++) {
                            if (valores[i] === item)
                                valores.splice(i, 1);
                        }
                                                
                        dispatch(handleExclusao(valores));
                    }} />}
                >
                    <View style={styles.itemLista}>
                        <Text style={{ fontSize: 22 }}>{item}</Text>
                    </View>
                </Swipeable>
            )}
            refreshing={refreshing}
            onRefresh={() => dispatch(handleRefresh())}
        />

        {state.dados.valoresLidos.length <= 0 && (
            <Text style={{alignSelf: 'center', color: 'grey', fontSize: 18, margin: 10}}>Nenhum Ingresso foi lido ainda</Text>
        )}

        {/* <TouchableOpacity onPress={() => {    
                alert(`Dados lidos: ${JSON.stringify(state.dados.valoresLidos)} Numero de pessoas: ${state.dados.valoresLidos.length}`)

            }}
        >
            <Text>teste</Text>
        </TouchableOpacity> */}
    </View>
)

export default connect(state => ({ state: state }))(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3'
    },

    header: {
        flexDirection: 'row', 
        height: getStatusBarHeight() + 55, 
        elevation: 2,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: getStatusBarHeight() + 10,
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd'
    },

    headerTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 21
    },

    numeroPessoasTitle: {
        fontSize: 32,
        fontWeight: '300'
    },

    listaDados: {

    },

    itemLista: {
        padding: 12,
        backgroundColor: '#fff',
        borderBottomColor: '#dddddd',
        borderBottomWidth: 0.3
    }
});