import elasticsearch from 'elasticsearch'
const es_client = new elasticsearch.Client({
  hosts: [
    process.env.ES_HOST
  ]
})
module.exports = es_client;