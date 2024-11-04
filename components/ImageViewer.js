import React, { useState, useRef, useEffect } from 'react';
import { View, Modal, Image, StyleSheet, TouchableOpacity, Dimensions, Text, Animated, FlatList } from 'react-native';
import { GestureHandlerRootView, PinchGestureHandler, State } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const ImageViewer = ({ route }) => {
    const { images, selectedImageIndex } = route.params;
    const navigation = useNavigation();
    const scales = useRef(images.map(() => new Animated.Value(1))); // Array of animated values for each image scale
    const flatListRef = useRef(null);

    const handlePinchGesture = (index) => Animated.event([{ nativeEvent: { scale: scales.current[index] } }], {
        useNativeDriver: true
    });

    // Ensure scales are reset when the user navigates to a new image
    useEffect(() => {
        scales.current.forEach(scale => scale.setValue(1));
    }, [selectedImageIndex]);

    return (
        <GestureHandlerRootView style={styles.container}>
            <Modal animationType="slide" transparent={true} visible={true}>
                <View style={styles.modalContainer}>
                    <FlatList
                        ref={flatListRef}
                        data={images}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={ev => {
                            const newIndex = Math.floor(ev.nativeEvent.contentOffset.x / width);
                            if (newIndex !== selectedImageIndex) {
                                scales.current[newIndex].setValue(1); // Reset scale on swipe to new image
                            }
                        }}
                        renderItem={({ item, index }) => (
                            <View style={{ width, height, justifyContent: 'center', alignItems: 'center' }}>
                                <PinchGestureHandler
                                    onGestureEvent={handlePinchGesture(index)}
                                >
                                    <Animated.View style={styles.imageContainer}>
                                        <Animated.Image
                                            source={{ uri: item }}
                                            style={[styles.image, { transform: [{ scale: scales.current[index] }] }]}
                                            resizeMode="contain"
                                        />
                                    </Animated.View>
                                </PinchGestureHandler>
                            </View>
                        )}
                        keyExtractor={(_, index) => String(index)}
                    />
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
        height: '100%',
        width: '100%',
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
        fontSize: 16,
        textAlign: 'center',
    },
});

export default ImageViewer;
