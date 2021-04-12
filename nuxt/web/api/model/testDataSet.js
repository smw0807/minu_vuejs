const mg = require('mongoose');

const testDataSchema = new mg.Schema({
  sendDateTime: {type: Date, require: true},
	detectionDateTime: {type: Date, require: true},
	institutionCode: {type: String, require: true},
	institutionName: {type: String, require: true},
	equipCode: {type: String, require: true},
	equipIp: {type: String, require: true},
	packetSize: {type: Number, require: true},
	attackIp: {type: String, require: true},
	attackPort: {type: Number, require: true},
	victimIp: {type: String, require: true},
	victimPort: {type: Number, require: true},
	protocol: {type: Number, require: true},
	detectionRuleName: {type: String, require: true},
	payload: {type: String, require: true},
	detectionCount: {type: Number, require: true}
},
{ collection: 'testData'}); //collection 명칭 지정

testDataSchema.index({
  sendDateTime:1,
  detectionDateTime:1,
  institutionCode:1,
  institutionName:1,
  equipCode:1,
  equipIp:1,
  packetSize:1,
  attackIp:1,
  attackPort:1,
  victimIp:1,
  victimPort:1,
  protocol:1,
  detectionRuleName:1,
  payload:1,
  detectionCount:1
});

testDataSchema.statics.bulkInsert = function (models, fn) {
  if (!models || !models.length)
    return fn(null);

  let bulk = this.collection.initializeOrderedBulkOp();

  if (!bulk)
    return fn('bulkInsertModels: MongoDb connection is not yet established');

  let model;
  for (var i=0; i<models.length; i++) {
    model = models[i];
    bulk.insert(model);
  }
  bulk.execute(fn);
};

module.exports = mg.model('testData', testDataSchema);