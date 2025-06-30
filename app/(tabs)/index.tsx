import { View, Text, StyleSheet, ScrollView, Pressable, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, MessageCircle, Share, MoveHorizontal as MoreHorizontal, Play } from 'lucide-react-native';
import { useState } from 'react';

const { width } = Dimensions.get('window');

interface Post {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  content: {
    type: 'video' | 'image';
    url: string;
    thumbnail?: string;
  };
  caption: string;
  location?: string;
  sport: 'skateboard' | 'bmx' | 'roller';
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  liked: boolean;
}

const mockPosts: Post[] = [
  {
    id: '1',
    user: {
      name: 'Alex Rodriguez',
      username: '@alexskates',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      verified: true,
    },
    content: {
      type: 'video',
      url: 'https://images.pexels.com/photos/1171743/pexels-photo-1171743.jpeg',
      thumbnail: 'https://images.pexels.com/photos/1171743/pexels-photo-1171743.jpeg',
    },
    caption: 'Just landed my first kickflip to manual! 🔥 Been working on this trick for weeks',
    location: 'Venice Beach Skate Park',
    sport: 'skateboard',
    likes: 1247,
    comments: 89,
    shares: 23,
    timestamp: '2h',
    liked: false,
  },
  {
    id: '2',
    user: {
      name: 'Emma Chen',
      username: '@emmabmx',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
      verified: false,
    },
    content: {
      type: 'image',
      url: 'https://images.pexels.com/photos/2846495/pexels-photo-2846495.jpeg',
    },
    caption: 'New spot discovered! This rail is perfect for grinding 💯',
    location: 'Downtown LA',
    sport: 'bmx',
    likes: 892,
    comments: 45,
    shares: 12,
    timestamp: '4h',
    liked: true,
  },
  {
    id: '3',
    user: {
      name: 'Marcus Johnson',
      username: '@rollermarcus',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
      verified: true,
    },
    content: {
      type: 'video',
      url: 'https://images.pexels.com/photos/6120/sunny-air-action-daylight.jpg',
      thumbnail: 'https://images.pexels.com/photos/6120/sunny-air-action-daylight.jpg',
    },
    caption: 'Sunset session at the bowl. Nothing beats this feeling! 🌅',
    location: 'Santa Monica Bowl',
    sport: 'roller',
    likes: 2341,
    comments: 156,
    shares: 78,
    timestamp: '6h',
    liked: false,
  },
];

export default function FeedScreen() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const toggleLike = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { 
              ...post, 
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
  };

  const getSportColor = (sport: string) => {
    switch (sport) {
      case 'skateboard': return '#00D4FF';
      case 'bmx': return '#39FF14';
      case 'roller': return '#FF6B35';
      default: return '#00D4FF';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#000000', '#111111']}
        style={styles.background}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Wells</Text>
          <Text style={styles.headerSubtitle}>What's happening today?</Text>
        </View>

        {/* Feed */}
        <ScrollView 
          style={styles.feed}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.feedContent}
        >
          {posts.map((post) => (
            <View key={post.id} style={styles.post}>
              {/* User Header */}
              <View style={styles.postHeader}>
                <View style={styles.userInfo}>
                  <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
                  <View style={styles.userDetails}>
                    <View style={styles.nameRow}>
                      <Text style={styles.userName}>{post.user.name}</Text>
                      {post.user.verified && (
                        <View style={[styles.verifiedBadge, { backgroundColor: getSportColor(post.sport) }]}>
                          <Text style={styles.verifiedText}>✓</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.username}>{post.user.username}</Text>
                    {post.location && (
                      <Text style={styles.location}>📍 {post.location}</Text>
                    )}
                  </View>
                </View>
                <View style={styles.postActions}>
                  <Text style={styles.timestamp}>{post.timestamp}</Text>
                  <Pressable style={styles.moreButton}>
                    <MoreHorizontal color="#666666" size={20} />
                  </Pressable>
                </View>
              </View>

              {/* Content */}
              <View style={styles.contentContainer}>
                <Image source={{ uri: post.content.url }} style={styles.contentImage} />
                {post.content.type === 'video' && (
                  <View style={styles.playButton}>
                    <Play color="#FFFFFF" size={24} fill="#FFFFFF" />
                  </View>
                )}
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.6)']}
                  style={styles.contentOverlay}
                />
              </View>

              {/* Caption */}
              <View style={styles.captionContainer}>
                <Text style={styles.caption}>{post.caption}</Text>
              </View>

              {/* Interaction Bar */}
              <View style={styles.interactionBar}>
                <View style={styles.leftActions}>
                  <Pressable
                    style={styles.actionButton}
                    onPress={() => toggleLike(post.id)}
                  >
                    <Heart
                      color={post.liked ? '#FF3040' : '#666666'}
                      size={22}
                      fill={post.liked ? '#FF3040' : 'none'}
                    />
                    <Text style={[styles.actionText, post.liked && styles.likedText]}>
                      {formatNumber(post.likes)}
                    </Text>
                  </Pressable>

                  <Pressable style={styles.actionButton}>
                    <MessageCircle color="#666666" size={22} />
                    <Text style={styles.actionText}>{formatNumber(post.comments)}</Text>
                  </Pressable>

                  <Pressable style={styles.actionButton}>
                    <Share color="#666666" size={22} />
                    <Text style={styles.actionText}>{formatNumber(post.shares)}</Text>
                  </Pressable>
                </View>

                <View style={[styles.sportBadge, { backgroundColor: getSportColor(post.sport) }]}>
                  <Text style={styles.sportText}>
                    {post.sport.charAt(0).toUpperCase() + post.sport.slice(1)}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </LinearGradient>
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
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginTop: 4,
  },
  feed: {
    flex: 1,
  },
  feedContent: {
    paddingBottom: 100,
  },
  post: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
    paddingBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  verifiedBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  username: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginTop: 2,
  },
  location: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999999',
    marginTop: 4,
  },
  postActions: {
    alignItems: 'flex-end',
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 8,
  },
  moreButton: {
    padding: 4,
  },
  contentContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  contentImage: {
    width: width,
    height: width * 0.75,
    resizeMode: 'cover',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -24 }, { translateY: -24 }],
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  captionContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  caption: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    lineHeight: 20,
  },
  interactionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  leftActions: {
    flexDirection: 'row',
    gap: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666666',
  },
  likedText: {
    color: '#FF3040',
  },
  sportBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  sportText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
  },
});