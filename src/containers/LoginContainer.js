import React, { Component } from 'react';
import { StyleSheet, Image, View, Dimensions, TextInput, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';
import { Icon } from 'native-base';
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux';

import AuthActions from '../redux/AuthRedux';
import rscueColors from '../theme/variables/rscueColors'

const backgroundImage = require('../assets/img/login_bg.jpg');

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        height,
        width,
    },
    wrapper: {
        paddingVertical: '50%',
        backgroundColor: 'rgba(8, 8, 8, 0.6)',
        flex: 1,
    },
    inputWrap: {
        flexDirection: "row",
        marginVertical: 10,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#CCC"
    },
    iconWrap: {
        paddingHorizontal: 20,
        justifyContent: "center",
    },
    input: {
        color: '#FFF',
        fontSize: 18,
        paddingBottom: 0,
        flex: 1,
    },
    button: {
        backgroundColor: rscueColors.btnPrimaryBg,
        paddingVertical: 15,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
    },
});

class LoginContainer extends Component {
    state = {
        email: 'heimdall4@outlook.com',
        password: '123Google'
    };

    login = () => {
        if (!this.props.loginIn) {
            this.props.login(this.state.email, this.state.password);
        }
    }

    componentWillReceiveProps(nextProps){
        if (this.props.error !== nextProps.error && nextProps.error) {
            Alert.alert('Error', 'Correo electrónico o contraseña no validos');
        }
    }

    render() {
        return (
            <View style={styles.container} >
                <Image source={backgroundImage} style={styles.background} resizeMode='cover' >
                    <View style={styles.wrapper}>
                        <View style={styles.inputWrap}>
                            <View style={styles.iconWrap}>
                                <Icon name='mail' style={{ color: '#FFF', fontSize: 30 }} />
                            </View>
                            <TextInput
                                placeholder="Correo electrónico"
                                placeholderTextColor="#FFF"
                                keyboardType='email-address'
                                style={styles.input}
                                underlineColorAndroid="rgba(0,0,0,0)"
                                value={this.state.email}
                                onChangeText={text => this.setState({ email: text })}
                            />
                        </View>
                        <View style={styles.inputWrap}>
                            <View style={styles.iconWrap}>
                                <Icon name='unlock' style={{ color: '#FFF', fontSize: 30, paddingLeft: 4, paddingRight: 3 }} />
                            </View>
                            <TextInput
                                placeholder="Contraseña"
                                placeholderTextColor="#FFF"
                                secureTextEntry
                                style={styles.input}
                                underlineColorAndroid="rgba(0,0,0,0)"
                                value={this.state.password}
                                onChangeText={text => this.setState({ password: text })}
                            />
                        </View>
                        <TouchableOpacity
                            activeOpacity={.5}
                            onPress={this.login}
                        >
                            <View style={styles.button}>
                                {this.props.loginIn
                                    ? <ActivityIndicator />
                                    : <Text style={styles.buttonText}>Ingresar</Text>
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                </Image>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    loginIn: state.auth.fetching || state.profile.fetching,
    error: state.auth.error || state.profile.error,
})

const mapDispatchToProps = (dispatch) => ({
    login: (email, password) => dispatch(AuthActions.loginRequest(email, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);