import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {
    Text,
    View,
    Image
} from 'react-native'
import {HeaderLeft} from './MainContainer'
import ApiCall from '../common/ApiCall'
import { storeList } from '../actions/store'
import StoreList from '../components/StoreList'

class StoreScreen extends Component{

    constructor(props){
      super(props);
      this.getStoreList = this.getStoreList.bind(this);
    }

    static navigationOptions = (navigation) => ({
        headerLeft: <HeaderLeft {...navigation} />,
    })

    componentDidMount(){
        this.getStoreList();
    }

    getStoreList(){
      let self = this , apiUrl = 'https://my-json-server.typicode.com/soumya18/DemoApis/db';
      ApiCall({
        url: apiUrl,
        type: 'GET',
        "Content-Type": "application/json",
        success(responseData){
          if(responseData.store.length > 0){
            self.props.storeList(responseData.store);
          }
        },
        error(error) {
          console.log(`Error is => ${error}`);
        }
      });
    }

    render(){
        return(
            <StoreList {...this.props} />
        )
    }
}

const mapStateToProps = (state) => ({ storeData : state.storeData })

const mapDispatchToProps = (dispatch) => (bindActionCreators({storeList}, dispatch))

export default connect(
                mapStateToProps,
                mapDispatchToProps
              )(StoreScreen);
