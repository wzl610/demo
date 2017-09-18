'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }
  async registerAction() {
    let username = this.post('username');
    let password = this.post('password');
    let model = this.model('person');
    let result = await model.thenAdd({username: username, password: password}, {username: username});
    if (result.type == 'add') {
      //添加成功
      await this.session('userinfo', username);
      this.success();
    } else {
      //已存在
      this.fail(1001, 'EXIST');
    }
  }
}