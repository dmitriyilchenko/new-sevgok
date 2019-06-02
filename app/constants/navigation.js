import { Platform } from 'react-native';


export const defaultOptions = {
  statusBar: {
    backgroundColor: 'white'
  },
  topBar: {
    visible: false,
    animate: false,
    height: 0,
  },
  layout: {
    backgroundColor: 'white',
    componentBackgroundColor: 'white',
    orientation: ['portrait']
  },
  animations: {
    setStackRoot: {
      ...Platform.select({
        ios: {
          enabled: true,
          waitForRender: true,
        },
        android: {
          enabled: true,
          waitForRender: false,
        }
      })
    },
    setRoot: {
      ...Platform.select({
        ios: {
          waitForRender: true,
          content: {
            enabled: true,
            waitForRender: true,
            alpha: {
              from: 0,
              to: 1,
              duration: 1000,
            }
          }
        },
        android: {
          enabled: true,
          waitForRender: false,
          alpha: {
            from: 0,
            to: 1,
            duration: 200,
          },
          y: {
            from: 100,
            to: 0,
            duration: 100
          }
        }
      })
    },
    push: {
      enabled: true,
      waitForRender: true,
    },
    showModal: {
      enabled: true,
      waitForRender: true
    },
  },
  bottomTabs: {
    backgroundColor: '#607D8B'
  },
  sideMenu: {
    openGestureMode: 'bezel',
    left: {
      width: 300,
      visible: false,
      enabled: true,
      shouldStretchDrawer: false,
    },
    right: {
      visible: false,
      enabled: false
    }
  }
}
