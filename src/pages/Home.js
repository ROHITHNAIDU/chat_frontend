import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {userList} from '../actions/userAction';
import {connect} from 'react-redux';


class Home extends Component { 
  constructor(props) {
    super(props);
    this.state = {
     users: []
    };
  } 

  componentDidMount() {
    this.props.onUserList();
  }


  goChat = (userid, name) => {
    this.props.navigation.navigate('Chat', {userid: userid, name: name});
  }

  componentDidUpdate(nextProps){
    if(this.props.userReducer && this.props.userReducer.userList && this.props.userReducer.userList!==nextProps.userReducer.userList && this.props.userReducer.userListSuccess===true){
     this.setState({users:this.props.userReducer.userList});
   }
}

 render() {
   const { users } = this.state;
   return(
        <View style = {styles.container}>
          <ScrollView style = {styles.scroll} keyboardShouldPersistTaps="handled">
          {users && users.length>0 ?
          <View>
            {users.map((item, index) => {
              return (
                <TouchableOpacity onPress={ () => this.goChat(item._id, item.name)} key={index}>
                  <Text style={styles.item}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              
              )
              })}
      </View>:null}
      </ScrollView>
        </View>
   )     
  }
}

//export default Home;

function mapStateToProps(state){
  return{
      userReducer: state.userReducer
  };
}
function mapDispatchToProps(dispatch){
  return{
      onUserList:() => dispatch(userList())
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: '#d9d9d9',
    },
    item: {
      padding:7,
      fontSize:22,
      height:50,
      fontWeight:'bold',
      color:'white',
      backgroundColor: '#000000',
        margin: 0.5,
        borderRadius:0
        
    },
    
  }
);