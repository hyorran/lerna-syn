import React, { Component } from 'react'
import { Icon } from 'native-base'
import { Animated, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

export default class Tab extends Component {
  render() {
    const {
      styles,
      onPressHandler,
      onTabLayout,
      page,
      tab
    } = this.props

    const { label, icon } = tab
    const style = {
      marginHorizontal: 10,
      paddingVertical: 15,
      flexDirection: 'column',
      alignItems: 'center'
    }
    const containerStyle = {
      alignItems: 'center',
      backgroundColor: styles.backgroundColor,
      opacity: styles.opacity,
      transform: [{ scale: styles.opacity }],
      width: 85,
    }
    const textStyle = {
      color: styles.textColor,
      fontWeight: '600',
      fontSize: 12,
    }
    const iconStyle = {
      color: '#fff',
      marginBottom: 5,
      fontSize: 25,
      alignSelf: 'center'
    }

    return (
      <TouchableOpacity
        style={ style }
        onPress={ onPressHandler }
        onLayout={ onTabLayout }
        key={ page }
      >
        <Animated.View style={ containerStyle }>
          <Icon style={ iconStyle } name={ icon } type="FontAwesome5" />
        </Animated.View>
        <Animated.View style={ containerStyle }>
          <Animated.Text style={ textStyle }>{ label }</Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    )
  }
}

Tab.propTypes = {
  key: PropTypes.number.isRequired,
  tab: PropTypes.object.isRequired,
  page: PropTypes.any.isRequired,
  isTabActive: PropTypes.bool.isRequired,
  onPressHandler: PropTypes.func.isRequired,
  onTabLayout: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired
}
