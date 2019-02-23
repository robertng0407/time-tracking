import React from 'react';

import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function TimerButton({
    color,
    title,
    small,
    onPress
}) {
    return (
        <TouchableOpacity
            styles={[styles.button, { borderColor: color }]}
            onPress={onPress}
        >
            <Text
                style={[styles.buttonText,
                small ? styles.small : styles.large,
                { color }]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {

    },
    buttonText: {

    },
    small: {

    },
    large: {

    }
});