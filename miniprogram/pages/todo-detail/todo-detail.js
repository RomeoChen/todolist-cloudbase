// miniprogram/pages/todo-detail/todo-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        text: 123,
        done: false,
        id: 1,
      },
      {
        text: 234,
        done: true,
        id: 2,
      },
      {
        text: 345,
        done: false,
        id: 3,
      },
    ],
    showActionsheet: false,
    groups: [
      { text: '删除', type: 'warn' },
    ],
    date: '2021年06月10日',
  },

  clickDeleteAll() {
    this.setData({
      showActionsheet: true
    })
  },

  deleteAll() {
    console.log('点击删除')
  },

  deleteTodoItem(e) {
    const { id } = e.target.dataset;
    const { list } = this.data;
    const index = list.findIndex(todo => todo.id === id)
    list.splice(index, 1);
    this.setData({ list })
  },

  toggleTodoItem(e) {
    const { list } = this.data
    const { item } = e.target.dataset
    const newItem = { ...item, done: !item.done }
    const index = list.findIndex((todo) => todo.id === item.id)
    list.splice(index, 1, newItem)
    this.setData({ list })
  },

  clickAddTodo(e) {
    this.setData({
      list: [ 
        ...this.data.list, 
        { text: '', done: false }
      ]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})