import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, MessageCircle, UserPlus, Share, AtSign } from 'lucide-react-native';

interface Activity {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'share' | 'mention';
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  content?: string;
  post?: {
    image: string;
  };
  timestamp: string;
  isNew: boolean;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'like',
    user: {
      name: 'Tony Martinez',
      username: '@tonymskate',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    },
    post: {
      image: 'https://images.pexels.com/photos/1171743/pexels-photo-1171743.jpeg',
    },
    timestamp: '2m',
    isNew: true,
  },
  {
    id: '2',
    type: 'comment',
    user: {
      name: 'Sarah Kim',
      username: '@sarahbmx',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    },
    content: 'Sick trick bro! 🔥',
    post: {
      image: 'https://images.pexels.com/photos/1171743/pexels-photo-1171743.jpeg',
    },
    timestamp: '5m',
    isNew: true,
  },
  {
    id: '3',
    type: 'follow',
    user: {
      name: 'Mike Johnson',
      username: '@mikerolls',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    },
    timestamp: '15m',
    isNew: true,
  },
  {
    id: '4',
    type: 'share',
    user: {
      name: 'Emma Chen',
      username: '@emmabmx',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    },
    post: {
      image: 'https://images.pexels.com/photos/2846495/pexels-photo-2846495.jpeg',
    },
    timestamp: '1h',
    isNew: false,
  },
  {
    id: '5',
    type: 'mention',
    user: {
      name: 'Alex Rodriguez',
      username: '@alexskates',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    },
    content: 'Check out this spot! @you should try it',
    post: {
      image: 'https://images.pexels.com/photos/6120/sunny-air-action-daylight.jpg',
    },
    timestamp: '2h',
    isNew: false,
  },
  {
    id: '6',
    type: 'like',
    user: {
      name: 'Jessica Wong',
      username: '@jesswheels',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    },
    post: {
      image: 'https://images.pexels.com/photos/2846495/pexels-photo-2846495.jpeg',
    },
    timestamp: '3h',
    isNew: false,
  },
];

export default function ActivityScreen() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart color="#FF3040" size={20} fill="#FF3040" />;
      case 'comment':
        return <MessageCircle color="#00D4FF" size={20} />;
      case 'follow':
        return <UserPlus color="#39FF14" size={20} />;
      case 'share':
        return <Share color="#FF6B35" size={20} />;
      case 'mention':
        return <AtSign color="#9333EA" size={20} />;
      default:
        return <Heart color="#666666" size={20} />;
    }
  };

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case 'like':
        return 'liked your post';
      case 'comment':
        return 'commented on your post';
      case 'follow':
        return 'started following you';
      case 'share':
        return 'shared your post';
      case 'mention':
        return 'mentioned you in a post';
      default:
        return 'interacted with your content';
    }
  };

  const newActivities = mockActivities.filter(activity => activity.isNew);
  const olderActivities = mockActivities.filter(activity => !activity.isNew);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#000000', '#111111']}
        style={styles.background}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Activity</Text>
          <Text style={styles.headerSubtitle}>See what's happening with your content</Text>
        </View>

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {/* New Activities */}
          {newActivities.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>New</Text>
              {newActivities.map((activity) => (
                <Pressable key={activity.id} style={[styles.activityItem, styles.newActivity]}>
                  <View style={styles.activityIcon}>
                    {getActivityIcon(activity.type)}
                  </View>
                  <Image source={{ uri: activity.user.avatar }} style={styles.userAvatar} />
                  
                  <View style={styles.activityContent}>
                    <View style={styles.activityText}>
                      <Text style={styles.userName}>{activity.user.name}</Text>
                      <Text style={styles.actionText}> {getActivityText(activity)}</Text>
                    </View>
                    {activity.content && (
                      <Text style={styles.commentText}>"{activity.content}"</Text>
                    )}
                    <Text style={styles.timestamp}>{activity.timestamp} ago</Text>
                  </View>

                  {activity.post && (
                    <Image source={{ uri: activity.post.image }} style={styles.postThumbnail} />
                  )}
                  
                  {activity.isNew && <View style={styles.newIndicator} />}
                </Pressable>
              ))}
            </View>
          )}

          {/* Older Activities */}
          {olderActivities.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Earlier</Text>
              {olderActivities.map((activity) => (
                <Pressable key={activity.id} style={styles.activityItem}>
                  <View style={styles.activityIcon}>
                    {getActivityIcon(activity.type)}
                  </View>
                  <Image source={{ uri: activity.user.avatar }} style={styles.userAvatar} />
                  
                  <View style={styles.activityContent}>
                    <View style={styles.activityText}>
                      <Text style={styles.userName}>{activity.user.name}</Text>
                      <Text style={styles.actionText}> {getActivityText(activity)}</Text>
                    </View>
                    {activity.content && (
                      <Text style={styles.commentText}>"{activity.content}"</Text>
                    )}
                    <Text style={styles.timestamp}>{activity.timestamp} ago</Text>
                  </View>

                  {activity.post && (
                    <Image source={{ uri: activity.post.image }} style={styles.postThumbnail} />
                  )}
                </Pressable>
              ))}
            </View>
          )}

          {/* Empty State */}
          {mockActivities.length === 0 && (
            <View style={styles.emptyState}>
              <Heart color="#333333" size={64} />
              <Text style={styles.emptyTitle}>No activity yet</Text>
              <Text style={styles.emptyMessage}>
                When people interact with your posts, you'll see it here
              </Text>
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
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 8,
    position: 'relative',
  },
  newActivity: {
    backgroundColor: 'rgba(0,212,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(0,212,255,0.2)',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
    marginRight: 12,
  },
  activityText: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  actionText: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#CCCCCC',
  },
  commentText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#999999',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  postThumbnail: {
    width: 48,
    height: 48,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  newIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00D4FF',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
});