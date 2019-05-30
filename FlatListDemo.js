// import React, { Component } from 'react'
// import { View, Text } from 'react-native';
// import React, { Component } from "react";
// import { View, Text, FlatList, ActivityIndicator } from "react-native";
// import { List, ListItem, SearchBar } from "react-native-elements";

// export default class FlatListDemo extends Component {
//   render() {
//     return (
//       <View>
//         <Text>View inside</Text>
//       </View>
//     )
//   }
// }


import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, TextInput, StyleSheet } from "react-native";
import { List, ListItem, SearchBar } from 'react-native-elements';

class FlatListDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      text: ''
    };
    this.arrayholder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        },
        function() {
          this.arrayholder = res.results;
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round
    onChangeText={text => this.searchFilterFunction(text)}
      autoCorrect={false} 
      value={this.state.text}/>;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  renderRow ({ item }) {
    return (
      <ListItem
      roundAvatar
      title={`${item.name.first} ${item.name.last}`}
      subtitle={item.email}
      leftAvatar={{  source: { uri: item.picture.thumbnail } }}
      containerStyle={{ borderBottomWidth: 0 }}
      />
      // <ListItem
      //         leftAvatar={{ source: { uri: item.picture.thumbnail } }}
      //         title={`${item.name.first} ${item.name.last}`}
      //         subtitle={item.email}
      //       />
    )
  }

  searchFilterFunction = text => {    
    const newData = this.arrayholder.filter(item => {      
      const itemData = `${item.name.title.toUpperCase()}   
      ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
      
       const textData = text.toUpperCase();
        
       return itemData.indexOf(textData) > -1;    
    });
    
    this.setState({ data: newData, text: text});  
  };

  render() {
    return (
      <View>
        <FlatList
                data={this.state.data}
                renderItem={this.renderRow}
                keyExtractor={item => item.email}
                ListHeaderComponent={this.renderHeader} 
                ItemSeparatorComponent={this.renderSeparator}
                ListFooterComponent={this.renderFooter}
                onRefresh={this.handleRefresh}
                refreshing={this.state.refreshing}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={50}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 40,
    padding: 16,
  },
  textStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});

export default FlatListDemo;

