import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from 'react-native';
const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
useEffect(() => {
    setLockStatus("UNLOCKED")
}, [])
const handleWheelchairLocking = () => {
    fetch('http://127.0.0.1:5003/status_value').then(r=>r.json()).then(res =>{
    
    const { lock_status } = res;
    console.log("*****", res.lock_status)
    if (lock_status === "UNLOCKED") {
        setLockStatus("LOCKED")
    } else {
        Alert.alert("Wheelchair is already unlocked!")
    }
})
}
const setLockStatus = (status) => {
    fetch('http://127.0.0.1:5003/receive_resp', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({status})
  }).then(r=>r.json()).then(res =>{
    console.log(res)
    const { status } = res;
        Alert.alert(`Wheelchair is ${status === "UNLOCKED" ? 'unlocked':'locked'}` )
})
}

  return (
      <View style={styles.container}>

        <View style={[styles.sidebar, {left: menuOpen ? 0 : -200}]}>
          {menuItems.map((item, index) => (
            <View key={index} style={styles.sidebarItem}>
              <Text style={styles.sidebarItemText}>{item}</Text>
            </View>
          ))}
        </View>
        <View>
          <Text
            style={{
              fontSize: 24,
              marginBottom: 5,
              color: 'white',
              marginLeft: 5,
            }}>
            Hello{'\n'}Sharlin Markov
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexBasis: 100,
          }}>
          <View
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#1E90FF',
                padding: 30,
                flex: 1,
                borderRadius: 15,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 600,
                  textAlign: 'center',
                }}>
                Profile{'\n'} Details
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: 'orange',
                padding: 30,
                flex: 1,
                borderRadius: 15,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 600,
                  textAlign: 'center',
                }}>
                Emergency{'\n'} Details
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 10,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#404040',
                padding: 30,
                flex: 1,
                borderRadius: 15,
              }}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 20,
                  fontWeight: 600,
                  textAlign: 'center',
                }}>
                Emergency{'\n'} Activation
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={handleWheelchairLocking}
              style={{
                backgroundColor: '#404040',
                padding: 30,
                flex: 1,
                borderRadius: 15,
              }}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 20,
                  fontWeight: 600,
                  textAlign: 'center',
                }}>
                Lock Wheelchair
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 10,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#90EE90',
                padding: 25,
                flex: 1,
                borderRadius: 15,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  fontWeight: 600,
                  textAlign: 'center',
                }}>
                Maintenance{'\n'} Status
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                padding: 20,
                flex: 1,
                borderRadius: 15,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  fontWeight: 600,
                  textAlign: 'center',
                }}>
                Notifications
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
    backgroundColor: 'black',
  },
  menuIconContainer: {
    marginRight: 10,
  },
  menuIcon: {
    width: 30,
    height: 30,
    justifyContent: 'space-between',
  },
  iconLine: {
    width: '100%',
    height: 3,
    backgroundColor: '#1E90FF',
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
    marginLeft: 100,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: -200,
    width: 200,
    height: '100%',
    backgroundColor: '#eee',
    zIndex: 1,
    boxShadow: '2px 0 4px rgba(0, 0, 0, 0.3)',
    paddingTop: 60,
    overflow: 'hidden',
  },
  sidebarItem: {
    padding: 10,
    backgroundColor: '#ddd',
    marginBottom: 5,
    borderRadius: 5,
  },
  sidebarItemText: {
    fontSize: 16,
    color: '#333',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
export default Dashboard;
