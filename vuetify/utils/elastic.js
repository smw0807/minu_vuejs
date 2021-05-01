/**
 * search 검색 결과에 나온 _source 데이터 추출 및 인데스명, _id값 추출해서 반환
 * @param {*} data 
 * @returns 
 */
function getSearchHits (data) {
  let rs = data.msg.hits.hits.flatMap((doc, idx) => {
    let rt = {};
    rt.index = doc._index;
    rt._id = doc._id;
    rt.type = doc._source.type;

    let key = Object.keys(doc._source.type);
    let val = doc._source[doc._source.type];
    for (key in val) {
      rt[key] = val[key];
    }
    
    return rt;
  })
  return rs;
}


export default {
  getSearchHits
}