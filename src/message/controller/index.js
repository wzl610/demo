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
  async addMessageAction() {//已验证
    let model = this.model('message');
    let userId = await this.session('username') || 'admin';
    let message = this.post('message');
    let messageId = await model.add({
      'send': userId,
      'receiver': this.post('receiver'),
      'message': message,
      'date': Date.now()
    });
    if (messageId) {
      this.success();
    } else {
      this.fail(1000);
    }
  }

  async queryAllMessageAction() {
    let model = this.model('message');
    let data = await model.where({receiver: 'admin'}).page(this.get("page"), 10).countSelect();
    this.success(data);
  }
  
  async queryMessageByUserAction() {
    let userId = await this.session('username');
    if (!userId) {
      this.fail(1004);
    }
    let model = this.model('message');
    let data = await model.where(`send = '${userId}' OR receiver = '${userId}'`).select();
    this.success(data);
  }

  async setReadAction() { //已验证
    let model = this.model('message');
    let messageId = this.post('messageId');
    let affectRow = await model.where({id: messageId}).update({isRead: 1});
    this.success(affectRow);
  }
}