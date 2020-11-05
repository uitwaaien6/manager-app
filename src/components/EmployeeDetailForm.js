import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, ActivityIndicator, TextInput } from 'react-native';

class EmployeeDetailForm extends React.Component {

    state = {
        name: this.props.employee.name,
        phone: this.props.employee.phone,
        shift: this.props.employee.shift
    }

    render() {
        return (
            <View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Name: </Text>
                    <TextInput
                        style={styles.sectionInput}
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
                        value={this.state.phone.toString()}
                        onChangeText={(newText) => {
                            this.setState({ phone: newText });
                        }}
                    />
                </View>
                

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Shift: </Text>
                    <TextInput
                        style={styles.sectionInput}
                        value={this.state.shift}
                        onChangeText={(newText) => {
                            this.setState({ shift: newText });
                        }}
                    />
                </View>

                <Button
                    title="Save"
                    onPress={() => {
                        const { name, phone, shift } = this.state;
                        const employeeId = this.props.employee._id;
                        this.props.onSave({ name, phone, shift, employeeId });
                    }}
                />

                <Button
                    title="Text Schedule"
                    onPress={() => {

                    }}
                />

                <Button
                    title="Fire"
                    onPress={() => {
                        const employeeId = this.props.employee._id;
                        this.props.onFire(employeeId);
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

export default EmployeeDetailForm;