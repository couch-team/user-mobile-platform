import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import { BarChart, LineChart } from "react-native-gifted-charts";
import { $api } from "services";
import { Colors } from "theme/config";
        
const MoodChart = () => {
    const [ is_loading, setIsLoading ] = useState(false);
    const [ data, setData ] = useState<{ date: string, count: number }[]>([])
    const { width } = Dimensions.get('window');

    const fetchChartData = async() => {
        try{
            setIsLoading(true)
            const response = await $api.fetch('/api/mood/dates')
            if($api.isSuccessful(response)){
                setData(response?.data)
            }
        }
        catch(err){
            console.log(err)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchChartData()
    },[])

    const dataToRender = data?.map((chartData) => ({value:  chartData.count, dataPointText: chartData?.count?.toString(), label: chartData?.date?.split("-")[2] + '/' + chartData?.date?.split("-")[1] }))
    return ( data?.length === 0 && !is_loading ) ? <View></View> : (
        <View style={{ backgroundColor: '#FFFFFF0D', minHeight: 150, justifyContent: 'center', alignItems: 'center', paddingVertical: 24, borderRadius: 16, marginBottom: 32 }}>
            <Text style={{ color: '#D0D2F4', fontSize: 14, lineHeight: 17.6, letterSpacing: -0.48, marginBottom: 27  }}>Mood Tracking Graph</Text>
            {
                is_loading
                    ?
                    <ActivityIndicator size='small' color={Colors.WHITE}/>
                    : 
                    <LineChart 
                        areaChart 
                        data={dataToRender}
                        startFillColor="#7378DE"
                        startOpacity={0.8}
                        endFillColor="rgba(255, 255, 255, 0.5)"
                        endOpacity={0.3}
                        color={'#7378DE'}
                        thickness={3}
                        dataPointsColor={'#7378DE'}
                        hideRules
                        xAxisColor="#7378DE"
                        yAxisColor="#7378DE"
                        yAxisTextStyle={{ color: '#fff' }}
                        xAxisLabelTextStyle={{ color: '#fff' }}
                        curved
                        isAnimated
                        textColor1="#7378DE"
                        textShiftY={-3}
                        textShiftX={0}
                        textFontSize={12}
                        width={width - 130}
                    />
            }
        </View>
    );
};
export default MoodChart;