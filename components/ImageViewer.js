import React, { useState } from 'react';
import { View, Modal, Image, StyleSheet, TouchableOpacity, Dimensions, Text, Animated } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const ImageViewer = ({ route }) => {
    const { images, selectedImageIndex } = route.params;
    const [currentIndex, setCurrentIndex] = useState(selectedImageIndex);
    const [scale] = useState(new Animated.Value(1)); // Animated value for zoom scaling
    const [lastScale, setLastScale] = useState(1); // For tracking the scale in zoom gestures
    const [translateY] = useState(new Animated.Value(0)); // Only translate Y for swipe down
    const navigation = useNavigation();

    // Handling swipe down
    const handleSwipe = (event) => {
        const { translationY } = event.nativeEvent;
        Animated.timing(translateY, {
            toValue: translationY > 200 ? height : 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            if (translationY > 200) {
                navigation.navigate('ProductDetailsPage'); // Navigate to product details on swipe down
            }
        });
    };

    // Pinch gesture event handler for zoom
    const handlePinchGesture = Animated.event([{ nativeEvent: { scale: scale } }], {
        useNativeDriver: true,
    });

    // Save the last scale factor after the pinch is complete
    const handlePinchEnd = () => {
        scale.flattenOffset(); // Flattens the animation offset to ensure smooth scaling
        setLastScale(scale.__getValue()); // Store the final zoom scale
    };

    // Switch to the next image
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    // Switch to the previous image
    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <Modal animationType="slide" transparent={true} visible={true}>
                <View style={styles.modalContainer}>
                    {/* Pan Gesture for swipe down */}
                    <PanGestureHandler
                        onGestureEvent={Animated.event([{ nativeEvent: { translationY: handleSwipe } }], {
                            useNativeDriver: false,
                        })}
                        onHandlerStateChange={(event) => {
                            if (event.nativeEvent.state === State.END) handleSwipe(event);
                        }}
                    >
                        <Animated.View style={[styles.imageContainer, { transform: [{ translateY }] }]}>
                            {/* Pinch Gesture for zoom */}
                            <PinchGestureHandler
                                onGestureEvent={handlePinchGesture}
                                onHandlerStateChange={(event) => {
                                    if (event.nativeEvent.state === State.END) handlePinchEnd();
                                }}
                            >
                                <Animated.Image
                                    source={{ uri: images[currentIndex] }}
                                    style={[styles.image, { transform: [{ scale: scale }] }]} // Apply zoom scaling
                                    resizeMode="contain"
                                />
                            </PinchGestureHandler>
                        </Animated.View>
                    </PanGestureHandler>

                    {/* Navigation buttons */}
                    <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                        <Ionicons name="arrow-forward" size={30} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.previousButton} onPress={handlePrevious}>
                        <Ionicons name="arrow-back" size={30} color="white" />
                    </TouchableOpacity>

                    {/* Close button */}
                    <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'black',
        height: height,
        width: width,
        justifyContent: 'center',
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    closeButton: {
        position: 'absolute',
        bottom: 20,
        left: 30,
        right: 30,
        paddingVertical: 10,
        borderRadius: 25,
        backgroundColor: 'rgba(128, 128, 128, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        textAlign: 'center',
    },
    nextButton: {
        position: 'absolute',
        top: '50%',
        right: 20,
    },
    previousButton: {
        position: 'absolute',
        top: '50%',
        left: 20,
    },
});

export default ImageViewer;
