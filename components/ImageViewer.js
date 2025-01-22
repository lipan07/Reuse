import React, { useState, useRef } from 'react';
import { View, Modal, Image, StyleSheet, TouchableOpacity, Dimensions, Text, Animated, FlatList } from 'react-native';
import { GestureHandlerRootView, PinchGestureHandler } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const ImageViewer = ({ route }) => {
    const { images } = route.params;
    const navigation = useNavigation();
    const scales = useRef(images.map(() => new Animated.Value(1)));

    const handlePinchGesture = (index) => {
        return Animated.event([{ nativeEvent: { scale: scales.current[index] } }], {
            useNativeDriver: true
        });
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <Modal animationType="slide" transparent={true} visible={true}>
                <View style={styles.modalContainer}>
                    <FlatList
                        data={images}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => (
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
                        )}
                        keyExtractor={(_, index) => String(index)}
                    />
                    {/* Close button */}
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </GestureHandlerRootView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
    },
    imageContainer: {
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    buttonWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    closeButton: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ImageViewer;
