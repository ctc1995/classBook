var pendPayOrderList = [
  // 等待付款
  {
    // 订单编号
    id: 20191023008912,
    // 收货地址
    delivery: {
      name: '张三丰',
      phone: '18977837849',
      address: '广东省深圳市南山区粤海街道9109号三诺智慧大厦'
    },
    // 订单商品
    goods: [
      {
        // 书名
        title: "我是个年轻人，我的脾气不太好",
        // 作者
        auth: "金庸",
        // 图书ID
        bookId: 2,
        // 图书封面
        pic: "book.jpg",
        // 原价
        price: "558.00",
        // 现价
        realPrice: "388.00",
        // 评分
        rate: 8.7,
        // 库存
        stock: 20,
        // 购买数量
        sum: 1,
      },
      {
        title: "我是个年轻人，我的脾气不太好",
        auth: "金庸",
        bookId: 2,
        pic: "book.jpg",
        price: "558.00",
        realPrice: "388.00",
        rate: 8.7,
        stock: 20,
        sum: 1,
      }
    ],
    // 订单状态
    status: 0,
    // 快递费用
    logisticsPrice: '6.00',
    // 订单费用
    orderTotal: '776.00',
    // 创建时间
    ctime: new Date().toLocaleString(),
    // 付款时间
    ptime: new Date().toLocaleString(),
    // 发货时间
    stime: new Date().toLocaleString(),
    // 物流信息
    logistics: [
      '下一站,深圳市南山邮局南油分局集散中心。',
      '百世物流已揽件',
    ],
  }
],
paidOrderList = [
  // 已付款未发货
  {
    // 订单编号
    id: 20191023008912,
    // 收货地址
    delivery: {
      name: '张三丰',
      phone: '18977837849',
      address: '广东省深圳市南山区粤海街道9109号三诺智慧大厦'
    },
    // 订单商品
    goods: [
      {
        // 书名
        title: "我是个年轻人，我的脾气不太好",
        // 作者
        auth: "金庸",
        // 图书ID
        bookId: 2,
        // 图书封面
        pic: "book.jpg",
        // 原价
        price: "558.00",
        // 现价
        realPrice: "388.00",
        // 评分
        rate: 8.7,
        // 库存
        stock: 20,
        // 购买数量
        sum: 1,
      },
      {
        title: "我是个年轻人，我的脾气不太好",
        auth: "金庸",
        bookId: 2,
        pic: "book.jpg",
        price: "558.00",
        realPrice: "388.00",
        rate: 8.7,
        stock: 20,
        sum: 1,
      }
    ],
    // 订单状态
    status: 1,
    // 快递费用
    logisticsPrice: '6.00',
    // 订单费用
    orderTotal: '776.00',
    // 创建时间
    ctime: new Date().toLocaleString(),
    // 付款时间
    ptime: new Date().toLocaleString(),
  },
  // 已发货
  {
    // 订单编号
    id: 20191023008912,
    // 收货地址
    delivery: {
      name: '张三丰',
      phone: '18977837849',
      address: '广东省深圳市南山区粤海街道9109号三诺智慧大厦'
    },
    // 订单商品
    goods: [
      {
        // 书名
        title: "我是个年轻人，我的脾气不太好",
        // 作者
        auth: "金庸",
        // 图书ID
        bookId: 2,
        // 图书封面
        pic: "book.jpg",
        // 原价
        price: "558.00",
        // 现价
        realPrice: "388.00",
        // 评分
        rate: 8.7,
        // 库存
        stock: 20,
        // 购买数量
        sum: 1,
      },
      {
        title: "我是个年轻人，我的脾气不太好",
        auth: "金庸",
        bookId: 2,
        pic: "book.jpg",
        price: "558.00",
        realPrice: "388.00",
        rate: 8.7,
        stock: 20,
        sum: 1,
      }
    ],
    // 订单状态
    status: 2,
    // 快递费用
    logisticsPrice: '6.00',
    // 订单费用
    orderTotal: '776.00',
    // 创建时间
    ctime: new Date().toLocaleString(),
    // 付款时间
    ptime: new Date().toLocaleString(),
    // 发货时间
    stime: new Date().toLocaleString(),
    // 物流信息
    logistics: [
      '下一站,深圳市南山邮局南油分局集散中心。',
      '百世物流已揽件',
    ],
  }
],
arrivedOrderList = [
  // 已完成订单
  {
    // 订单编号
    id: 20191023008912,
    // 收货地址
    delivery: {
      name: '张三丰',
      phone: '18977837849',
      address: '广东省深圳市南山区粤海街道9109号三诺智慧大厦'
    },
    // 订单商品
    goods: [
      {
        // 书名
        title: "我是个年轻人，我的脾气不太好",
        // 作者
        auth: "金庸",
        // 图书ID
        bookId: 2,
        // 图书封面
        pic: "book.jpg",
        // 原价
        price: "558.00",
        // 现价
        realPrice: "388.00",
        // 评分
        rate: 8.7,
        // 库存
        stock: 20,
        // 购买数量
        sum: 1,
      },
      {
        title: "我是个年轻人，我的脾气不太好",
        auth: "金庸",
        bookId: 2,
        pic: "book.jpg",
        price: "558.00",
        realPrice: "388.00",
        rate: 8.7,
        stock: 20,
        sum: 1,
      }
    ],
    // 订单状态
    status: 3,
    // 快递费用
    logisticsPrice: '6.00',
    // 订单费用
    orderTotal: '776.00',
    // 创建时间
    ctime: new Date().toLocaleString(),
    // 付款时间
    ptime: new Date().toLocaleString(),
    // 发货时间
    stime: new Date().toLocaleString(),
    // 物流信息
    logistics: [
      '下一站,深圳市南山邮局南油分局集散中心。',
      '百世物流已揽件',
    ],
  }
],
refundOrderList = [
  // 请等待商家处理
  {
    // 订单编号
    id: 20191023008912,
    // 收货地址
    delivery: {
      name: '张三丰',
      phone: '18977837849',
      address: '广东省深圳市南山区粤海街道9109号三诺智慧大厦'
    },
    // 订单商品
    goods: [
      {
        // 书名
        title: "我是个年轻人，我的脾气不太好",
        // 作者
        auth: "金庸",
        // 图书ID
        bookId: 2,
        // 图书封面
        pic: "book.jpg",
        // 原价
        price: "558.00",
        // 现价
        realPrice: "388.00",
        // 评分
        rate: 8.7,
        // 库存
        stock: 20,
        // 购买数量
        sum: 1,
      },
      {
        title: "我是个年轻人，我的脾气不太好",
        auth: "金庸",
        bookId: 2,
        pic: "book.jpg",
        price: "558.00",
        realPrice: "388.00",
        rate: 8.7,
        stock: 20,
        sum: 1,
      }
    ],
    // 订单状态
    status: 5,
    // 快递费用
    logisticsPrice: '6.00',
    // 订单费用
    orderTotal: '776.00',
    // 创建时间
    ctime: new Date().toLocaleString(),
    // 付款时间
    ptime: new Date().toLocaleString(),
    // 发货时间
    stime: new Date().toLocaleString(),
    // 物流信息
    logistics: [
      '下一站,深圳市南山邮局南油分局集散中心。',
      '百世物流已揽件',
    ],
  },
  // 请退货并填写物流信息
  {
    // 订单编号
    id: 20191023008912,
    // 收货地址
    delivery: {
      name: '张三丰',
      phone: '18977837849',
      address: '广东省深圳市南山区粤海街道9109号三诺智慧大厦'
    },
    // 订单商品
    goods: [
      {
        // 书名
        title: "我是个年轻人，我的脾气不太好",
        // 作者
        auth: "金庸",
        // 图书ID
        bookId: 2,
        // 图书封面
        pic: "book.jpg",
        // 原价
        price: "558.00",
        // 现价
        realPrice: "388.00",
        // 评分
        rate: 8.7,
        // 库存
        stock: 20,
        // 购买数量
        sum: 1,
      },
      {
        title: "我是个年轻人，我的脾气不太好",
        auth: "金庸",
        bookId: 2,
        pic: "book.jpg",
        price: "558.00",
        realPrice: "388.00",
        rate: 8.7,
        stock: 20,
        sum: 1,
      }
    ],
    // 订单状态
    status: 6,
    // 快递费用
    logisticsPrice: '6.00',
    // 订单费用
    orderTotal: '776.00',
  },
  // 退款成功
  {
    // 订单编号
    id: 20191023008912,
    // 收货地址
    delivery: {
      name: '张三丰',
      phone: '18977837849',
      address: '广东省深圳市南山区粤海街道9109号三诺智慧大厦'
    },
    // 订单商品
    goods: [
      {
        // 书名
        title: "我是个年轻人，我的脾气不太好",
        // 作者
        auth: "金庸",
        // 图书ID
        bookId: 2,
        // 图书封面
        pic: "book.jpg",
        // 原价
        price: "558.00",
        // 现价
        realPrice: "388.00",
        // 评分
        rate: 8.7,
        // 库存
        stock: 20,
        // 购买数量
        sum: 1,
      },
      {
        title: "我是个年轻人，我的脾气不太好",
        auth: "金庸",
        bookId: 2,
        pic: "book.jpg",
        price: "558.00",
        realPrice: "388.00",
        rate: 8.7,
        stock: 20,
        sum: 1,
      }
    ],
    // 订单状态
    status: 7,
    // 快递费用
    logisticsPrice: '6.00',
    // 订单费用
    orderTotal: '776.00',
  },
  // 换货成功
  {
    // 订单编号
    id: 20191023008912,
    // 收货地址
    delivery: {
      name: '张三丰',
      phone: '18977837849',
      address: '广东省深圳市南山区粤海街道9109号三诺智慧大厦'
    },
    // 订单商品
    goods: [
      {
        // 书名
        title: "我是个年轻人，我的脾气不太好",
        // 作者
        auth: "金庸",
        // 图书ID
        bookId: 2,
        // 图书封面
        pic: "book.jpg",
        // 原价
        price: "558.00",
        // 现价
        realPrice: "388.00",
        // 评分
        rate: 8.7,
        // 库存
        stock: 20,
        // 购买数量
        sum: 1,
      },
      {
        title: "我是个年轻人，我的脾气不太好",
        auth: "金庸",
        bookId: 2,
        pic: "book.jpg",
        price: "558.00",
        realPrice: "388.00",
        rate: 8.7,
        stock: 20,
        sum: 1,
      }
    ],
    // 订单状态
    status: 8,
    // 快递费用
    logisticsPrice: '6.00',
    // 订单费用
    orderTotal: '776.00',
  }
];
var allOrderList = [
  // 取消订单
  {
    // 订单编号
    id: 20191023008912,
    // 收货地址
    delivery: {
      name: '张三丰',
      phone: '18977837849',
      address: '广东省深圳市南山区粤海街道9109号三诺智慧大厦'
    },
    // 订单商品
    goods: [
      {
        // 书名
        title: "我是个年轻人，我的脾气不太好",
        // 作者
        auth: "金庸",
        // 图书ID
        bookId: 2,
        // 图书封面
        pic: "book.jpg",
        // 原价
        price: "558.00",
        // 现价
        realPrice: "388.00",
        // 评分
        rate: 8.7,
        // 库存
        stock: 20,
        // 购买数量
        sum: 1,
      },
      {
        title: "我是个年轻人，我的脾气不太好",
        auth: "金庸",
        bookId: 2,
        pic: "book.jpg",
        price: "558.00",
        realPrice: "388.00",
        rate: 8.7,
        stock: 20,
        sum: 1,
      }
    ],
    // 订单状态
    status: 4,
    // 快递费用
    logisticsPrice: '6.00',
    // 订单费用
    orderTotal: '776.00',
    // 创建时间
    ctime: new Date().toLocaleString(),
    // 付款时间
    ptime: new Date().toLocaleString(),
    // 发货时间
    stime: new Date().toLocaleString(),
    // 物流信息
    logistics: [
      '下一站,深圳市南山邮局南油分局集散中心。',
      '百世物流已揽件',
    ],
  }
];
allOrderList = allOrderList.concat(pendPayOrderList, paidOrderList, arrivedOrderList, refundOrderList);

module.exports={
  pendPayOrderList,
  paidOrderList,
  arrivedOrderList,
  refundOrderList,
  allOrderList
}