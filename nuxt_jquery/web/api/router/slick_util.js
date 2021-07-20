function make_list_query(params) {
  console.table(params.filters);
  //! todo 쿼리 수정 꼭하기
  let q = {
    _source: {
      excludes: ["detec_file_content"]
    },
    size: params.size,
    query: {
      bool:{
        must: [
        ],
        must_not: [
        ]
      }
    },
    sort: {
      date_time : 'desc'
    }
  }

  if (params.filters.length !== 0) {
    /**
     * 필드별로 검색조건을 1개만 넣을 수 있으면 소스가 간단해지는데
     * 필드별로 여로개를 넣어야해서 필드당 bool - should를 사용해야하기 때문에
     * 각각 변수를 만들어서 처리를 하게끔함...
     */
    const filter = params.filters;
    //공격지 IP, Port
    let in_is_att_ip = false;
    let in_att_ip = [];
    let in_att_ip2 = []; //범위 검색일 때 사용
    let in_is_att_port = false;
    let in_att_port = [];
    //목적지 IP, Port
    let in_is_vt_ip = false;
    let in_vt_ip = [];
    let in_vt_ip2 = []; //범위 검색일 때 사용
    let in_is_vt_port = false;
    let in_vt_port = []; 
    //프로토콜
    let in_is_proto = false;
    let in_proto = [];
    //탐지규칙명
    let in_is_rule_name = false;
    let in_rule_name = [];

    //공격지 IP, Port
    let ex_is_att_ip = false;
    let ex_att_ip = [];
    let ex_att_ip2 = []; //범위 검색일 때 사용
    let ex_is_vt_port = false;
    let ex_vt_port = []; 
    //목적지 IP, Port
    let ex_is_vt_ip = false;
    let ex_vt_ip = [];
    let ex_vt_ip2 = []; //범위 검색일 때 사용
    let ex_is_att_port = false;
    let ex_att_port = [];
    //프로토콜
    let ex_is_proto = false;
    let ex_proto = [];
    //탐지규칙명
    let ex_is_rule_name = false;
    let ex_rule_name = [];

    for (var i in filter) {
      let val = filter[i];
      if (val.mode === 'include') {
        if (val.field === 'attack_ip') {
          in_is_att_ip = true;
          in_att_ip.push(val.data);
          if (val.data2) {
            in_att_ip2.push(val.data2);
          }
        } else if (val.field === 'attack_port') {
          in_is_att_port = true;
          in_att_port.push(val.data);
        } else if (val.field === 'victim_ip') {
          in_is_vt_ip = true;
          in_vt_ip.push(val.data);
          if (val.data2) {
            in_vt_ip2.push(val.data2);
          }
        } else if (val.field === 'victim_port') {
          in_is_vt_port = true;
          in_vt_port.push(val.data);
        } else if (val.field === 'type') {
          q.query.bool.must.push({"term":{"type": val.data}});
        } else if (val.field === 'proto') { //proto type이 integer라 와일드카드 검색이 안되기 때문에 무조건 term으로 검색
          in_is_proto = true;
          in_proto.push(val.data);
        } else if (val.field === 'rule_name') {
          in_is_rule_name = true;
          if (val.type === 'indirect') {
            in_rule_name.push({ "term": { "rule_name" : val.data }});
          } else {
            in_rule_name.push({ "wildcard": { "rule_name" : "*" + val.data + "*"}});
          }
        } else {
        }
      } else if (val.mode === 'exclude') {
        if (val.field === 'attack_ip') {
          ex_is_att_ip = true;
          ex_att_ip.push(val.data);
          if (val.data2) {
            ex_att_ip2.push(val.data2);
          }
        } else if (val.field === 'attack_port') {
          ex_is_att_port = true;
          ex_att_port.push(val.data);
        } else if (val.field === 'victim_ip') {
          ex_is_vt_ip = true;
          ex_vt_ip.push(val.data);
          if (val.data2) {
            ex_vt_ip2.push(val.data2);
          }
        } else if (val.field === 'victim_port') {
          ex_is_vt_port = true;
          ex_vt_port.push(val.data);
        } else if (val.field === 'type') {
          q.query.bool.must_not.push({"term":{"type": val.data}});
        } else if (val.field === 'proto') { //proto type이 integer라 와일드카드 검색이 안되기 때문에 무조건 term으로 검색
          ex_is_proto = true;
          ex_proto.push(val.data);
        } else if (val.field === 'rule_name') {
          ex_is_rule_name = true;
          if (val.type === 'indirect') {
            ex_rule_name.push({ "term": { "rule_name" : val.data }});
          } else {
            ex_rule_name.push({ "wildcard": { "rule_name" : "*" + val.data + "*"}});
          }
        } else {
        }
      }
    }

    //-----include
    if (in_is_att_ip) {
      let a = {bool:{ should:[]}}
      for (var i in in_att_ip) {
        if(in_att_ip2.length === 0) {
          a.bool.should.push({"range":{"attack_ip": {"gte": in_att_ip[i], "lte": in_att_ip[i] }}});
        } else {
          a.bool.should.push({"range":{"attack_ip": {"gte": in_att_ip[i], "lte": in_att_ip2[i] }}});
        }
      }
      q.query.bool.must.push(a);
    }
    if (in_is_att_port) {
      let a = {bool:{ should:[]}}
      for (var i in in_att_port) {
        a.bool.should.push({"term":{"attack_port": in_att_port[i]}});
      }
      q.query.bool.must.push(a);
    }
    if (in_is_vt_ip) {
      let a = {bool:{ should:[]}}
      for (var i in in_vt_ip) {
        if(in_vt_ip2.length === 0) {
          a.bool.should.push({"range":{"victim_ip": {"gte": in_vt_ip[i], "lte": in_vt_ip[i] }}});
        } else {
          a.bool.should.push({"range":{"victim_ip": {"gte": in_vt_ip[i], "lte": in_vt_ip2[i] }}});
        }
      }
      q.query.bool.must.push(a);
    }
    if (in_is_vt_port) {
      let a = {bool:{ should:[]}}
      for (var i in in_vt_port) {
        a.bool.should.push({"term":{"victim_port": in_vt_port[i]}});
      }
      q.query.bool.must.push(a);
    }
    if (in_is_proto) {
      let a = {bool:{ should:[]}}
      for (var i in in_proto) {
        a.bool.should.push({"term":{"proto": in_proto[i]}});
      }
      q.query.bool.must.push(a);
    }
    if (in_is_rule_name) {
      let a = {bool:{ should:[]}}
      for (var i in in_rule_name) {
        a.bool.should.push(in_rule_name[i]);
      }
      q.query.bool.must.push(a);
    }
    //-----exclude
    if (ex_is_att_ip) {
      let a = {bool:{ should:[]}}
      for (var i in ex_att_ip) {
        if (ex_att_ip2.length === 0) {
          a.bool.should.push({"range":{"attack_ip": {"gte": ex_att_ip[i], "lte": ex_att_ip[i] }}});
        } else {
          a.bool.should.push({"range":{"attack_ip": {"gte": ex_att_ip[i], "lte": ex_att_ip2[i] }}});
        }
      }
      q.query.bool.must_not.push(a);
    }
    if (ex_is_att_port) {
      let a = {bool:{ should:[]}}
      for (var i in ex_att_port) {
        a.bool.should.push({"term":{"attack_port": ex_att_port[i]}});
      }
      q.query.bool.must_not.push(a);
    }
    if (ex_is_vt_ip) {
      let a = {bool:{ should:[]}}
      for (var i in ex_vt_ip) {
        if(ex_vt_ip2.length === 0) {
          a.bool.should.push({"range":{"victim_ip": {"gte": ex_vt_ip[i], "lte": ex_vt_ip[i] }}});
        } else {
          a.bool.should.push({"range":{"victim_ip": {"gte": ex_vt_ip[i], "lte": ex_vt_ip2[i] }}});
        }
      }
      q.query.bool.must_not.push(a);
    }
    if (ex_is_vt_port) {
      let a = {bool:{ should:[]}}
      for (var i in iex_vt_port) {
        a.bool.should.push({"term":{"victim_port": ex_vt_port[i]}});
      }
      q.query.bool.must_not.push(a);
    }
    if (ex_is_proto) {
      let a = {bool:{ should:[]}}
      for (var i in ex_proto) {
        a.bool.should.push({"term":{"proto": iex_proto[i]}});
      }
      q.query.bool.must_not.push(a);
    }
    if (ex_is_rule_name) {
      let a = {bool:{ should:[]}}
      for (var i in ex_rule_name) {
        a.bool.should.push(ex_rule_name[i]);
      }
      q.query.bool.must.push(a);
    }
  }
  return q;
}

export default {
  make_list_query,
}