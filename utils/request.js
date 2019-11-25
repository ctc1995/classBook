import api from './api.js';
const app = new getApp();

class request {
  constructor() {
    this._api = new api
    this._api.setErrorHandler(this.errorHander)
    this.token = wx.getStorageSync('token')
  }

  /**
   * 统一的异常处理方法
   */
  errorHander(res) {
    console.log(res);
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
  getSearch({ number = 10, page = 1, keyword=""}){
    return this._api.postRequest('Search/Index', {number,page,keyword}).then(res=>res.data)
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
    return this._api.getRequest('user/Center', { token: this.token}).then(res=>res.data)
  }
  //书架-买过
  getBookBought (page=1) {
    return this._api.postRequest('user/bought', { token: this.token, page }).then(res => res.data)
  }
  //书架-收藏
  getUserGoodsFavor(page=1) {
    return this._api.postRequest('UserGoodsFavor/Index', { token: this.token, page }).then(res => res.data)
  }
  //优惠券
  getCoupon() {
    return this._api.postRequest('Coupon/Index', { token: this.token }).then(res => res.data)
  }
  //全部收货地址
  getAddress() {
    return this._api.postRequest('UserAddress/Index', { token: this.token }).then(res => res.data)
  }
  //收货地址详情
  getAddressDetail(id) {
    return this._api.postRequest('UserAddress/Detail', { token: this.token, id }).then(res => res.data)
  }
  //新增收货地址
  postAddress({ name, province_name, city_name, county_name, address, tel, id}) {
    return this._api.postRequest('UserAddress/Save', { 
      token: this.token, 
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
    return this._api.postRequest('UserAddress/Delete', { token: this.token, id}).then(res => res.data)
  }
  //设置默认地址
  setDefaultAddress(id) {
    return this._api.postRequest('UserAddress/SetDefault', { token: this.token, id }).then(res => res.data)
  }
  //修改个人信息
  modifyInfo({ nickname, gender, birthday, mobile, province, city, address, }) {
    return this._api.postRequest('User/PersonalSave', { token: this.token, nickname, gender, birthday, mobile, province, city, address }).then(res => res.data)
  }
  /**
   * 订单
   */
  getOrderIndex({ type, page = 1, status}) {
    let obj = { 
      token: this.token,
      page,
      status
    }
    if (type != 'all'){
      obj.is_more= 1
    }
    return this._api.postRequest('order/Index', obj).then(res => res.data)
  }
  getOrderAftersaleList(page = 1) {
    return this._api.postRequest('order/Aftersale_list', { token: this.token, page }).then(res => res.data)
  }
  cancelOrder(id) {
    return this._api.postRequest('order/Cancel', { token: this.token, id }).then(res => res.data)
  }
  // 收藏商品
  favorOrder(id, isbn) {
    return this._api.postRequest('goods/Favor', { token: this.token, id, isbn }).then(res => res.data)
  }
  /**
   * 购物车
   */
  //购物车页面
  getCartIndex() {
    return this._api.postRequest('Cart/Index', { token: this.token }).then(res => res.data)
  }
  getCartArri() {
    return this._api.postRequest('cart/Arrivalreminder', { token: this.token, page:1, number: 999 }).then(res => res.data)
  }
  // 加入购物车
  addCart({ stock = 1, goods_id}) {
    return this._api.postRequest('Cart/Save', { token: this.token, stock, goods_id }).then(res => res.data)
  }
  // 购物车商品数量调整
  stockGoodsCart({ stock = 1, goods_id, id }) {
    return this._api.postRequest('cart/stock', { token: this.token, stock: parseInt(stock), goods_id: parseInt(goods_id), id: parseInt(id) }).then(res => res.data)
  }
  // 删除购物车商品
  delGoodsCart(id){
    return this._api.postRequest('cart/Delete', { token: this.token, id }).then(res => res.data)
  }
  // 购物车结算
  buyCart(ids) {
    return this._api.postRequest('buy/index', { token: this.token, buy_type: 'cart', ids: ids.join() }).then(res => res.data)
  }
  //确认订单
  buyAdd({ address_id, payment_id, ids, coupon_id, user_note}) {
    return this._api.postRequest('buy/add', { token: this.token, buy_type: 'cart', payment_id: 5, ids: ids.join(), address_id, coupon_id, user_note}).then(res => res.data)
  }
  // 支付订单
  payOrder(id){
    return this._api.postRequest('order/pay', { token: this.token, id}).then(res=> res.data);
  }
  // 退换信息
  getOrderAftersale(oid, did) {
    return this._api.postRequest('Order/Aftersale', { token: this.token, oid, did }).then(res => res.data);
  }
  // 提交退换
  postOrserAftersale({ order_id, order_detail_id, money, reasonType, reason, remake, number, images }){
    return this._api.postRequest('order/Create', { token: this.token, order_id, order_detail_id, type: reasonType, price: money, reason, msg: remake, number, images }).then(res => res.data);
  }
  // 确认收货
  orderCollect(id) {
    return this._api.postRequest('order/Collect', { token: this.token, id }).then(res => res.data);
  }

  // 物流
  orderLogistics(id, number) {
    return this._api.postRequest('order/logistics', { token: this.token, express_id: id, express_number: number }).then(res => res.data);
  }
}
export default request