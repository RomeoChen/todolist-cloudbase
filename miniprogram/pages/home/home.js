// miniprogram/pages/home.js
const app = getApp()
const db = wx.cloud.database()
const todoDB = db.collection('todos')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    unfinishedTodos: [],
    finishedTodos: [],
    inputText: '',
    openid: '',
    tabIndex: '1',
    activeClass: 'active',
    showCreateModal: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await this.getOpenid()
    await this.getTodos()
  },

  async getTodos() {
    const { data: unfinishedTodos } = await todoDB.where({ done: false }).get();
    const { data: finishedTodos } = await todoDB.where({ done: true }).get();
    this.setData({ finishedTodos, unfinishedTodos })
  },

  tapTab(e) {
    const { tab } = e.currentTarget.dataset
    this.setData({ tabIndex: tab })
  },

  async getOpenid() {
    // 调用云函数获取 openid
    const res = await wx.cloud.callFunction({
      name: 'login',
      data: {},
    })
    const openid = res.result.openid
    this.setData({ openid })
  },

  /**
   * 更新 todo
   * @param {string} id 
   * @param {boolean} done 
   */
  async updateTodo(id, done) {
    await db.collection('todos').doc(id).update({
      data: { done },
    })
    await this.getTodos()
  },

  // 完成
  async doneTodo(event) {
    const { todo } = event.currentTarget.dataset
    console.log(todo);
    await this.updateTodo(todo._id, true)
  },

  // 取消完成
  async cancelDoneTodo(event) {
    const { todo } = event.currentTarget.dataset
    console.log(todo);
    await this.updateTodo(todo._id, false)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 点击添加 todo 事件
   */
  clickAddTodo() {
    this.setData({ showCreateModal: true })
  },

  /**
   * 关闭创建todo的modal
   */
  closeModal() {
    this.setData({ showCreateModal: false })
  },

  /**
   * 新建 todo
   */
  async createTodo(e) {
    const { title, type } = e.detail;
    await todoDB.add({
      data: {
        title,
        type,
        done: false,
        date: new Date(),
      }
    });
    await this.getTodos();
    this.setData({ showCreateModal: false })
  },

  /**
   * 点击 todo，进入详情页
   */
  clickTodo(event) {
    const { todo } = event.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/todo-detail/todo-detail?id=${todo._id}`,
    })
  }

})