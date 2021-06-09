// pages/home/create-modal/create-modal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {
    title: '',
    type: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 关闭 modal
     */
    closeModal() {
      this.triggerEvent('close')
    },
    /**
     * 点击创建
     */
    clickCreate() {
      const { title, type } = this.data;
      if (!title || !type) {
        wx.showToast({
          title: '请填写标题并选择类型',
          icon: 'none',
        })
        return
      }
      this.triggerEvent('createTodo', { title, type })
    },
    /**
     * 切换类型
     */
    changeType(e) {
      this.setData({ type: e.target.dataset.type })
    }
  },
})
