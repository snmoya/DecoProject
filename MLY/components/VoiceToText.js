import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Voice from '@react-native-voice/voice';
import icons from '../data/icons';


const VoiceToText = ({ navigation }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcription, setTranscription] = useState('Press to start the transcription...');
    const [fontSize, setFontSize] = useState(18);

    useEffect(() => {
      Voice.onSpeechStart = speechStart;
      Voice.onSpeechResults = speechResults;
      Voice.onSpeechError = speechError;
  
      return () => {
          Voice.destroy().then(Voice.removeAllListeners);
      };
  }, []);

    const speechStart = () => {
        setTranscription('Listening...');
    };

    const speechResults = (event) => {
        setTranscription(event.value[0]);
    };

    const speechError = (error) => {
        //console.error('Speech recognition error:', error);
        setTranscription('Please try again');
    };

    const handleStartRecording = async () => {
        try {
            setIsRecording(true);
            await Voice.start('en-US'); 
        } catch (error) {
            //console.log('Error starting voice recognition:', error);
        }
    };

    const handleStopRecording = async () => {
        try {
            await Voice.stop();
            setIsRecording(false);
        } catch (error) {
            //console.log('Error stopping voice recognition:', error);
        }
    };

    const handleIncreaseFont = () => {
        setFontSize((prevSize) => prevSize < 30 ? prevSize + 2 : prevSize);
    }

    const handleDecreaseFont = () => {
        setFontSize((prevSize) => prevSize > 12 ? prevSize - 2 : prevSize);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Voice to Text</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={icons.close} style={styles.closeIcon} />
                </TouchableOpacity>
            </View>

            <View style={styles.fontSizeControls}>
                <Text style={styles.fontSizeText} >Font Size:</Text>
                <TouchableOpacity onPress={handleDecreaseFont}>
                  <Image source={icons.minus} style={styles.fontSizeIcons} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleIncreaseFont}>
                  <Image source={icons.more} style={styles.fontSizeIcons} />
                </TouchableOpacity>
            </View>

            <View style={styles.infoFrame}>
                <View style={styles.infoItem2}>
                    <View style={styles.textContainer}>
                        <Text style={[styles.transcriptionText, {fontSize}]}>{transcription}</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                onPress={isRecording ? handleStopRecording : handleStartRecording}
                style={styles.button}
            >
                <Text style={styles.buttonText}>
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8EDDF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingTop: 40,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  notificationItem: {
    padding: 15,
    backgroundColor: '#EFEFEF',
    marginBottom: 10,
    borderRadius: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationMessage: {
    fontSize: 14,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  infoItem2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#777',
    paddingLeft: 5,
    marginBottom: 5,
  },
  infoFrame: {
    backgroundColor: '#FFF8F3',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    paddingBottom: 200,
    //borderWidth: 1,
    //borderColor: '#D2C5B4',
  },
  ExampleinfoFrame: {
    backgroundColor: '#E3D8CC',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    //borderWidth: 1,
    //borderColor: '#D2C5B4',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'left',
  },
  transcriptionText: {
    fontSize: 18,
    color: '#333',
    marginTop: 5,
    paddingLeft: 5,
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'normal',
  },
  button: {
    backgroundColor: '#FFDEAB', 
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    width: '60%',
  },
  fontSizeControls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
},
  fontSizeIcons: {
    marginRight: 10,
    width: 24,
    height: 24,
  },
  fontSizeText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
    marginLeft: 10,
  },
});

export default  VoiceToText;