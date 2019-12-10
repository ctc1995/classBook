import api from './api.js';
const app = new getApp();

class request {
  constructor() {
    this._api = new api
    this._api.setErrorHandler(this.errorHander)
  }

  /**
   * 统一的异常处理方法
   */
  errorHander(res) {
    console.log(res);
    wx.showToast({
      title: '数据请求失败，请重试',
      icon: 'none'
    })
  }
  /**
   * 获取用户授权
   */
  postAuth({code}) {
    return this._api.postRequest('user/WechatUserAuth',{
      authcode: code
    }).then(res=>res.data)
  }
  /**
   * 微信小程序获取用户信息
   */
  getUserInfo({ openid, encrypted_data, iv, referrer}){
    return this._api.postRequest('user/WechatUserInfo',{
      openid,
      encrypted_data,
      iv,
      referrer
    }).then(res=> res.data);
  }
  /**
   * 获取accesstoken
   * 28_4iUlOL04D0LYw_jnuhNMIuBt6WaipcCmd0dunRVk0pSy4ZageGG83nX6LzvvX-2KQbTaxGmZElm3TAiD3WG98kWtve1dGRbFkAmZyOSDEBePvh2Js4WdCZjqYLIvRHflvSScqtUhntu9K-jYTPFdAAALHX
   */
  getAccessToken(){
    return this._api.getRequest('user/access_token').then(res=> res.data)
  }
  /**
   * Banner图
   */
  getBanner() {
    return this._api.getRequest('Banner/Index').then(res => res.data)
  }
  /**关于我们 */
  getAboutUs() {
    return this._api.getRequest('User/AboutUs').then(res => res.data)
  }
  /**
   * 全部分类
   * new_upper最新上架 recommended_daily每日推荐 rare_treasures真品孤本
   */
  getCategory(type = 'new_upper ', page = 1) {
    return this._api.postRequest('goods/Category', {
      type,
      page
    }).then(res => res.data)
  }
  // 全部书单
  getBookList(number=10, page=1) {
    return this._api.postRequest('Booklist/Index', { number, page }).then(res => res.data)
  }
  // 书单内容
  getBookListDetail(book_id) {
    return this._api.postRequest('Booklist/book_good_list', { book_id }).then(res => res.data)
  }
  /**
   * 推荐书单
   * number: 分页数量 default: 10
   */
  getRecommendedlist({ number = 10, page = 1}){
    return this._api.postRequest('Booklist/Recommendedlist',{number,page}).then(res=>res.data)
  }
  /**
   * 最新上架-每日推荐-真品孤本-好书推荐
   * new_upper最新上架 recommended_daily每日推荐 rare_treasures真品孤本 is_home_recommended好书推荐
   */
  getGoodsRecommend({ type, number = 10, page = 1 }) {
    return this._api.postRequest('goods/goodsRecommend', { type, number, page }).then(res => res.data)
  }
  // 根据分类获取书籍
  getGoodsCategoryList(id) {
    return this._api.postRequest('goods/GoodsCategoryList', { category_id: id }).then(res => res.data)
  }
  /**
   * 全部分类
   * new_upper最新上架 recommended_daily每日推荐 rare_treasures真品孤本
   */
  getGoodsCategory({ type, page = 1, pid }) {
    return this._api.postRequest('goods/Category', { type, page, pid }).then(res => res.data)
  }
  /**
   * 商品详情 
   */
  getGoodsDetail(id){
    return this._api.postRequest('goods/detail', { goods_id: parseInt(id)}).then(res=> res.data)
  }
  //更多品相
  getProduct(isbn) {
    return this._api.getRequest('goods/Moreproducts', {isbn: isbn}).then(res => res.data)
  }
  // 相关推荐
  getRelatedRecommendations(id) {
    return this._api.postRequest('goods/Relatedrecommendations', { goods_id: parseInt(id) }).then(res => res.data)
  }
  /**
   * 搜索
   */
  getSearch({ number = 10, page = 1, keywords=""}){
    return this._api.postRequest('Search/Index', {number,page,keywords}).then(res=>res.data)
  }
  /**
   * 热搜榜
   */
  getHotsearchlist({ number = 3, page = 1 }) {
    return this._api.postRequest('goods/Hotsearchlist',{number,page}).then(res=>res.data)
  }
  /**
   * 收藏榜
   */
  getCollectionlist({ number = 3, page = 1 }) {
    return this._api.postRequest('goods/Collectionlist',{number,page}).then(res=>res.data)
  }
  /**
   * 热销榜
   */
  getHotlist({ number = 3, page = 1 }) {
    return this._api.postRequest('goods/Hotlist',{number,page}).then(res=>res.data)
  }
  /**
   * 作者列表 搜索作者
   */
  getAuthList({ page = 1, keywords }) {
    return this._api.postRequest('Author/index', { page, keywords }).then(res => res.data)
  }

