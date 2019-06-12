export default {
  en: 'English',
  ru: 'Russian',
  welcome: 'Hi',
  sign_in: {
    title: 'Enter your email',
    confirm_button: 'Login'
  },
  sign_up: {
    back: 'Back',
    title: 'Fill the next data',
    confirm_button: 'Next',
    fullname: 'Fullname',
    warehouse_id: 'Warehouse id'
  },
  cities: {
    ua_kyiv: 'Kyiv',
    ua_kryvoyrog: 'Krivoy Rog',
  },
  city: 'city',
  warehouse: 'warehouse',
  create_order: {
    sender_info: {
      title: 'Sender information',
      fullname: 'Fullname: ',
      warehouse: 'Warehouse: '
    },
    recipient_info: {
      title: 'Recipient information'
    },
    order_info: {
      title: 'Order information',
      description: 'Description: '
    },
    order_exist: {
      title: 'Error',
      description: 'Order with same id already exist'
    },
    same_warehouses: {
      title: 'Error',
      description: 'Point of departure and point of reception must be different'
    },
    empty_recipient: {
      title: 'Error',
      description: 'Fill recipient information'
    },
    success: {
      title: 'Successfully',
      description: 'Order successfully created.'
    },
    send: 'Send',
    clear: 'Clear'
  },
  profile: {
    new_warehouse: 'Select new warehouse',
    new_fullname: 'Type new fullname',
    update: 'Update',
    sign_out: 'Sign out'
  },
  language_modal: {
    title: 'Select language'
  },
  tabs: {
    notifications: 'Notifications',
    create_order: 'Create order',
    find_order: 'Find order',
    profile: 'Profile',
  },
  order: 'order',
  find_order: {
    status: 'Status:',
    sent_at: 'Sent at:',
    expected_delivery_time: 'Expected delivery time:',
    receive: 'Receive'
  },
  notification_types: {
    sent: 'sent',
    news: 'news',
    arrived: 'arrived',
    soon: 'soon'
  },
  notifications: {
    soon_description: {
      start: 'Will arrive in',
      hours: ' hours',
      and: 'and ',
      minutes: ' minutes',
      at_any_moment: 'a few minutes'
    },
    arrived_description: {
      just_arrived: 'Just arrived',
      arrived: 'Arrived ',
      hours: ' hours ago',
    },
    sent_description: 'Will be delivered in'
  }
};
