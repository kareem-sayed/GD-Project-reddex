import { StyleSheet, Text, View,StatusBar } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import StackHeader from '../../../components/StackHeader'
import ToggleButtons from '../../../components/Analysis/ToggleButtons'

export default function ManualInputScreen({navigation}) {

    const [selected, setSelected] = useState("manual");
    const handleSelect = (type) => {
        setSelected(type);

        if (type === "upload") {
            navigation.replace("UploadFileScreen");
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />
            <StackHeader navigation={navigation} title="افهم تحليلك" />
            <ToggleButtons selected={selected} onSelect={handleSelect} />

        </SafeAreaView>     
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "right",
        backgroundColor: "#FAF7F2",
        },
    textContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    width: "100%",
    height: 40,
    justifyContent:"space-between",
    flexDirection:"row",
    },
})