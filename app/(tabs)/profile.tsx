import { View, Text, StyleSheet, ScrollView, Pressable, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings, CreditCard as Edit3, MapPin, Calendar, Users, Heart, Camera, Grid3x3 as Grid3X3, Play } from 'lucide-react-native';
import { useState } from 'react';

const { width } = Dimensions.get('window');
const postSize = (width - 60) / 3;

interface UserStats {
  posts: number;
  followers: number;
  following: number;
  likes: number;
}

interface UserPost {
  id: string;
  type: 'photo' | 'video';
  thumbnail: string;
  likes: number;
}

const mockUser = {
  name: 'Alex Johnson',
  username: '@alexskates',
  avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
  bio: 'Pro skater 🛹 | BMX enthusiast 🚲 | Sharing the stoke daily ✨',
  location: 'Venice Beach, CA',
  joinDate: 'March 2023',
  verified: true,
  sport: 'skateboard',
};

const mockStats: UserStats = {
  posts: 127,
  followers: 15800,
  following: 892,
  likes: 45600,
};

const mockPosts: UserPost[] = [
  {
    id: '1',
    type: 'video',
    thumbnail: 'https://images.pexels.com/photos/1171743/pexels-photo-1171743.jpeg',
    likes: 1247,
  },
  {
    id: '2',
    type: 'photo',
    thumbnail: 'https://images.pexels.com/photos/2846495/pexels-photo-2846495.jpeg',
    likes: 892,
  },
  {
    id: '3',
    type: 'video',
    thumbnail: 'https://images.pexels.com/photos/6120/sunny-air-action-daylight.jpg',
    likes: 2341,
  },
  {
    id: '4',
    type: 'photo',
    thumbnail: 'https://images.pexels.com/photos/1171743/pexels-photo-1171743.jpeg',
    likes: 567,
  },
  {
    id: '5',
    type: 'video',
    thumbnail: 'https://images.pexels.com/photos/2846495/pexels-photo-2846495.jpeg',
    likes: 1834,
  },
  {
    id: '6',
    type: 'photo',
    thumbnail: 'https://images.pexels.com/photos/6120/sunny-air-action-daylight.jpg',
    likes: 924,
  },
];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<'posts' | 'liked'>('posts');

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
          <Text style={styles.headerTitle}>{mockUser.username}</Text>
          <Pressable style={styles.settingsButton}>
            <Settings color="#FFFFFF" size={24} />
          </Pressable>
        </View>

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {/* Profile Info */}
          <View style={styles.profileSection}>
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <Image source={{ uri: mockUser.avatar }} style={styles.avatar} />
                <LinearGradient
                  colors={[getSportColor(mockUser.sport), 'transparent']}
                  style={styles.avatarRing}
                />
                {mockUser.verified && (
                  <View style={[styles.verifiedBadge, { backgroundColor: getSportColor(mockUser.sport) }]}>
                    <Text style={styles.verifiedText}>✓</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.statsContainer}>
                <View style={styles.stat}>
                  <Text style={styles.statNumber}>{formatNumber(mockStats.posts)}</Text>
                  <Text style={styles.statLabel}>Posts</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statNumber}>{formatNumber(mockStats.followers)}</Text>
                  <Text style={styles.statLabel}>Followers</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statNumber}>{formatNumber(mockStats.following)}</Text>
                  <Text style={styles.statLabel}>Following</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statNumber}>{formatNumber(mockStats.likes)}</Text>
                  <Text style={styles.statLabel}>Likes</Text>
                </View>
              </View>
            </View>

            <View style={styles.profileDetails}>
              <Text style={styles.displayName}>{mockUser.name}</Text>
              <Text style={styles.bio}>{mockUser.bio}</Text>
              
              <View style={styles.metaInfo}>
                <View style={styles.metaItem}>
                  <MapPin color="#666666" size={14} />
                  <Text style={styles.metaText}>{mockUser.location}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Calendar color="#666666" size={14} />
                  <Text style={styles.metaText}>Joined {mockUser.joinDate}</Text>
                </View>
              </View>
            </View>

            <View style={styles.actionButtons}>
              <Pressable style={styles.editButton}>
                <Edit3 color="#00D4FF" size={16} />
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </Pressable>
              <Pressable style={styles.shareButton}>
                <Users color="#FFFFFF" size={16} />
                <Text style={styles.shareButtonText}>Share Profile</Text>
              </Pressable>
            </View>
          </View>

          {/* Content Tabs */}
          <View style={styles.tabsContainer}>
            <Pressable
              style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
              onPress={() => setActiveTab('posts')}
            >
              <Grid3X3 
                color={activeTab === 'posts' ? getSportColor(mockUser.sport) : '#666666'} 
                size={20} 
              />
              <Text style={[
                styles.tabText, 
                activeTab === 'posts' && { color: getSportColor(mockUser.sport) }
              ]}>
                Posts
              </Text>
            </Pressable>
            <Pressable
              style={[styles.tab, activeTab === 'liked' && styles.activeTab]}
              onPress={() => setActiveTab('liked')}
            >
              <Heart 
                color={activeTab === 'liked' ? getSportColor(mockUser.sport) : '#666666'} 
                size={20} 
              />
              <Text style={[
                styles.tabText, 
                activeTab === 'liked' && { color: getSportColor(mockUser.sport) }
              ]}>
                Liked
              </Text>
            </Pressable>
          </View>

          {/* Posts Grid */}
          <View style={styles.postsGrid}>
            {mockPosts.map((post) => (
              <Pressable key={post.id} style={styles.postItem}>
                <Image source={{ uri: post.thumbnail }} style={styles.postImage} />
                
                {post.type === 'video' && (
                  <View style={styles.videoIndicator}>
                    <Play color="#FFFFFF" size={16} fill="#FFFFFF" />
                  </View>
                )}
                
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.6)']}
                  style={styles.postOverlay}
                >
                  <View style={styles.postStats}>
                    <Heart color="#FFFFFF" size={12} fill="#FFFFFF" />
                    <Text style={styles.postLikes}>{formatNumber(post.likes)}</Text>
                  </View>
                </LinearGradient>
              </Pressable>
            ))}
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  settingsButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  profileSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 20,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  avatarRing: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#000000',
  },
  verifiedText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginTop: 2,
  },
  profileDetails: {
    marginBottom: 20,
  },
  displayName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  bio: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#CCCCCC',
    lineHeight: 22,
    marginBottom: 12,
  },
  metaInfo: {
    gap: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#00D4FF',
    gap: 8,
  },
  editButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#00D4FF',
  },
  shareButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    gap: 8,
  },
  shareButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'currentColor',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#666666',
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 2,
  },
  postItem: {
    width: postSize,
    height: postSize,
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  videoIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    padding: 4,
  },
  postOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  postStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  postLikes: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});