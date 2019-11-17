import api from './api.js';

class request {
  constructor() {
    this._api = new api
    this._api.setErrorHandler(this.errorHander)
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
  getAuth({code}) {
    return this._api.getRequest('user/WechatUserAuth',{
      authcode: code
    }).then(res=>res.data)
  }
  /**
   * 微信小程序获取用户信息
   */
  getUserInfo({openid}){

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
  getGoodsCategory({ type = 'is_home_recommended', page = 1 }) {
    return this._api.postRequest('goods/Category', { type, page }).then(res => res.data)
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
}
export default request