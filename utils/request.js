import api from './api.js';

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
    console.error(res)
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
    return this._api.postRequest('user/Center', { token: this.token}).then(res=>res.data)
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
}
export default request