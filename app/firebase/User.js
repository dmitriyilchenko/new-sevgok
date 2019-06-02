import firebase from 'firebase';


class User {

  escapeEmailAddress(email) {
    if (!email) return false;

    email = email.toLowerCase();
    email = email.replace('.', ',');
    return email;
  }

  async getUser(email) {
    const usersRef = firebase.database().ref('Users/' + this.escapeEmailAddress(email, true));
    const snapshot = await usersRef.once('value');

    return snapshot.val();
  }

  async updateUser() {

  }

  async createUser(data) {
    const isExist = !!(await this.getUser(data.email));

    if (isExist) return false;

    const usersRef = firebase.database().ref('Users/');
    const newUser = usersRef.child(this.escapeEmailAddress(data.email));

    newUser.set(data);

    return data;
  }
}

export default new User;
