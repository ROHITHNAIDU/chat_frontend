import React, {Component} from 'react';
import {userLogin, userAuth } from '../actions/userAction'; //userauth for login once
import {connect} from 'react-redux';
import {View, Text, TouchableOpacity, TextInput, StyleSheet, Image, ScrollView} from 'react-native';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {},
        };
        this.validateForm = this.validateForm.bind(this);
    }
handleEmail = (text) => {
    this.setState({ email: text})
 }
handlePassword = (text) => {
    this.setState({password: text})
 }

 //componentDidMount () {
  //   this.props.userAuth() //added login
 //}
 validateForm(){
     const { errors } = this.state;
     const emailaddr = this.state.email;
     const pass = this.state.password;
     const reg = /^(?:\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)$/;
     if (emailaddr === '') {
         errors.email = "Email address cannot be empty.";
     } else if (emailaddr.length > 0 && !reg.test(emailaddr)){
        errors.email = "Please provide correct email address";
     } else {
         errors.email = '';
     }

     if (pass === ''){
         errors.pass = "Password cannot be empty.";
     } else if (pass && pass.length < 5) {
         errors.pass = "Password should be more than 5 characters.";
     }else {
         errors.pass = '';
     }
     this.setState({ errors })
     if(errors.email==='' && errors.pass==='') {
         const userinfo={
              email:this.state.email,
              password:this.state.password
         }
         this.props.onLogin(userinfo)
     }
 }

 goToRegister = () =>{
     this.props.navigation.navigate('Register');
 }

 componentDidUpdate(nextProps){
     if(this.props.userReducer && this.props.userReducer.userAuth && this.props.userReducer.userAuth!==nextProps.userAuth && this.props.userReducer.userAuthSuccess===true){
      this.props.navigation.navigate('Home');
    }
}
 
render() {
    const { errors} = this.state;
   return(
        <View style = {styles.container}>
        <ScrollView style = {styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={{marginTop: 100}}>
        <View style={{alignItems: 'center'}}>
        <Image style = {styles.image} source={require('../Image/chitchat.png')}/>

            <TextInput style = {styles.input}
              placeholder = "Email"
              placeholderTextColor = "#fff"
              autoCapitalize = "none"
              onChangeText = {this.handleEmail}/>
              <Text style={[styles.errorstyle]}>{errors.email}</Text>

            <TextInput style = {styles.input}
              placeholder = "Password"
              placeholderTextColor = "#fff"
              autoCapitalize = "none"
              secureTextEntry
              onChangeText = {this.handlePassword}/>
              <Text style={[styles.errorstyle]}>{errors.pass}</Text>

            <TouchableOpacity
              style = {styles.submitButton}
              onPress = {() => this.validateForm()}>
              <Text style = {styles.submitButtonText}> Login </Text>    
            </TouchableOpacity>
            <TouchableOpacity
              style = {styles.links}
              onPress = {() => this.goToRegister()}>
              <Text style = {styles.linksText}> Don't have an account? <Text style = {styles.reg}>Register </Text></Text>    
            </TouchableOpacity>
            </View>
            </View>
            </ScrollView>
        </View>      
    );
  }
}

// export default Login;
function mapStateToProps(state){
    return{
        userReducer: state.userReducer
    };
}
function mapDispatchToProps(dispatch){
    return{
        onLogin:(userinfo) => dispatch(userLogin(userinfo)),
       // userAuth: () => dispatch(userAuth())//ad
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        flex:1
    },
    scroll: {
        width: '100%',
    },

    image: {
        width: '50%',
        height: 100,
        resizeMode: 'contain',
        margin: 30,
    }, 

    input: {
        margin: 18,
        height: 40,
        fontWeight: 'bold',
        borderColor: '#fff',
        borderWidth: 1,
        width: '70%',
        padding: 10,
        fontSize: 16,
        lineHeight: 20,
        borderRadius: 25,
        color: '#fff'
    },
    submitButton: {
        backgroundColor: '#ff5c33',
        padding: 10,
        margin: 15,
        height: 40,
        borderRadius: 25,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    links: {
        fontSize:18,
        margin: 15,
    },
    linksText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    
    }, 
    reg: {
        color: '#ff5c33'
    },
    errorstyle:{
        color:"white"
    }   
})