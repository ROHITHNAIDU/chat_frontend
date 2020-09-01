import React, {Component} from 'react';
import {View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView} from 'react-native';
import {userRegister} from '../actions/userAction';
import {connect} from 'react-redux';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            displayname: '',
            email: '',
            password: '',
            errors: {},
        };
        this.validateForm = this.validateForm.bind(this);
    }
    handleName = (text) => {
        this.setState({ name: text})
     }
    handleDisplayname = (text) => {
        this.setState({displayname: text})
     }
    handleEmail = (text) => {
        this.setState({ email: text})
     }
    handlePassword = (text) => {
        this.setState({password: text})
     }
 validateForm(){
     const { errors } = this.state;
     const name = this.state.name;
     const displayname = this.state.displayname;
     const emailaddr = this.state.email;
     const pass = this.state.password;
     const reg = /^(?:\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)$/;

     if (name === '') {
        errors.name = "Name cannot be empty.";
    } else {
        errors.name = '';
    }

    if (displayname === '') {
        errors.displayname = "Displayname cannot be empty.";
    } else {
        errors.displayname = '';
    }
    
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
         errors.pass= '';
     }
     this.setState({ errors })
     if(errors.name === '' && errors.displayname === '' && errors.email === '' && errors.pass === '') {
         //this.submitForm();
         const userinfo = {
            name: this.state.name,
            displayname: this.state.displayname,
            email: this.state.email,
            password: this.state.password
         }
         this.props.onRegister(userinfo)
     }
 }


 goToLogin = () =>{
     this.props.navigation.navigate('Login');
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
            <TextInput style = {styles.input}
              placeholder = "Name"
              placeholderTextColor = "#fff"
              autoCapitalize = "none"
              onChangeText = {this.handleName}/>
              <Text style={[styles.errorstyle]}>{errors.name}</Text>

              <TextInput style = {styles.input}
              placeholder = "Displayname"
              placeholderTextColor = "#fff"
              autoCapitalize = "none"
              onChangeText = {this.handleDisplayname}/>
              <Text style={[styles.errorstyle]}>{errors.displayname}</Text>

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
              <Text style = {styles.submitButtonText}> Register </Text>    
            </TouchableOpacity>
            <TouchableOpacity
              style = {styles.links}
              onPress = {() => this.goToLogin()}>
              <Text style = {styles.linksText}> Login </Text>    
            </TouchableOpacity>
            </View>
            </View>
            </ScrollView>
        </View>      
    );
  }
}

//export default Register;

function mapStateToProps(state){
    return{
        userReducer: state.userReducer
    };
}
function mapDispatchToProps(dispatch){
    return{
        onRegister:(userinfo) => dispatch(userRegister(userinfo))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);

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
    
    input: {
        margin: 17,
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
    errorstyle:{
        color:'white',
    }  
}) 