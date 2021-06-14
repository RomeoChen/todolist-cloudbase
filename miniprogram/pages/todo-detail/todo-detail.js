// miniprogram/pages/todo-detail/todo-detail.js
const db = wx.cloud.database()
const todoDB = db.collection('todos')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showActionsheet: false,
    groups: [
      { text: '删除', type: 'warn' },
    ],
    date: '2021年06月10日',
    todo: {},
  },

  clickDeleteAll() {
    this.setData({
      showActionsheet: true
    })
  },

  deleteAll() {
    console.log('点击删除')
  },

  toggleTodoItem(e) {
    const { list } = this.data
    const { item } = e.target.dataset
    const newItem = { ...item, done: !item.done }
    const index = list.findIndex((todo) => todo.id === item.id)
    list.splice(index, 1, newItem)
    this.setData({ list })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await this.getTodoDetail(options.id)
  },

  /**
   * 获取当前todo详情
   */
  async getTodoDetail(id) {
    const { data } = await todoDB.doc(id).get()
    this.setData({ todo: data })
    console.log(data)
  },

  /**
   * 完成/取消完成todo
   */
  async toggleTodoDone(e) {
    const { todo } = this.data;
    const done = !todo.done
    await todoDB.doc(todo._id).update({ data: { done }});
    await this.getTodoDetail(todo._id)
  },

  /**
   * 输入完content后更新
   */
  async updateTodoContent(e) {
    const { value } = e.detail;
    const { _id: todoId } = this.data.todo;
    await todoDB.doc(todoId).update({ data: { content: value }});
  },

  /**
   * 输入完title后更新
   */
  async updateTodoTitle(e) {
    const { value } = e.detail;
    const { _id: todoId } = this.data.todo;
    await todoDB.doc(todoId).update({ data: { title: value }});
  },

  /**
   * 添加检查项
   */
  async clickAddCheckItem() {
    const { content = [], _id } = this.data.todo
    const newContent = content.concat({text: '', done: false})
    this.setData({
      todo: { ...this.data.todo, content: newContent}
    })
    await todoDB.doc(_id).update({ data: { content: newContent }})
  },

  /**
   * 删除检查项
   */
  async clickDeleteCheckItem(e) {
    const { index } = e.target.dataset;
    console.log(index)
    const { content = [], _id } = this.data.todo
    content.splice(index, 1)
    this.setData({
      todo: { ...this.data.todo, content }
    })
    await todoDB.doc(_id).update({ data: { content }})
  },
})