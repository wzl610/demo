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
      'from': userId,
      'to': this.post('to'),
      'message': message,
      'date': Date.now()
    });
    if (messageId) {
      this.success();
    } else {
      this.fail(1000, 'ADD ERROR');
    }
  }

  async queryAllMessageAction() {
    let model = this.model('message');
    let data = await model.where({to: 'admin'}).page(this.get("page"), 10).countSelect();
    this.success(data);
  }
  
  async queryMessageByUserAction() {
    let model = this.model('message');
    let userId = await this.session('userId');
    let data = await model.where(`from = ${userId} OR to = ${userId}`).select();
    this.success(data);
  }

  async setReadAction() { //已验证
    let model = this.model('message');
    let messageId = this.post('messageId');
    let affectRow = await model.where({id: messageId}).update({isRead: 1});
    this.success(affectRow);
  }
}