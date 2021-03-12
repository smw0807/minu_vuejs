import elastic from 'elasticsearch';
import config from '../api/sv.config';


console.info("@@@@@@@@@@@@@@@@@@@init ellllllllllllll");

let hosts = [];

let els_conf = config.elastc;
els_conf.hosts.split(',').forEach((host)=>{	
	hosts.push({
		protocol: els_conf.proto, host: host, port: els_conf.port,auth: `${els_conf.id}:${els_conf.pass}`
	});					
});

let client = new elastic.Client({hosts:hosts, apiVersion:'7.4'});
module.exports = client;