import { View, Text, StyleSheet, ScrollView, Pressable, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, MapPin, TrendingUp, Filter } from 'lucide-react-native';
import { useState } from 'react';

interface Spot {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  sport: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  distance: string;
  checkins: number;
}

interface Rider {
  id: string;
  name: string;
  username: string;
  avatar: string;
  followers: number;
  sport: string;
  verified: boolean;
}

const mockSpots: Spot[] = [
  {
    id: '1',
    name: 'Venice Beach Skate Park',
    location: 'Venice, CA',
    image: 'https://images.pexels.com/photos/1171743/pexels-photo-1171743.jpeg',
    rating: 4.8,
    sport: ['skateboard', 'bmx'],
    difficulty: 'Intermediate',
    distance: '2.3 km',
    checkins: 1247,
  },
  {
    id: '2',
    name: 'Downtown Bowl',
    location: 'LA, CA',
    image: 'https://images.pexels.com/photos/6120/sunny-air-action-daylight.jpg',
    rating: 4.6,
    sport: ['skateboard', 'roller'],
    difficulty: 'Advanced',
    distance: '5.7 km',
    checkins: 892,
  },
  {
    id: '3',
    name: 'Central Park Paths',
    location: 'New York, NY',
    image: 'https://images.pexels.com/photos/2846495/pexels-photo-2846495.jpeg',
    rating: 4.4,
    sport: ['roller'],
    difficulty: 'Beginner',
    distance: '8.2 km',
    checkins: 634,
  },
];

const mockRiders: Rider[] = [
  {
    id: '1',
    name: 'Tony Martinez',
    username: '@tonymskate',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    followers: 12400,
    sport: 'Skateboard',
    verified: true,
  },
  {
    id: '2',
    name: 'Sarah Kim',
    username: '@sarahbmx',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    followers: 8900,
    sport: 'BMX',
    verified: false,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    username: '@mikerolls',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    followers: 15600,
    sport: 'Roller',
    verified: true,
  },
];

export default function DiscoverScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'spots' | 'riders'>('spots');

  const getSportColor = (sport: string) => {
    switch (sport.toLowerCase()) {
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
          <Text style={styles.headerTitle}>Discover</Text>
          <Text style={styles.headerSubtitle}>Find spots and riders near you</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search color="#666666" size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search spots, riders, or locations..."
              placeholderTextColor="#666666"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <Pressable style={styles.filterButton}>
            <Filter color="#00D4FF" size={20} />
          </Pressable>
        </View>

        {/* Tab Selector */}
        <View style={styles.tabSelector}>
          <Pressable
            style={[styles.tab, activeTab === 'spots' && styles.activeTab]}
            onPress={() => setActiveTab('spots')}
          >
            <MapPin color={activeTab === 'spots' ? '#000000' : '#666666'} size={16} />
            <Text style={[styles.tabText, activeTab === 'spots' && styles.activeTabText]}>
              Spots
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'riders' && styles.activeTab]}
            onPress={() => setActiveTab('riders')}
          >
            <TrendingUp color={activeTab === 'riders' ? '#000000' : '#666666'} size={16} />
            <Text style={[styles.tabText, activeTab === 'riders' && styles.activeTabText]}>
              Riders
            </Text>
          </Pressable>
        </View>

        {/* Content */}
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {activeTab === 'spots' ? (
            <View style={styles.spotsGrid}>
              {mockSpots.map((spot) => (
                <Pressable key={spot.id} style={styles.spotCard}>
                  <Image source={{ uri: spot.image }} style={styles.spotImage} />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.spotOverlay}
                  >
                    <View style={styles.spotInfo}>
                      <View style={styles.spotHeader}>
                        <Text style={styles.spotName}>{spot.name}</Text>
                        <View style={styles.ratingContainer}>
                          <Text style={styles.rating}>⭐ {spot.rating}</Text>
                        </View>
                      </View>
                      <Text style={styles.spotLocation}>📍 {spot.location}</Text>
                      <View style={styles.spotDetails}>
                        <View style={styles.sportTags}>
                          {spot.sport.map((sport, index) => (
                            <View 
                              key={index}
                              style={[styles.sportTag, { backgroundColor: getSportColor(sport) }]}
                            >
                              <Text style={styles.sportTagText}>
                                {sport.charAt(0).toUpperCase() + sport.slice(1)}
                              </Text>
                            </View>
                          ))}
                        </View>
                        <Text style={styles.spotDistance}>{spot.distance} away</Text>
                      </View>
                      <Text style={styles.checkins}>{formatNumber(spot.checkins)} check-ins</Text>
                    </View>
                  </LinearGradient>
                </Pressable>
              ))}
            </View>
          ) : (
            <View style={styles.ridersList}>
              {mockRiders.map((rider) => (
                <Pressable key={rider.id} style={styles.riderCard}>
                  <Image source={{ uri: rider.avatar }} style={styles.riderAvatar} />
                  <View style={styles.riderInfo}>
                    <View style={styles.riderHeader}>
                      <Text style={styles.riderName}>{rider.name}</Text>
                      {rider.verified && (
                        <View style={[styles.verifiedBadge, { backgroundColor: getSportColor(rider.sport) }]}>
                          <Text style={styles.verifiedText}>✓</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.riderUsername}>{rider.username}</Text>
                    <View style={styles.riderDetails}>
                      <Text style={styles.riderSport}>{rider.sport}</Text>
                      <Text style={styles.riderFollowers}>
                        {formatNumber(rider.followers)} followers
                      </Text>
                    </View>
                  </View>
                  <Pressable style={styles.followButton}>
                    <Text style={styles.followButtonText}>Follow</Text>
                  </Pressable>
                </Pressable>
              ))}
            </View>
          )}
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
  },
  filterButton: {
    backgroundColor: 'rgba(0,212,255,0.2)',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabSelector: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#00D4FF',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#666666',
  },
  activeTabText: {
    color: '#000000',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  spotsGrid: {
    paddingHorizontal: 20,
    gap: 16,
  },
  spotCard: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  spotImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  spotOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    justifyContent: 'flex-end',
  },
  spotInfo: {
    padding: 16,
  },
  spotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  spotName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    flex: 1,
  },
  ratingContainer: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  rating: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  spotLocation: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#CCCCCC',
    marginBottom: 8,
  },
  spotDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sportTags: {
    flexDirection: 'row',
    gap: 6,
  },
  sportTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sportTagText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
  },
  spotDistance: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999999',
  },
  checkins: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999999',
  },
  ridersList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  riderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    gap: 12,
  },
  riderAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  riderInfo: {
    flex: 1,
  },
  riderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  riderName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  verifiedBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedText: {
    fontSize: 8,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  riderUsername: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 4,
  },
  riderDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  riderSport: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#00D4FF',
  },
  riderFollowers: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999999',
  },
  followButton: {
    backgroundColor: '#00D4FF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 16,
  },
  followButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
  },
});