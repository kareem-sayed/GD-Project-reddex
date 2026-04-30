import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import StackHeader from '../../../components/StackHeader'
import { ScrollView } from 'react-native-web'

export default function Analysis() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />
                <StackHeader navigation={navigation} title="افهم تحليلك" />
                

            </ScrollView>
        </SafeAreaView>
    )
    }

const styles = StyleSheet.create({})