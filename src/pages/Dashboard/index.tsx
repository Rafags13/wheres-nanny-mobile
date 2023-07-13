import { Dimensions, Text, View } from "react-native";
import {
    LineChart,
    BarChart,
} from 'react-native-chart-kit'
import { globalStyles } from "../../styles/global.styles";
import Background from "../../components/Background";
import { styles } from "./style";
import ServiceNannyCard from "../../components/ServiceNannyCard";
import { useQuery } from "react-query";
import { useContext, useEffect } from "react";
import { LoadingContext, LoadingContextType } from "../../context/LoadingContext";
import { NannyDashboardInformationDto } from "../../dto/Person/NannyDashboardInformationDto";
import { getDashboardInformation } from "../../services/requests/NannyRequests";
import NotFoundService from "../../components/NotFoundService";

export default function Dashboard() {
    const { setLoading } = useContext(LoadingContext) as LoadingContextType;
    const { data, isLoading } = useQuery('GetDashboardInformation', async () => {
        const response = await getDashboardInformation();

        return response.data;
    });

    const dashboardInformation: NannyDashboardInformationDto = data;

    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading]);

    if (isLoading) {
        return <>
        </>
    }

    return (
        <Background
            header={
                <View style={{ padding: 10, backgroundColor: '#F8FDFE' }}>
                    <Text style={globalStyles.headerTitle}>Painel de Controle</Text>
                </View>
            }
            isScroll
        >
            <View style={{ padding: 10 }}>

                <View>
                    {dashboardInformation.lastService ? (
                        <>
                            <Text style={styles.linechartTitle}>Último Serviço</Text>
                            <ServiceNannyCard
                                serviceId={data.lastService.serviceId}
                                clientName={data.lastService.clientName}
                                servicePrice={data.lastService.servicePrice}
                                hiringDate={data.lastService.hiringDate}
                                isFinished={data.lastService.hiringDate > new Date()}
                            />
                        </>
                    ) : (<NotFoundService />)}

                </View>

                <View>
                    <Text style={styles.linechartTitle}>Serviços nos últimos 6 meses</Text>
                    <LineChart
                        onDataPointClick={(data) => {
                            // TODO: Implement a function that send the user to visualize more this info.
                            if (data.value > 0) {

                            }
                        }}
                        data={{
                            labels: dashboardInformation.monthNames,
                            datasets: [
                                {
                                    data: dashboardInformation.countingServiceChart.map((value) => { return value.data })
                                }
                            ]
                        }}
                        width={Dimensions.get('window').width - 20}
                        height={220}
                        chartConfig={{
                            backgroundColor: '#3E9FEB',
                            backgroundGradientFrom: '#3E9FEB',
                            backgroundGradientTo: '#2e95e6',
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />

                    <Text style={styles.linechartTitle}>Projeção de ganhos</Text>
                    <BarChart
                        data={{
                            labels: dashboardInformation.monthNames,
                            datasets: [{
                                data: dashboardInformation.earnCountingChart.map((value) => { return value.data })
                            }]
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                        width={Dimensions.get('window').width - 20}
                        height={220}
                        yAxisLabel="$"
                        chartConfig={{
                            backgroundColor: '#000000',
                            backgroundGradientFrom: '#3E9FEB',
                            backgroundGradientTo: '#2e95e6',
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                                padding: 10
                            }
                        }}
                        verticalLabelRotation={30}
                        yAxisSuffix=""
                    />
                </View>

            </View>
        </Background>
    )
}