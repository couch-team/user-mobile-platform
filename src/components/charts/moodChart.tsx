import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, Text, View } from "react-native";
import { BarChart, LineChart } from "react-native-gifted-charts";
import { useSelector } from "react-redux";
import { $api } from "services";
import { RootState } from "store";
import { Colors, Typography } from "theme/config";
        
const MoodChart = () => {
    const { chart_data, chart_data_loading } = useSelector((state: RootState) => state.Mood)
    const { width } = Dimensions.get('window');
    const [ moods, setMoods ] = useState<any[]>([]);

    const fetchMoods = async() => {
        try{
            const response = await $api.fetch('/api/mood/mood/')
            if($api.isSuccessful(response)){
                setMoods(response?.data)
            }
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchMoods()
    },[])


    return ( chart_data?.length === 0 && !chart_data_loading ) ? <View></View> : (
        <View style={{ backgroundColor: '#FFFFFF0D', minHeight: 150, justifyContent: 'center', alignItems: 'center', paddingVertical: 24, borderRadius: 16, marginBottom: 32 }}>
            <Text style={{ color: '#D0D2F4', fontSize: 14, lineHeight: 17.6, letterSpacing: -0.48, marginBottom: 27  }}>Mood Tracking Graph</Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12, marginBottom: 20, }}
                data={moods}
                renderItem={({ item, index }) => {
                    return item.colour && (
                    <View
                        key={index}
                        style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                        <View style={{ width: 6, height: 6, borderRadius: 6, backgroundColor: item.colour }}></View>
                        <Text style={{ fontFamily: Typography.fontFamily.SoraRegular, fontSize: 12, color: Colors.WHITE }}>{item.title}</Text>
                    </View>
                    );
                }}
                />
            {
                chart_data_loading
                    ?
                    <ActivityIndicator size='small' color={Colors.WHITE}/>
                    : 
                    <BarChart 
                        stackData={chart_data?.map((dataToRender: any) => ({ label: dataToRender?.date?.split('-')[1] + '/' + dataToRender?.date?.split('-')[2], stacks: dataToRender?.data?.map((chartData: any) => ({ color: chartData?.colour, value: chartData?.count })) }))}
                        // color={'#7378DE'}
                        hideRules
                        xAxisColor="#7378DE"
                        yAxisColor="#7378DE"
                        yAxisTextStyle={{ color: '#fff' }}
                        xAxisLabelTextStyle={{ color: '#fff' }}
                        isAnimated
                        width={width - 130}
                    />
            }
        </View>
    );
};
export default MoodChart;