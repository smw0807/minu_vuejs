import express from 'express'
import els from '../els'
import { salt_sha256 } from '../utils/sha256'

const router = express.Router();

const index_name = 'ni_setting';

router.post('/login', async (req, res) => {
  console.log('/api/es/login');
  const param = req.body;
  console.log(param);

});

router.post('/login/:id', async (req, res) => {
  console.log('/api/es/:id');
  const id = req.params.id;
  let error = false;
  let rs = {};
  try {
    const result = await els.search({
      index: index_name,
      type: '_doc',
      body: {
        "query":{
          "bool":{
            "must":[
              {"term":{"type":"user"}},
              {"term":{"user.user_id": id}}
            ]
          }
        }
      }
    })
    rs.error = error;
    rs.msg = result;
  } catch (err) {
    console.error(err);
    error = true;
    rs.error = error;
    rs.msg = err;
  }
  res.send({result: rs});
});

module.exports = router;