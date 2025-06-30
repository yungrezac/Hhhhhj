import { View, Text, StyleSheet, Pressable, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, RotateCcw, Circle, Square, FlashlightOff as FlashOff, Slash as Flash, X, Check, GalleryVertical as Gallery } from 'lucide-react-native';

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<'off' | 'on'>('off');
  const [mode, setMode] = useState<'photo' | 'video'>('photo');
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedMedia, setCapturedMedia] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Loading camera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#000000', '#111111']}
          style={styles.background}
        >
          <View style={styles.permissionContainer}>
            <Camera color="#00D4FF" size={64} />
            <Text style={styles.permissionTitle}>Camera Access Required</Text>
            <Text style={styles.permissionMessage}>
              Wells needs camera access to let you capture and share your best tricks
            </Text>
            <Pressable style={styles.permissionButton} onPress={requestPermission}>
              <LinearGradient
                colors={['#00D4FF', '#0099CC']}
                style={styles.buttonGradient}
              >
                <Text style={styles.permissionButtonText}>Grant Permission</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const toggleFlash = () => {
    setFlash(current => (current === 'off' ? 'on' : 'off'));
  };

  const toggleMode = () => {
    setMode(current => (current === 'photo' ? 'video' : 'photo'));
  };

  const capturePhoto = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });
      setCapturedMedia(photo.uri);
    } catch (error) {
      Alert.alert('Error', 'Failed to capture photo');
    }
  };

  const startRecording = async () => {
    if (!cameraRef.current || isRecording) return;

    try {
      setIsRecording(true);
      const video = await cameraRef.current.recordAsync({
        quality: '1080p',
        maxDuration: 30,
      });
      setCapturedMedia(video.uri);
    } catch (error) {
      Alert.alert('Error', 'Failed to record video');
    } finally {
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };

  const handleCapture = () => {
    if (mode === 'photo') {
      capturePhoto();
    } else {
      if (isRecording) {
        stopRecording();
      } else {
        startRecording();
      }
    }
  };

  const discardMedia = () => {
    setCapturedMedia(null);
  };

  const shareMedia = () => {
    // In a real app, this would navigate to a post creation screen
    Alert.alert('Success', 'Ready to share your content!');
    setCapturedMedia(null);
  };

  if (capturedMedia) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedMedia }} style={styles.previewImage} />
          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'transparent', 'rgba(0,0,0,0.6)']}
            style={styles.previewOverlay}
          >
            <View style={styles.previewHeader}>
              <Pressable style={styles.discardButton} onPress={discardMedia}>
                <X color="#FFFFFF" size={24} />
              </Pressable>
            </View>
            <View style={styles.previewActions}>
              <Pressable style={styles.previewActionButton} onPress={discardMedia}>
                <Text style={styles.previewActionText}>Retake</Text>
              </Pressable>
              <Pressable style={styles.shareButton} onPress={shareMedia}>
                <LinearGradient
                  colors={['#00D4FF', '#0099CC']}
                  style={styles.shareButtonGradient}
                >
                  <Check color="#FFFFFF" size={20} />
                  <Text style={styles.shareButtonText}>Share</Text>
                </LinearGradient>
              </Pressable>
            </View>
          </LinearGradient>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CameraView 
        ref={cameraRef}
        style={styles.camera} 
        facing={facing}
        flash={flash}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.4)', 'transparent', 'rgba(0,0,0,0.6)']}
          style={styles.cameraOverlay}
        >
          {/* Top Controls */}
          <View style={styles.topControls}>
            <Pressable style={styles.controlButton} onPress={toggleFlash}>
              {flash === 'off' ? (
                <FlashOff color="#FFFFFF" size={24} />
              ) : (
                <Flash color="#FFFF00" size={24} />
              )}
            </Pressable>
            <View style={styles.modeSelector}>
              <Pressable
                style={[styles.modeButton, mode === 'photo' && styles.activeModeButton]}
                onPress={() => setMode('photo')}
              >
                <Text style={[styles.modeText, mode === 'photo' && styles.activeModeText]}>
                  Photo
                </Text>
              </Pressable>
              <Pressable
                style={[styles.modeButton, mode === 'video' && styles.activeModeButton]}
                onPress={() => setMode('video')}
              >
                <Text style={[styles.modeText, mode === 'video' && styles.activeModeText]}>
                  Video
                </Text>
              </Pressable>
            </View>
            <View style={styles.placeholder} />
          </View>

          {/* Bottom Controls */}
          <View style={styles.bottomControls}>
            <Pressable style={styles.galleryButton}>
              <Gallery color="#FFFFFF" size={24} />
            </Pressable>

            <Pressable
              style={[styles.captureButton, isRecording && styles.recordingButton]}
              onPress={handleCapture}
            >
              <View style={styles.captureButtonInner}>
                {mode === 'photo' ? (
                  <Circle color="#FFFFFF" size={32} />
                ) : (
                  <View style={[styles.recordIndicator, isRecording && styles.recordingIndicator]}>
                    {isRecording ? (
                      <Square color="#FFFFFF" size={20} fill="#FFFFFF" />
                    ) : (
                      <Circle color="#FF0000" size={20} fill="#FF0000" />
                    )}
                  </View>
                )}
              </View>
            </Pressable>

            <Pressable style={styles.flipButton} onPress={toggleCameraFacing}>
              <RotateCcw color="#FFFFFF" size={24} />
            </Pressable>
          </View>
        </LinearGradient>
      </CameraView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  background: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  message: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    gap: 24,
  },
  permissionTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  permissionMessage: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 24,
  },
  permissionButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 16,
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  permissionButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    padding: 4,
  },
  modeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  activeModeButton: {
    backgroundColor: '#00D4FF',
  },
  modeText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  activeModeText: {
    color: '#000000',
  },
  placeholder: {
    width: 48,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  galleryButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  recordingButton: {
    borderColor: '#FF0000',
  },
  captureButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordingIndicator: {
    backgroundColor: 'rgba(255,0,0,0.2)',
  },
  flipButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewContainer: {
    flex: 1,
  },
  previewImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  previewOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  discardButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  previewActionButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  previewActionText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  shareButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  shareButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 8,
  },
  shareButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});