import { Navigation } from 'react-native-navigation';

import i18n from '../i18n';

export const LEFT_SIDE_MENU_ID = 'Drawer';
export const RIGHT_SIDE_MENU_ID = '';


function getId(side) {
  if (side === 'left') return LEFT_SIDE_MENU_ID;
  return RIGHT_SIDE_MENU_ID;
}

class Navigator {

  activeComponentId = null
  prevComponentId = null

  constructor() {
    this.drawerVisibility = {
      left: false,
      right: false
    };

    Navigation.events().registerComponentDidAppearListener(({ componentId }) => {
      if (this.activeComponentId !== componentId) {
        this.prevComponentId = this.activeComponentId
      }
      this.activeComponentId = componentId

      if (componentId === LEFT_SIDE_MENU_ID) {
        this.drawerVisibility.left = true;
      }

      if (componentId === RIGHT_SIDE_MENU_ID) {
        this.drawerVisibility.right = true;
      }
    })

    Navigation.events().registerComponentDidDisappearListener(
      ({ componentId, componentName }) => {
        if (componentId === LEFT_SIDE_MENU_ID) {
          this.drawerVisibility.left = false;
        }

        if (componentId === RIGHT_SIDE_MENU_ID) {
          this.drawerVisibility.right = false;
        }
      }
    );
  }

  push(componentId, screen, passProps = null, options = {}) {
    Navigation.push(componentId, {
      component: {
        id: screen,
        name: screen,
        passProps,
        options: {
          sideMenu: {
            left: {
              enabled: false
            }
          },
          ...options
        }
      },
    });
  }

  showModal(componentId, screen, passProps = null, options = {}) {
    Navigation.showModal({
      stack: {
        children: [{
          component: {
            id: screen,
            name: screen,
            passProps,
            options
          }
        }]
      }
    });
  }

  async updateTabsLabel() {
    Navigation.mergeOptions('Notifications', {
      bottomTab: {
        text: i18n.t('tabs.notifications')
      }
    });
    Navigation.mergeOptions('CreateOrder', {
      bottomTab: {
        text: i18n.t('tabs.create_order')
      }
    });
    Navigation.mergeOptions('FindOrder', {
      bottomTab: {
        text: i18n.t('tabs.find_order')
      }
    });
    Navigation.mergeOptions('Profile', {
      bottomTab: {
        text: i18n.t('tabs.profile')
      }
    });
  }

  setRootWithTabs() {
    Navigation.setRoot({
      root: {
        bottomTabs: {
          children: [{
            component: {
              id: 'Notifications',
              name: 'Notifications',
              options: {
                bottomTab: {
                  text: i18n.t('tabs.notifications'),
                  textColor: 'white',
                  iconColor: 'white',
                  fontFamily: 'OpenSans',
                  selectedIconColor: '#131E43',
                  selectedTextColor: '#131E43',
                  icon: require('../resourses/images/notification.png'),
                }
              }
            }
          }, {
            component: {
              id: 'CreateOrder',
              name: 'CreateOrder',
              options: {
                bottomTab: {
                  text: i18n.t('tabs.create_order'),
                  textColor: 'white',
                  iconColor: 'white',
                  fontFamily: 'OpenSans',
                  selectedIconColor: '#131E43',
                  selectedTextColor: '#131E43',
                  icon: require('../resourses/images/box.png'),
                }
              }
            }
          }, {
            component: {
              id: 'FindOrder',
              name: 'FindOrder',
              options: {
                bottomTab: {
                  text: i18n.t('tabs.find_order'),
                  textColor: 'white',
                  iconColor: 'white',
                  fontFamily: 'OpenSans',
                  selectedIconColor: '#131E43',
                  selectedTextColor: '#131E43',
                  icon: require('../resourses/images/search.png'),
                }
              }
            }
          }, {
            component: {
              id: 'Profile',
              name: 'Profile',
              options: {
                bottomTab: {
                  text: i18n.t('tabs.profile'),
                  textColor: 'white',
                  iconColor: 'white',
                  fontFamily: 'OpenSans',
                  selectedIconColor: '#131E43',
                  selectedTextColor: '#131E43',
                  icon: require('../resourses/images/avatar.png'),
                }
              }
            }
          }]
        }
      }
    })
  }

  setStackRoot(componentId, screen, passProps = null, options = {}) {
    Navigation.setStackRoot(componentId, [{
      component: {
        id: screen,
        name: screen,
        passProps,
        options
      }
    }])
  }

  setRoot(screen, passProps = null, options = {}, cb = () => null) {
    Navigation.setRoot({
      root: {
        stack: {
          children: [{
            component: {
              id: screen,
              name: screen,
              passProps,
              options
            }
          }]
        }
      }
    }).then(() => cb())
  }

  dismissAllModals() {
    Navigation.dismissAllModals()
  }

  dismissModal(componentId) {
    Navigation.dismissModal(componentId)
  }

  pop(componentId) {
    Navigation.pop(componentId);
  }

  popTo(componentId) {
    Navigation.pop(componentId);
  }

  openDrawer(componentId, side = 'left') {
    try {
      const id = getId(side);
      Navigation.mergeOptions(id, {
        sideMenu: {
          [side]: {
            visible: true
          }
        }
      });
      this.drawerVisibility[side] = true;
    } catch (error) { }
  }

  closeDrawer(componentId, side = 'left') {
    try {
      const id = getId(side);
      return Navigation.mergeOptions(id, {
        sideMenu: {
          [side]: {
            visible: false
          }
        }
      });
      this.drawerVisibility[side] = false;
    } catch (error) { }
  }

  toggleDrawer(componentId, side = 'left') {
    try {
      const drawerVisibility = !this.drawerVisibility[side];
      Navigation.mergeOptions(componentId, {
        sideMenu: {
          [side]: {
            visible: !this.drawerVisibility[side]
          }
        }
      });
      this.drawerVisibility[side] = drawerVisibility;
    } catch (error) { }
  }
}

export default new Navigator();