  /**
   * 我的
   */
  //我的
  getAbout() {
    return this._api.getRequest('user/Center', { token: wx.getStorageSync('token')}).then(res=>res.data)
  }
  //书架-买过
  getBookBought (page=1) {
    return this._api.postRequest('user/bought', { token: wx.getStorageSync('token'), page }).then(res => res.data)
  }
  //书架-收藏
  getUserGoodsFavor(page=1) {
    return this._api.postRequest('UserGoodsFavor/Index', { token: wx.getStorageSync('token'), page }).then(res => res.data)
  }
  //优惠券
  getCoupon() {
    return this._api.postRequest('Coupon/Index', { token: wx.getStorageSync('token') }).then(res => res.data)
  }
  //全部收货地址
  getAddress() {
    return this._api.postRequest('UserAddress/Index', { token: wx.getStorageSync('token') }).then(res => res.data)
  }
  //收货地址详情
  getAddressDetail(id) {
    return this._api.postRequest('UserAddress/Detail', { token: wx.getStorageSync('token'), id }).then(res => res.data)
  }
  //新增收货地址
  postAddress({ name, province_name, city_name, county_name, address, tel, id}) {
    return this._api.postRequest('UserAddress/Save', { 
      token: wx.getStorageSync('token'), 
      id,
      name,
      province: province_name,
      city: city_name,
      county: county_name,
      address,
      tel }).then(res => res.data)
  }
  //删除收货地址
  delAddress(id) {
    return this._api.postRequest('UserAddress/Delete', { token: wx.getStorageSync('token'), id}).then(res => res.data)
  }
  //设置默认地址
  setDefaultAddress(id) {
    return this._api.postRequest('UserAddress/SetDefault', { token: wx.getStorageSync('token'), id }).then(res => res.data)
  }
  //修改个人信息
  modifyInfo({ nickname, gender, birthday, mobile, province, city, area, }) {
    return this._api.postRequest('User/PersonalSave', { token: wx.getStorageSync('token'), nickname, gender, birthday, mobile, province, city, area }).then(res => res.data)
  }
  /**
   * 订单
   */
  getOrderIndex({ type, page = 1, status}) {
    let obj = { 
      token: wx.getStorageSync('token'),
      page
    }
    if (type != 'all'){
      obj.is_more= 1;
      obj.status = status;
    }
    return this._api.postRequest('order/Index', obj).then(res => res.data)
  }
  getOrderAftersaleList(page = 1) {
    return this._api.postRequest('order/Aftersale_list', { token: wx.getStorageSync('token'), page }).then(res => res.data)
  }
  cancelOrder(id) {
    return this._api.postRequest('order/Cancel', { token: wx.getStorageSync('token'), id }).then(res => res.data)
  }
  // 收藏商品
  favorOrder(id, isbn) {
    return this._api.postRequest('goods/Favor', { token: wx.getStorageSync('token'), id, isbn }).then(res => res.data)
  }
  /**
   * 购物车
   */
  //购物车页面
  getCartIndex() {
    return this._api.postRequest('Cart/Index', { token: wx.getStorageSync('token') }).then(res => res.data)
  }
  getCartArri(goods_id = null, isbn = undefined, title = undefined, images = undefined) {
    let obj = { token: wx.getStorageSync('token') }
    if (isbn) {
      Object.assign(obj, { goods_id, isbn, title, images })
    } else {
      Object.assign(obj, { page: 1, number: 999 })
    }
    return this._api.postRequest('cart/Arrivalreminder', obj).then(res => res.data)
  }
  getCartArriList() {
    return this._api.postRequest('cart/ArrivalReminderlist', { token: wx.getStorageSync('token'), page: 1, number: 999 }).then(res => res.data)
  }
  // 加入购物车
  addCart({ stock = 1, goods_id}) {
    return this._api.postRequest('Cart/Save', { token: wx.getStorageSync('token'), stock, goods_id }).then(res => res.data)
  }
  // 购物车商品数量调整
  stockGoodsCart({ stock = 1, goods_id, id }) {
    return this._api.postRequest('cart/stock', { token: wx.getStorageSync('token'), stock: parseInt(stock), goods_id: parseInt(goods_id), id: parseInt(id) }).then(res => res.data)
  }
  // 删除购物车商品
  delGoodsCart(id){
    return this._api.postRequest('cart/Delete', { token: wx.getStorageSync('token'), id }).then(res => res.data)
  }
  // 购物车结算
  buyCart(ids, couponid) {
    return this._api.postRequest('buy/index', { token: wx.getStorageSync('token'), buy_type: 'cart', ids: ids.join(), coupon_id: couponid }).then(res => res.data)
  }
  // 立即购买
  buyNow({ goods_id, spec='' }) {
    return this._api.postRequest('buy/index', { token: wx.getStorageSync('token'), buy_type: 'goods', stock: 1, goods_id, spec }).then(res => res.data)
  }
  //确认订单
  buyAdd({ address_id, payment_id, ids, coupon_id, user_note, buy_type = 'cart', stock, goods_id, spec = '', isbn=0, wid	}) {
    return this._api.postRequest('buy/add', { token: wx.getStorageSync('token'), buy_type, payment_id, ids: ids.join(), address_id, coupon_id, user_note, stock, goods_id, spec, isbn, wid}).then(res => res.data)
  }
  getOrderDetail(id) {
    return this._api.postRequest('order/Detail', { token: wx.getStorageSync('token'), id }).then(res => res.data)
  }
  // 支付订单
  payOrder(id, payment_id){
    return this.get_request_url("pay", "order")
    // return this._api.postRequest('order/pay', { token: wx.getStorageSync('token'), id }).then(res => { console.log(res); res.data});
  }
  get_request_url(a, c, m, params) {
    a = a || "index";
    c = c || "index";
    m = m || "api";
    params = params || "";
    if (params != "" && params.substr(0, 1) != "&") {
      params = "&" + params;
    }
    var token = wx.getStorageSync('token');
    return (
      "https://dianshu.chaoshang666.com/index.php?s=/" + m + "/" + c + "/" + a +
      "&application=app&application_client_type=weixin" +
      "&token=" +
      token +
      "&ajax=ajax" +
      params
    );
  }
  // 退换信息
  getOrderAftersale(oid, did) {
    return this._api.postRequest('Order/Aftersale', { token: wx.getStorageSync('token'), oid, did }).then(res => res.data);
  }
  // 提交退换
  postOrserAftersale({ order_id, order_detail_id, money, reasonType, reason, remake, number, images }){
    return this._api.postRequest('order/Create', { token: wx.getStorageSync('token'), order_id, order_detail_id, type: reasonType, price: money, reason, msg: remake, number, images }).then(res => res.data);
  }
  // 确认收货
  orderCollect(id) {
    return this._api.postRequest('order/Collect', { token: wx.getStorageSync('token'), id }).then(res => res.data);
  }

  // 物流
  orderLogistics(id, number) {
    return this._api.postRequest('order/logistics', { token: wx.getStorageSync('token'), express_id: id, express_number: number }).then(res => res.data);
  }
}
export default request