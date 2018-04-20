import PropTypes from 'prop-types';
import React, { Component } from "react";
import { ImageBackground, StyleSheet } from 'react-native';


class background extends Component {
    static PropTypes = {
        children: PropTypes.string.isRequired
    }
    render = () => {
        const { children, background } = this.props;
        return (
            <ImageBackground
                source={{url : background}}
                style={styles.image}
                imageStyle={{ resizeMode: "cover" }}
            >
                {children}
            </ImageBackground>
        )
    }
}


const styles = StyleSheet.create({
    image: {
      flex: 1,
      height: null,
      width: null
    },
})

export default Background;