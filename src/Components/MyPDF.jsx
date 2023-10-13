import React, { useEffect } from 'react';
import newcertificate from '../Images/newcertificate.png';
import { Document, Page, Text, Image, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    height: '400px',
    width: '600px',
    padding: 0,
  },
  certificateContainer: {
    width: '100%',
    height: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    border: '1px solid black',
    margin: '20px',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'extrabold',
    marginBottom: 20,
    textDecoration: 'underline',
  },
  image: {
    width: '200px',
    height: 'auto',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
    position: 'relative',
    left: '50px',
    color: 'white',
    margin: '5px',
  },
  boldText: {
    fontWeight: 'extrabold',
    left: '50px',
    color: 'green',
    textAlign: 'center',
  },
  courseName: {
    fontWeight: 'extrabold',
    left: '40px',
    color: 'red',
    textAlign: 'center',
  },
  lernr: {
    fontWeight: 'extrabold',
    fontSize: 10,
    position: 'relative',
    color: 'white',
    top: '100px',
    textAlign: 'center',
  },
  pageBackground: {
    position: 'absolute',
    minWidth: '100%',
    minHeight: '100%',
    display: 'block',
    height: '100%',
    width: '100%',
  },
});

const MyPDF = (props) => {
  const { details, user } = props;

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.certificateContainer}>
          <Image style={styles.pageBackground} src={newcertificate} />
          <Text style={styles.text}>
            <Text style={styles.boldText}>{user?.username}</Text> who has successfully completed the course titled
          </Text>
          <Text style={styles.courseName}>{details?.course?.title}</Text>.
        </View>
      </Page>
    </Document>
  );
};

export default MyPDF;
