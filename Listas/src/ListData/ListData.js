import { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import metadata from './../storage.metadata.json';
import { useIsFocused } from '@react-navigation/native';

const ListData = ({ navigation}) => {
    const [name, setListName] = useState("");
    const isFocused = useIsFocused();
    useEffect(() => { getListName() }, [isFocused]);
    useEffect(() => { saveListName() }, [name]);

    const getListName = async () => {
        const listName = await AsyncStorage.getItem(metadata.NAME.LISTNAME);
        if (listName) {
            setListName(listName);
        }
    }

    const saveListName = async () => {
        const saveName = name || "";
        await AsyncStorage.setItem(metadata.NAME.LISTNAME, saveName);
    }

    const handleClick = () => {
        setListName(name);
        navigation.navigate("ListData")
    }

    return (
        <View>
            <Text>Nome da Lista:</Text>

            <TextInput placeholder="Lista: " value={name} onChangeText={setListName}/>

            {/* <Text>{name}</Text> */}

            <Button 
                title='Salvar'
                onPress={handleClick}
            />

        </View>
    );
}

export default ListData;
