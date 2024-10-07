import React from 'react';
import { StyleSheet, Image, SafeAreaView } from 'react-native';

const Header: React.FC = () => {
    return (
        <SafeAreaView style={styles.header}>
            <Image
                source={require("./plane-removebg-preview.png")}
                resizeMode="contain"
                style={{ height: 50 }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        width: "100%",
        flexDirection: 'row',
        alignContent: "center",
        justifyContent: "center",
        padding: 10,
    },
});

export default Header;
