'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction() {
    //auto render template file index_index.html
    return this.display();
  }
  async loginAction() {
    let username = this.post('username');
    let password = this.post('password');
    if (username == 'admin' && password == 'admin') {
      await this.session('username', 'admin');
      this.success();
    } else {
      this.fail(1003);
    }
  }
}