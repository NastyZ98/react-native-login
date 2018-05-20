import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Header, Button, FormInput } from 'react-native-elements';
import { connect } from 'react-redux';
import { 
    emailChanged, 
    passwordChanged, 
    loginUser 
} from '../actions';

class LoginForm extends Component {
    onEmailChange(email) {
        this.props.emailChanged(email);
    }
    onPasswordChange(password) {
        this.props.passwordChanged(password);
    }
    onButtonPress() {
        const { email, password } = this.props;
        this.props.loginUser({ email, password });
    }
    renderError() {
        const { errorContainerStyle, errorTextStyle } = styles;

        if (this.props.error) {
            return (
                <View style={errorContainerStyle}>
                    <Text style={errorTextStyle}>{this.props.error}</Text>
                </View>
            );
        }
    }
    renderButton() {
        if (this.props.loading) {
            return (
                <View style={styles.errorContainerStyle}>
                    <ActivityIndicator size="small" />
                </View>
            );
        }
        return (
            <Button
                raised
                icon={{ name: 'login-variant', type: 'material-community' }}
                title='SE CONNECTER'
                onPress={this.onButtonPress.bind(this)}
            />
        );
    }
    render() {
        return (
            <View>
                <Header
                    outerContainerStyles={{ backgroundColor: '#289EFF' }}
                    centerComponent={styles.headerStyle}
                />
                <FormInput 
                    onChangeText={this.onEmailChange.bind(this)} 
                    value={this.props.email}
                    placeholder='john.doe@email.com'
                />
                <FormInput 
                    onChangeText={this.onPasswordChange.bind(this)} 
                    value={this.props.password}
                    placeholder='password'
                />
                {this.renderError()}
                {this.renderButton()}
            </View>
        );
    }
}

const styles = {
    errorTextStyle: {
        alignSelf: 'center', 
        justifyContent: 'center',
        fontSize: 17,
        color: 'red'
    },
    errorContainerStyle: {
        paddingBottom: 10, 
        paddingTop: 5
    },
    containerStyle: {
        flex: 1
    },
    headerStyle: {
        text: 'IDENTIFICATION', 
        style: { color: '#fff', fontSize: 20 }
    }
};

const mapStateToProps = (state) => {
    return {
      email: state.auth.email,
      password: state.auth.password,
      error: state.auth.error,
      loading: state.auth.loading
    };
};

export default connect(mapStateToProps, { 
    emailChanged, 
    passwordChanged, 
    loginUser 
})(LoginForm);
