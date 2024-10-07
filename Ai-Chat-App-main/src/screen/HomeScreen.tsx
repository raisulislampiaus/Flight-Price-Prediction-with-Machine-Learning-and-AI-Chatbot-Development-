import React from 'react';
import {View, Text, StyleSheet, ScrollView, Linking} from 'react-native';

interface PerformanceMetric {
  model: string;
  percentage: string;
}

interface R2Score {
  model: string;
  score: string;
}

const performanceMetrics: PerformanceMetric[] = [
  {model: 'ExtratreeRegressor', percentage: '93.70%'},
  {model: 'Linear Regression', percentage: '72.00%'},
  {model: 'XGBoost', percentage: '82.00%'},
  {model: 'Random Forest Regressor', percentage: '93.80%'},
];

const r2Scores: R2Score[] = [
  {model: 'ExtratreeRegressor', score: '0.89'},
  {model: 'Linear Regression', score: '0.37'},
  {model: 'XGBoost', score: '0.60'},
  {model: 'Random Forest Regressor', score: '0.90'},
];

const HomeScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <View style={styles.section22}>
          <Text style={styles.heading}>Performance metrics</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Model accuracy</Text>
            <Text style={styles.tableHeader}>Percentages</Text>
          </View>
          {performanceMetrics.map((metric, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{metric.model}</Text>
              <Text style={styles.tableCell}>{metric.percentage}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.section22}>
          <Text style={styles.heading}>R2_Score</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Model</Text>
            <Text style={styles.tableHeader}>Score</Text>
          </View>
          {r2Scores.map((score, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{score.model}</Text>
              <Text style={styles.tableCell}>{score.score}</Text>
            </View>
          ))}
        </View>
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
          build with flask & React Native Typescript
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
  table: {
    borderWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
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

export default HomeScreen;
