import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { ifIphoneX, getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import posed from 'react-native-pose';

const windowWidth = Dimensions.get('window').width;
const tabWidth = windowWidth / 2;

const SpotLight = posed.View({
    route0: { x: 0 },
    route1: { x: tabWidth }
});

const Scaler = posed.View({
    active: { scale: 1.25 },
    inactive: { scale: 1 }
});

const styles = StyleSheet.create({
    container: { 
        flexDirection: 'row', 
        height: getBottomSpace() + 52, 
        elevation: 2,
        paddingBottom: getBottomSpace() + 10,
        borderTopWidth: 1,
        borderTopColor: '#dddddd'
    },

    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    spotLigth: {
        width: tabWidth,
        height: '100%',
        backgroundColor: 'rgba(128,128,255,0.2)',
        borderRadius: 8
    },

    scaler: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const TabBar = props => {
    const {
        renderIcon,
        getLabelText,
        activeTintColor,
        inactiveTintColor,
        onTabPress,
        onTabLongPress,
        getAcessibilityLabel,
        navigation
    } = props

    const { routes, index: activeRouteIndex } = navigation.state;

    return (
        <View style={styles.container}>
            <View style={StyleSheet.absoluteFillObject}>
                <SpotLight style={styles.spotLigth} pose={`route${activeRouteIndex}`} />
            </View>

            { routes.map((route, routeIndex) => {
                const isRouteActive = routeIndex === activeRouteIndex;
                const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

                return (
                    <TouchableOpacity 
                        key={routeIndex} 
                        style={styles.tabButton} 
                        onPress={() => { onTabPress({ route }) }}
                        onLongPress={() => { onTabLongPress({ route }) }}
                        // accessibilityLabel={ getAcessibilityLabel({ route }) }    
                    >
                        <Scaler style={styles.scaler} pose={isRouteActive ? 'active' : 'inactive'}>
                            { renderIcon({ route, focused: isRouteActive, tintColor }) }
                        </Scaler>

                        {/* <Text>{ getLabelText({ route }) }</Text> */}
                    </TouchableOpacity>
                );
            }) }
        </View>
    );
}

export default TabBar;