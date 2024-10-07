import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  Dimensions,
} from 'react-native';
import {LineChart, BarChart} from 'react-native-chart-kit';

interface PerformanceMetric {
  model: string;
  percentage: string;
}

interface R2Score {
  model: string;
  score: string;
}

const performanceMetrics: PerformanceMetric[] = [
  {model: 'ExtraTree', percentage: '93.70%'},
  {model: 'LinearRegression', percentage: '72.00%'},
  {model: 'XGBoost', percentage: '82.00%'},
  {model: 'RandomForest', percentage: '93.80%'},
];

const r2Scores: R2Score[] = [
  {model: 'ExtraTree', score: '0.89'},
  {model: 'LinearRegression', score: '0.37'},
  {model: 'XGBoost', score: '0.60'},
  {model: 'RandomForest', score: '0.90'},
];

const performanceData = {
  labels: performanceMetrics.map(metric => metric.model),
  datasets: [
    {
      data: performanceMetrics.map(metric => parseFloat(metric.percentage)),
    },
  ],
};

const r2Data = {
  labels: r2Scores.map(score => score.model),
  datasets: [
    {
      data: r2Scores.map(score => parseFloat(score.score)),
    },
  ],
};

const Charts: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <View style={styles.section}>
          <View style={styles.section22}>
            <Text style={styles.heading}>Performance Metrics</Text>
          </View>
        </View>
        <BarChart
          data={performanceData}
          width={Dimensions.get('window').width - 40} // from react-native
          height={220}
          yAxisLabel="%"
          yAxisSuffix="%"
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.section22}>
          <Text style={styles.heading}>R2 Scores</Text>
        </View>
        <LineChart
          data={r2Data}
          width={Dimensions.get('window').width - 40}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Airline Flight Price Prediction</Text>
        <View style={styles.socials}>
          <Text
            style={styles.socialLink}
            onPress={() =>
              Linking.openURL('https://github.com/raisulislampiaus')
            }>
            GitHub
          </Text>
          <Text
            style={styles.socialLink}
            onPress={() =>
              Linking.openURL('https://www.linkedin.com/in/raisulislampiaus/')
            }>
            LinkedIn
          </Text>
        </View>
        <Text style={styles.footerDescription}>
          A Machine learning Airline flight price prediction Mobile-application,
          built with Flask & React Native TypeScript
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  footer: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  socials: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  socialLink: {
    marginHorizontal: 10,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  footerDescription: {
    textAlign: 'center',
    color: '#000',
  },
  section22: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Charts;
