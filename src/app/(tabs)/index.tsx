import { globalStyles } from '@/styles/global';
import { Text, ScrollView } from 'react-native';
import HomeHeader from '../../components/HomeHeader';
import MacroGrid from "@/components/MacroGrid";
import RecentMeals from "@/components/RecentMeals";
import {getMeals, Meal} from "@/storage/meals";
import {useCallback, useState} from "react";
import {useFocusEffect} from "expo-router";

export default function HomeScreen() {
    const [meals, setMeals] = useState<Array<Meal>>([])
    const loadMeals = async () => {
        const data = await getMeals();
        setMeals(data);
        console.log('Loaded meals:', data);
    };

    useFocusEffect(
        useCallback(() => {
            loadMeals();
        }, []),
    );
    return (
        <ScrollView style={globalStyles.container}>
            <Text style={globalStyles.title}>MacroZone</Text>
            <HomeHeader />
            <MacroGrid meals={meals} />
            <RecentMeals meals={meals} onDelete={loadMeals}/>
        </ScrollView>
    );
}