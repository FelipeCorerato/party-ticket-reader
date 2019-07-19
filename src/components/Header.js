import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
    container: { 
        flexDirection: 'row', 
        height: getStatusBarHeight() + 60, 
        elevation: 2,
        paddingTop: getStatusBarHeight() + 10,
        justifyContent: 'space-between'
    },

    headerTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

const Header = props => {
    const {
        headerStyle,
        headerTitle,
        headerTitleStyle,
        rightButton,
        leftButton,
        component,
        navigation
    } = props;
    
    return (
        <LinearGradient style={headerStyle} colors={['rgba(126, 109, 227, 1)', 'rgba(75, 61, 161, 1)']}>
            <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                { leftButton }
            </View>

            <View style={styles.headerTitle}>
                { headerTitle && <Text style={headerTitleStyle}>{ headerTitle }</Text> }
                { component }
            </View>

            <View style={{ marginRight: 10, justifyContent: 'center' }}>            
                { rightButton }
            </View>
        </LinearGradient>
    )
}

export default Header;