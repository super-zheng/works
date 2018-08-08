Component({
  /**
   * 组件的属性列表
   */
  properties: {
    labelStr: {
      type: String,
      value: ''
    }, 
    initTimes:{
      type: Object,
      value: {}
    }, 
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindDateChange: function (e) {
      var times = this.data.initTimes;
      times[e.currentTarget.dataset.times] = e.detail.value;
      this.setData({
        initTimes: times
      })
      var setObj = this.data.initTimes;
      this.triggerEvent('getTimes', setObj);//发送条件更新详细信息数组
    },
  }
})
