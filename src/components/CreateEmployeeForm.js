import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, ActivityIndicator, TextInput } from 'react-native';

class CreateEmployeeForm extends React.Component {

    state = {
        name: null,
        phone: null,
        shift: null
    }

    render() {
        return (
            <View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Name: </Text>
                    <TextInput
                        style={styles.sectionInput}
                        placeholder="Name..."
                        value={this.state.name}
                        onChangeText={(newText) => {
                            this.setState({ name: newText });
                        }}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Phone: </Text>
                    <TextInput
                        style={styles.sectionInput}
                        placeholder="Phone..."
                        value={this.state.phone}
                        onChangeText={(newText) => {
                            this.setState({ phone: newText });
                        }}
                    />
                </View>


                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Shift: </Text>
                    <TextInput
                        style={styles.sectionInput}
                        placeholder="Shift..."
                        value={this.state.shift}
                        onChangeText={(newText) => {
                            this.setState({ shift: newText });
                        }}
                    />
                </View>

                <Button
                    title="Add Employee"
                    onPress={() => {
                        const { name, phone, shift } = this.state;
                        this.props.onAddEmployee({ name, phone, shift });
                        this.setState({ name: '', phone: '', shift: '' });
                    }}
                />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    sectionInput: {
        fontSize: 22,
        flex: 1,
        borderRadius: 2
    }
});

export default CreateEmployeeForm;