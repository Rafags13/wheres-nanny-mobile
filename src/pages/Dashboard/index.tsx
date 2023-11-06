import { Dimensions, Text, View } from "react-native";
import {
    LineChart,
    BarChart,
} from 'react-native-chart-kit'
import { globalStyles } from "@styles/global.styles";
import { Background } from "@components/Background";
import { styles } from "./style";
import ServiceNannyCard from "@components/ServiceNannyCard";
import { useQuery } from "react-query";
import { NannyDashboardInformationDto } from "@dtos/Person/NannyDashboardInformationDto";
import { getDashboardInformation } from "@services/requests/NannyRequests";
import NotFoundService from "@components/NotFoundService";
import { Skeleton } from "moti/skeleton";
import useFakeApiCallRequests from "@hooks/useFakeApiCallRequest";
import Loader from "@components/Loader";

function DashboardSkeleton() {
    return (
        <Skeleton.Group show={true}>
            <View style={{ gap: 20, marginTop: 10 }}>
                <View style={{ gap: 20 }}>
                    <Loader width={100} height={20} colorMode="light" />
                    <Loader width={'100%'} height={70} colorMode="light" />
                </View>

                <View style={{ gap: 10 }}>
                    <Loader width={200} height={20} colorMode="light" />
                    <Loader width={Dimensions.get('window').width - 20} height={220} colorMode="light" />
                </View>

                <View style={{ gap: 10 }}>
                    <Loader width={150} height={20} colorMode="light" />

                    <Loader width={Dimensions.get('window').width - 20} height={220} colorMode="light" />
                </View>
            </View>
        </Skeleton.Group>
    )
}

export default function Dashboard() {

    async function onRefresh() {
        const response = await getDashboardInformation();
        dashboardInformation = response.data;
    }
    const { data, isLoading } = useQuery('GetDashboardInformation', async () => {
        const response = await getDashboardInformation();
        return response.data;
    });

    let dashboardInformation: NannyDashboardInformationDto = data;

    // TODO: change this to skeleton

    return (
        <Background.ScrollView scrollToTopFunction={onRefresh}>
            <Background.Header>
                <View style={{ padding: 10, backgroundColor: '#F8FDFE' }}>
                    <Text style={globalStyles.headerTitle}>Painel de Controle</Text>
                </View>
            </Background.Header>
            <View style={{ padding: 10 }}>
                {isLoading ? (<DashboardSkeleton />) : (
                    <>
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
                                    /* TODO: Add a funcionality to send nanny into new page and visualize her earn
                                     *  based in how person and how much she or he paid to her (display client name
                                     *       and all his payment in that month)
                                     */
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
                    </>
                )}


            </View>
        </Background.ScrollView>
    )
}