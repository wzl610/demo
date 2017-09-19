'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html
    let username = await this.session('username');
    if (username) {
      this.success();
    } else {
      this.fail(1004)
    }
  }
  async registerAction() {
    let username = this.post('username');
    let password = this.post('password');
    let model = this.model('person');
    let result = await model.thenAdd({username: username, password: password}, {username: username});
    if (result.type == 'add') {
      //添加成功
      await this.session('username', username);
      this.success();
    } else {
      //已存在
      this.fail(1001);
    }
  }
  async loginAction() {
    let username = this.post('username');
    let password = this.post('password');
    let model = this.model('person');
    let data = await model.where({username: username}).find();
    if (!data.password) {
      this.fail(1002);
    } else if (data.password !== password) {
      this.fail(1003);
    } else {
      await this.session('username', username);
      this.success();
    }
  }
}