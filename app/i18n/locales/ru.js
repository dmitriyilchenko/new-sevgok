export default {
  en: 'Английский',
  ru: 'Русский',
  sign_in: {
    title: 'Введите свою почту',
    confirm_button: 'Вход'
  },
  sign_up: {
    back: 'Назад',
    title: 'Заполните следующую информацию',
    confirm_button: 'Дальше',
    fullname: 'Полное имя',
    warehouse_id: 'Номер склада'
  },
  cities: {
    ua_kyiv: 'Киев',
    ua_kryvoyrog: 'Кривой Рог',
  },
  city: 'город',
  warehouse: 'склад',
  create_order: {
    sender_info: {
      title: 'Информация о отправителе',
      fullname: 'Полное имя: ',
      warehouse: 'Номер склада: '
    },
    recipient_info: {
      title: 'Информация о получателе'
    },
    order_info: {
      title: 'Информация о заказе',
      description: 'Описание: '
    },
    order_exist: {
      title: 'Ошибка',
      description: 'Заказ с таким номером уже существует'
    },
    same_warehouses: {
      title: 'Ошибка',
      description: 'Точка отправления и точка получения должны быть разными'
    },
    empty_recipient: {
      title: 'Ошибка',
      description: 'Заполните информацию о получателе'
    },
    success: {
      title: 'Успешно',
      description: 'Заказ успешно создан'
    },
    send: 'Отправить',
    clear: 'Очистить'
  },
  profile: {
    new_warehouse: 'Выберите новый склад',
    new_fullname: 'Введите новое имя',
    update: 'Обновить',
    sign_out: 'Выйти'
  },
  language_modal: {
    title: 'Выберите язык'
  },
  tabs: {
    notifications: 'Уведомления',
    create_order: 'Создать заказ',
    find_order: 'Найти заказ',
    profile: 'Профиль',
  },
  order: 'заказ',
  find_order: {
    status: 'Статус:',
    sent_at: 'Отправлено:',
    expected_delivery_time: 'Ожидаемое время доставки:',
    receive: 'Получить'
  },
  notification_types: {
    sent: 'отправленные',
    news: 'новости',
    arrived: 'прибывшие',
    soon: 'скоро'
  },
  notifications: {
    soon_description: {
      start: 'Будет получен через',
      hours: ' часов',
      and: 'и ',
      minutes: ' минуты',
      at_any_moment: 'пару минут'
    },
    arrived_description: {
      just_arrived: 'Только прибыл',
      arrived: 'Прибыл ',
      hours: ' часов назад',
    },
    sent_description: 'Будет доставлен через'
  }
};
