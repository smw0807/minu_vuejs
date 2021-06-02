'use strict';
define(['../_module'], function (controllers) {
	controllers.controller('MonitoringCtrl', function ($scope, $rootScope, $http, $element, $interval, $filter, $compile, $interpolate, cfpLoadingBar) {
		$(window).unbind("resize");
		POP_STAT = null;
		var log = WEB_LOG(false, "nct_smw_test : ");
		var el = $($element);
		var gAction = {list: '../threat/getListThreatMain', risk_code: "../threat/getRiskCodeData", att_type: "../threat/getAttackTypeData",
			scenarioData: '../threat/getThreatScenarioData', scenarioConditionData: '../threat/getThreatScenarioConditionData', att_types: "../threat/getListAttackType",
			analyze_file_check: '../threat/getAnalyze_file_check',
			mtmEvent: '../threat/getDataMTMfile', search_assets: '../threat/searchAttIpAssetsIp', user_columns: '../threat/getUserColumns', search_victim_assets: '../threat/searchDmgIpAssetsIp',
			searchTermList: '../threat/getThreatSearchTermList',
			fileDown: '../common/getOrignalFileDownload'
		};
		var sAction = {select: '../threat/setThreatSelects', anal_finish: '../threat/setThreatFinish'/* 소스 변경으로 삭제 예정 */, accept_accd: '../threat/setThreatAccident', analyze_file: '../threat/sendMaligFile',
			user_columns: '../threat/setUserColumns', searchTermAction: '../threat/setThreatSearchTermAction'
		};
		
		//var assets_name = $scope.$parent.assets_name;
		var risk_obj = $scope.$parent.risk_obj;
		var risk_v2_obj = $scope.$parent.risk_v2_obj;

		var risk_code = [];
		//var att_code = [];
		var scroll_id = "";
		var filter_data = [];
		var filter_list = {};
		var list_time;
		var rt_cnt = {tot_size: 0, rt_size: 1000};
		var pageConf = {scroll: 10, rtSize: 100};
		var pressing = false;
		$scope.auto = true; //@@EXP true일 떈 1분마다 리스트 리로드, false일 땐 고정
		var is_ecsc = true;
		if (NI_CONF.is_ecsc) {
			var mode = NI_CONF.is_ecsc == 'Y' ?  'ecsc y' : 'ecsc n';
			is_ecsc = NI_CONF.is_ecsc == 'Y' ?  true : false;
			log.info(mode);
			log.info(is_ecsc);
		}
		$(window).bind("resize", function () {
			var win_h = $(window).height();
			var head_h = $("#header").height();
			var mrg_h = (15 * 2) + (15 * 2) + (2 + 10) + (2 + 10);
			var list_h = win_h - (head_h + 1) - 30 - mrg_h;
			var wg_h = list_h - 50;
			el.find("#data_list").height(list_h + 5); //몸통
			el.find('#threat_list').height(list_h - 94);
			el.find('#threat_list .gradient').height(wg_h - 44);
			el.find('#threat_list .ui-widget').height(wg_h - 44);
			el.find('#threat_list .slick-viewport').height(wg_h + 5030);
			el.find('#threat_data .gradient').height(120);
			el.find('#threat_data .ui-widget').height(90);
			el.find('#threat_data .slick-viewport').height(65);
			angular.forEach(tbl, function (a, key) {
				a.resizeCanvas();
			});
		});
		//@@EXP 위험도 코드값 생성
		var getRiskCode = function () {
			$http.post(gAction.risk_code, $rootScope.http_config).then(function (rs) {
				risk_code = niCvUt.resDataResult(rs, "risk");
			});
		};
		getRiskCode();
		//@@EXP 공격유형 코드값 생성
		// var getAttackCodeData = function () {
		// 	$http.post(gAction.att_types, $rootScope.http_config).then(function (rs) {
		// 		att_code = niCvUt.resDataResult(rs, "attType");
		// 	});
		// };
		// getAttackCodeData();
		//@@EXP 위협경보 컬럼 그려주는 부분 ---------------
		var tbl = {
			threat_list: null
		};
		var It = {
			threat_list: []
		};
		var options = {
			editable: true,
			enableCellNavigation: true,
			asyncEditorLoading: false,
			enableAsyncPostRender: true,
			autoEdit: false,
			threat_pressing: true,
			enableTextSelectionOnCells: true
		};
		var columns = [];
		var cols_rank = [];
		var checkboxSelector = new Slick.CheckboxSelectColumn({
			cssClass: "slick-cell-checkboxsel"
		});

		//@@EXP 슬릭그리드에서 ng-click 기능을 사용할 수 있게 해주는 함수
		var scenarioRender = function (cellNode, row, dataContext, colDef) {
			var interpolated = $interpolate($(cellNode).html())($scope);
			var linker = $compile(interpolated);
			var htmlElements = linker($scope);
			$(cellNode).empty();
			$(cellNode).append(htmlElements);
		};
	
		//@@EXP 위험도 출력
		columns.push(checkboxSelector.getColumnDefinition()); //첫번째 컬럼에 체크박스 삽입
		if (typeof $.lcst('threat_monitoring') == 'undefined') {
			if (is_ecsc) {
				columns.push(
					{id: "_datetime", field: "_datetime", name: '수집일시', IS_USE: true, width: 180, cssClass: "text-center", formatter: $scope.$parent.view_time, sortable: true},
					{id: "RISK.RISK_VAL_0", field: "RISK.RISK_VAL_0", name: '위험도', IS_USE: true, width: 100, cssClass: "text-center", formatter: $scope.$parent.risk_rank, sortable: true},
					{id: "RISK.IN_SPEC_VAL_2_4", field: "RISK.IN_SPEC_VAL_2_4", name: '시나리오', IS_USE: true, width: 95, cssClass: "text-center", formatter: $scope.$parent.in_spec_2_4, sortable: true},
					{id: "SCEN_INFOS", field: "SCEN_INFOS", name: '시나리오 건수', IS_USE: true, width: 95, cssClass: "text-center", formatter: $scope.$parent.scen_count, sortable: true},
					{id: "GEAR_TYPE", field: "GEAR_TYPE", name: '장비유형', IS_USE: true, width: 95, cssClass: "text-center", formatter: $scope.$parent.gear_type, sortable: true},
					{id: "INST_NM", field: "INST_NM", name: '기관명', IS_USE: true, width: 130, cssClass: "text-center", formatter: $scope.$parent.fmtScenario, asyncPostRender: scenarioRender, sortable: true},
					{id: "TW_ATT_IP", field: "TW_ATT_IP", name: '출발지IP', IS_USE: true, width: 110, cssClass: "text-center", sortable: true},
					{id: "TW_ATT_PORT", field: "TW_ATT_PORT", name: '출발지 포트', IS_USE: true, width: 105, cssClass: "text-center", sortable: true},
					{id: "TW_DMG_IP", field: "TW_DMG_IP", name: '목적지IP', IS_USE: true, width: 110, cssClass: "text-center", sortable: true},
					{id: "TW_DMG_PORT", field: "TW_DMG_PORT", name: '목적지 포트', IS_USE: true, width: 105, cssClass: "text-center", sortable: true},
					{id: "RISK", field: "RISK", name: '자산구분', IS_USE: true, width: 105, cssClass: "text-center", sortable: true, formatter: $scope.$parent.assets_check},
					{id: "TW_ATT_CT_CODE", field: "TW_ATT_CT_CODE", name: '해외IP', IS_USE: true, width: 90, cssClass: "text-center", sortable: true, formatter: $scope.$parent.ct_ip_check},
					{id: "DRULE_NM", field: "DRULE_NM", name: '공격명', IS_USE: true, width: 150, cssClass: "text-center", sortable: true},
					{id: "DRULE_ATT_TYPE_CODE1", field: "DRULE_ATT_TYPE_CODE1", name: '공격유형', IS_USE: true, width: 100, cssClass: "text-center", formatter: $scope.$parent.att_types, sortable: true},
					{id: "TW_PROTO_NM", field: "TW_PROTO_NM", name: '프로토콜', IS_USE: true, width: 100, cssClass: "text-center", sortable: true, formatter: $scope.$parent.proto_type},
					{id: "TW_PATTERN_STR", field: "TW_PATTERN_STR", name: '패턴문자열', IS_USE: true, width: 105, cssClass: "text-center", sortable: true},
					{id: "TW_MALIG_FILE_NM", field: "TW_MALIG_FILE_NM", name: '악성의심파일명', IS_USE: true, width: 130, cssClass: "text-center", sortable: true},
					{id: "TW_DETECT_CNT", field: "TW_DETECT_CNT", name: '탐지건수', IS_USE: true, width: 100, cssClass: "text-center", sortable: true},
					{id: "TW_ID", field: "TW_ID", name: '위협경보ID', IS_USE: true, width: 110, cssClass: "text-center", sortable: true}
				);
			} else {
				columns.push(
					{id: "_datetime", field: "_datetime", name: '수집일시', IS_USE: true, width: 180, cssClass: "text-center", formatter: $scope.$parent.view_time, sortable: true},
					{id: "RISK.RISK_VAL_0", field: "RISK.RISK_VAL_0", name: '위험도', IS_USE: true, width: 100, cssClass: "text-center", formatter: $scope.$parent.risk_rank, sortable: true},
					{id: "RISK.IN_SPEC_VAL_2_4", field: "RISK.IN_SPEC_VAL_2_4", name: '시나리오', IS_USE: true, width: 95, cssClass: "text-center", formatter: $scope.$parent.in_spec_2_4, sortable: true},
					{id: "SCEN_INFOS", field: "SCEN_INFOS", name: '시나리오 건수', IS_USE: true, width: 95, cssClass: "text-center", formatter: $scope.$parent.scen_count, sortable: true},
					{id: "GEAR_TYPE", field: "GEAR_TYPE", name: '장비유형', IS_USE: true, width: 95, cssClass: "text-center", formatter: $scope.$parent.gear_type, sortable: true},
					{id: "INST_NM", field: "INST_NM", name: '기관명', IS_USE: true, width: 130, cssClass: "text-center", formatter: $scope.$parent.fmtScenario, asyncPostRender: scenarioRender, sortable: true},
					{id: "TW_ATT_IP", field: "TW_ATT_IP", name: '출발지IP', IS_USE: true, width: 110, cssClass: "text-center", sortable: true},
					{id: "TW_ATT_PORT", field: "TW_ATT_PORT", name: '출발지 포트', IS_USE: true, width: 105, cssClass: "text-center", sortable: true},
					{id: "TW_DMG_IP", field: "TW_DMG_IP", name: '목적지IP', IS_USE: true, width: 110, cssClass: "text-center", sortable: true},
					{id: "TW_DMG_PORT", field: "TW_DMG_PORT", name: '목적지 포트', IS_USE: true, width: 105, cssClass: "text-center", sortable: true},
					{id: "RISK", field: "RISK", name: '자산구분', IS_USE: true, width: 105, cssClass: "text-center", sortable: true, formatter: $scope.$parent.assets_check},
					{id: "TW_ATT_CT_CODE", field: "TW_ATT_CT_CODE", name: '해외IP', IS_USE: true, width: 90, cssClass: "text-center", sortable: true, formatter: $scope.$parent.ct_ip_check},
					{id: "DRULE_NM", field: "DRULE_NM", name: '공격명', IS_USE: true, width: 150, cssClass: "text-center", sortable: true},
					{id: "DRULE_ATT_TYPE_CODE1", field: "DRULE_ATT_TYPE_CODE1", name: '공격유형', IS_USE: true, width: 100, cssClass: "text-center", formatter: $scope.$parent.att_types, sortable: true},
					{id: "TW_PROTO_NM", field: "TW_PROTO_NM", name: '프로토콜', IS_USE: true, width: 100, cssClass: "text-center", sortable: true, formatter: $scope.$parent.proto_type},
					{id: "TW_PATTERN_STR", field: "TW_PATTERN_STR", name: '패턴문자열', IS_USE: true, width: 105, cssClass: "text-center", sortable: true},
					{id: "TW_MALIG_FILE_NM", field: "TW_MALIG_FILE_NM", name: '악성의심파일명', IS_USE: true, width: 130, cssClass: "text-center", sortable: true},
					{id: "TW_DETECT_CNT", field: "TW_DETECT_CNT", name: '탐지건수', IS_USE: true, width: 100, cssClass: "text-center", sortable: true},
					{id: "TW_ID", field: "TW_ID", name: '위협경보ID', IS_USE: true, width: 110, cssClass: "text-center", sortable: true}
				);
			}
		} else {
			if(is_ecsc) {
				columns.push(
					{id: "_datetime", field: "_datetime", name: '수집일시', IS_USE: true, width: $.lcst('threat_monitoring').save_data[1], cssClass: "text-center", formatter: $scope.$parent.view_time, sortable: true},
					{id: "RISK.RISK_VAL_0", field: "RISK.RISK_VAL_0", name: '위험도', IS_USE: true, width: $.lcst('threat_monitoring').save_data[2], cssClass: "text-center", formatter: $scope.$parent.risk_rank, sortable: true},
					{id: "RISK.IN_SPEC_VAL_2_4", field: "RISK.IN_SPEC_VAL_2_4", name: '시나리오', IS_USE: true, width: $.lcst('threat_monitoring').save_data[3], cssClass: "text-center", formatter: $scope.$parent.in_spec_2_4, sortable: true},
					{id: "SCEN_INFOS", field: "SCEN_INFOS", name: '시나리오 건수', IS_USE: true, width: $.lcst('threat_monitoring').save_data[4], cssClass: "text-center", formatter: $scope.$parent.scen_count, sortable: true},
					{id: "GEAR_TYPE", field: "GEAR_TYPE", name: '장비유형', IS_USE: true, width: $.lcst('threat_monitoring').save_data[5], cssClass: "text-center", formatter: $scope.$parent.gear_type, sortable: true},
					{id: "INST_NM", field: "INST_NM", name: '기관명', IS_USE: true, width: $.lcst('threat_monitoring').save_data[6], cssClass: "text-center", formatter: $scope.$parent.fmtScenario, asyncPostRender: scenarioRender, sortable: true},
					{id: "TW_ATT_IP", field: "TW_ATT_IP", name: '출발지IP', IS_USE: true, width: $.lcst('threat_monitoring').save_data[7], cssClass: "text-center", sortable: true},
					{id: "TW_ATT_PORT", field: "TW_ATT_PORT", name: '출발지 포트', IS_USE: true, width: $.lcst('threat_monitoring').save_data[8], cssClass: "text-center", sortable: true},
					{id: "TW_DMG_IP", field: "TW_DMG_IP", name: '목적지IP', IS_USE: true, width: $.lcst('threat_monitoring').save_data[9], cssClass: "text-center", sortable: true},
					{id: "TW_DMG_PORT", field: "TW_DMG_PORT", name: '목적지 포트', IS_USE: true, width: $.lcst('threat_monitoring').save_data[10], cssClass: "text-center", sortable: true},
					{id: "RISK", field: "RISK", name: '자산구분', IS_USE: true, width: $.lcst('threat_monitoring').save_data[11], cssClass: "text-center", sortable: true, formatter: $scope.$parent.assets_check},
					{id: "TW_ATT_CT_CODE", field: "TW_ATT_CT_CODE", name: '해외IP', IS_USE: true, width: $.lcst('threat_monitoring').save_data[12], cssClass: "text-center", sortable: true, formatter: $scope.$parent.ct_ip_check},
					{id: "DRULE_NM", field: "DRULE_NM", name: '공격명', IS_USE: true, width: $.lcst('threat_monitoring').save_data[13], cssClass: "text-center", sortable: true},
					{id: "DRULE_ATT_TYPE_CODE1", field: "DRULE_ATT_TYPE_CODE1", name: '공격유형', IS_USE: true, width: $.lcst('threat_monitoring').save_data[14], cssClass: "text-center", formatter: $scope.$parent.att_types, sortable: true},
					{id: "TW_PROTO_NM", field: "TW_PROTO_NM", name: '프로토콜', IS_USE: true, width: $.lcst('threat_monitoring').save_data[15], cssClass: "text-center", sortable: true, formatter: $scope.$parent.proto_type},
					{id: "TW_PATTERN_STR", field: "TW_PATTERN_STR", name: '패턴문자열', IS_USE: true, width: $.lcst('threat_monitoring').save_data[16], cssClass: "text-center", sortable: true},
					{id: "TW_MALIG_FILE_NM", field: "TW_MALIG_FILE_NM", name: '악성의심파일명', IS_USE: true, width: $.lcst('threat_monitoring').save_data[17], cssClass: "text-center", sortable: true},
					{id: "TW_DETECT_CNT", field: "TW_DETECT_CNT", name: '탐지건수', IS_USE: true, width: $.lcst('threat_monitoring').save_data[18], cssClass: "text-center", sortable: true},
					{id: "TW_ID", field: "TW_ID", name: '위협경보ID', IS_USE: true, width: $.lcst('threat_monitoring').save_data[19], cssClass: "text-center", sortable: true}
				);
			} else {
				columns.push(
					{id: "_datetime", field: "_datetime", name: '수집일시', IS_USE: true, width: $.lcst('threat_monitoring').save_data[1], cssClass: "text-center", formatter: $scope.$parent.view_time, sortable: true},
					{id: "RISK.RISK_VAL_0", field: "RISK.RISK_VAL_0", name: '위험도', IS_USE: true, width: $.lcst('threat_monitoring').save_data[2], cssClass: "text-center", formatter: $scope.$parent.risk_rank, sortable: true},
					{id: "RISK.IN_SPEC_VAL_2_4", field: "RISK.IN_SPEC_VAL_2_4", name: '시나리오', IS_USE: true, width: $.lcst('threat_monitoring').save_data[3], cssClass: "text-center", formatter: $scope.$parent.in_spec_2_4, sortable: true},
					{id: "SCEN_INFOS", field: "SCEN_INFOS", name: '시나리오 건수', IS_USE: true, width: $.lcst('threat_monitoring').save_data[4], cssClass: "text-center", formatter: $scope.$parent.scen_count, sortable: true},
					{id: "GEAR_TYPE", field: "GEAR_TYPE", name: '장비유형', IS_USE: true, width: $.lcst('threat_monitoring').save_data[5], cssClass: "text-center", formatter: $scope.$parent.gear_type, sortable: true},
					{id: "INST_NM", field: "INST_NM", name: '기관명', IS_USE: true, width: $.lcst('threat_monitoring').save_data[6], cssClass: "text-center", formatter: $scope.$parent.fmtScenario, asyncPostRender: scenarioRender, sortable: true},
					{id: "TW_ATT_IP", field: "TW_ATT_IP", name: '출발지IP', IS_USE: true, width: $.lcst('threat_monitoring').save_data[7], cssClass: "text-center", sortable: true},
					{id: "TW_ATT_PORT", field: "TW_ATT_PORT", name: '출발지 포트', IS_USE: true, width: $.lcst('threat_monitoring').save_data[8], cssClass: "text-center", sortable: true},
					{id: "TW_DMG_IP", field: "TW_DMG_IP", name: '목적지IP', IS_USE: true, width: $.lcst('threat_monitoring').save_data[9], cssClass: "text-center", sortable: true},
					{id: "TW_DMG_PORT", field: "TW_DMG_PORT", name: '목적지 포트', IS_USE: true, width: $.lcst('threat_monitoring').save_data[10], cssClass: "text-center", sortable: true},
					{id: "RISK", field: "RISK", name: '자산구분', IS_USE: true, width: $.lcst('threat_monitoring').save_data[11], cssClass: "text-center", sortable: true, formatter: $scope.$parent.assets_check},
					{id: "TW_ATT_CT_CODE", field: "TW_ATT_CT_CODE", name: '해외IP', IS_USE: true, width: $.lcst('threat_monitoring').save_data[12], cssClass: "text-center", sortable: true, formatter: $scope.$parent.ct_ip_check},
					{id: "DRULE_NM", field: "DRULE_NM", name: '공격명', IS_USE: true, width: $.lcst('threat_monitoring').save_data[13], cssClass: "text-center", sortable: true},
					{id: "DRULE_ATT_TYPE_CODE1", field: "DRULE_ATT_TYPE_CODE1", name: '공격유형', IS_USE: true, width: $.lcst('threat_monitoring').save_data[14], cssClass: "text-center", formatter: $scope.$parent.att_types, sortable: true},
					{id: "TW_PROTO_NM", field: "TW_PROTO_NM", name: '프로토콜', IS_USE: true, width: $.lcst('threat_monitoring').save_data[15], cssClass: "text-center", sortable: true, formatter: $scope.$parent.proto_type},
					{id: "TW_PATTERN_STR", field: "TW_PATTERN_STR", name: '패턴문자열', IS_USE: true, width: $.lcst('threat_monitoring').save_data[16], cssClass: "text-center", sortable: true},
					{id: "TW_MALIG_FILE_NM", field: "TW_MALIG_FILE_NM", name: '악성의심파일명', IS_USE: true, width: $.lcst('threat_monitoring').save_data[17], cssClass: "text-center", sortable: true},
					{id: "TW_DETECT_CNT", field: "TW_DETECT_CNT", name: '탐지건수', IS_USE: true, width: $.lcst('threat_monitoring').save_data[18], cssClass: "text-center", sortable: true},
					{id: "TW_ID", field: "TW_ID", name: '위협경보ID', IS_USE: true, width: $.lcst('threat_monitoring').save_data[19], cssClass: "text-center", sortable: true}
				);
			}
		}
		tbl.threat_list = new Slick.Grid("#threat_list", It.threat_list, columns, options);
		tbl.threat_list.setSelectionModel(new Slick.RowSelectionModel({selectActiveRow: false}));
		tbl.threat_list.registerPlugin(checkboxSelector);
		//@@EXP 기본 컬럼값 셋팅 (셋팅 정보가 없는 계정용)
		var columns_rank = function () {
			for (var i in columns) {
				if (columns[i].id != "_checkbox_selector") {
					cols_rank.push({id: columns[i].id, name: columns[i].name, width: columns[i].width, IS_USE: true, RANK: i * 1});
				}
			}
		};
		columns_rank();
		//@@EXP 사용자 컬럼 정보 가져오기
		var user_columns = function () {
			$http.post(gAction.user_columns, $.param({type: 'monitoring', json: JSON.stringify(cols_rank)}), $rootScope.http_config).then(function (rs) {
				if (rs.data.sOk) {
					var tmp = [];
					var col = rs.data.col_info.cols_rank;
					var col_data = new Map();
					for (var i in col) {
						col_data.put(col[i].id, col[i]);
					}
					tmp.push(checkboxSelector.getColumnDefinition());
					angular.forEach(columns, function (value, key) {
						if (value.id != '_checkbox_selector') {
							var data = col_data.get(value.id);
							try { //시나리오 건수 추가로 인해 예외상황 발생할 것 같아서 추가해놓
								if (data.IS_USE) {
									tmp.push(value);
								} else {
									value.IS_USE = false;
								}
								if(data.RANK){
									value.RANK=data.RANK;
								}
							} catch (err) {
								tmp.push(value);
							}
						}
					});
					
					var sortingField = "RANK";
					tmp.sort(function (a, b) {
						return a[sortingField] - b[sortingField];
					});
					
					tbl.threat_list.setColumns(tmp);
					cols_rank = col;
				}
				if (rs.data.sError)
					alert(rs.data.sError);
				if (rs.status == 440)
					$scope.$emit('pageRD', [location.href, rs.status]);
				niUt.endLoading('.panel-body');
			}, function (rs) {
				$scope.$emit('pageRD', [location.href, rs.status]);
			});
		};
		user_columns();
		//----------------------------------------------------------------------------------------
		//@@EXP 로컬 스토리지 생성
		var def = $.lcst('threat_monitoring');
		if (!def) {
			if (is_ecsc) {
				$.lcst('threat_monitoring',
					{
						upTime: $filter("date")(new Date(), 'yyyy-MM-dd HH:mm:ss'),
						save_data: [
							50/*체크박스*/, 180/*수집일시*/, 100/*위험도*/, 95/*시나리오*/,95/*시나리오건수*/, 
							95/*장비유형*/, 130/*기관명*/, 110/*출발지IP*/, 105/*출발지Port*/, 110/*목적지IP*/,105/*목적지Port*/,105/*자산구분*/, 90/*해외IP*/,
							150/*공격명*/, 100/*공격유형*/, 100/*프로토콜*/, 105/*패턴문자열*/, 130/*악성의심파일명*/, 
							100/*탐지건수*/, 110/*위협경보ID*/
						],
						filter_data: []
					}
				);
			} else {
				$.lcst('threat_monitoring',
					{
						upTime: $filter("date")(new Date(), 'yyyy-MM-dd HH:mm:ss'),
						save_data: [
							50/*체크박스*/, 180/*수집일시*/, 100/*위험도*/, 95/*시나리오*/,95/*시나리오건수*/, 
							95/*장비유형*/, 130/*기관명*/, 110/*출발지IP*/, 105/*출발지Port*/, 110/*목적지IP*/,105/*목적지Port*/,105/*자산구분*/, 90/*해외IP*/,
							150/*공격명*/, 100/*공격유형*/, 100/*프로토콜*/, 105/*패턴문자열*/, 130/*악성의심파일명*/, 
							100/*탐지건수*/, 110/*위협경보ID*/
						],
						filter_data: []
					}
				);
			}
			
		}
		
		var searchcheck = $.lcst('search');
		if (!searchcheck) {

			$.lcst('search',
				{
					idx: {},
					upTime: $filter("date")(new Date(), 'yyyy-MM-dd HH:mm:ss'),
					save_data: {},
					param: {}
				}
			);
		}
		
		//@@EXP 로컬스토리지 생성 안됐을 경우 생성해주는 용도
		var localStorage = function () {
			def = $.lcst('threat_monitoring');
			if (is_ecsc) {
				$.lcst('threat_monitoring',
					{
						upTime: $filter("date")(new Date(), 'yyyy-MM-dd HH:mm:ss'),
						save_data: [
							50/*체크박스*/, 180/*수집일시*/, 100/*위험도*/, 95/*시나리오*/,95/*시나리오건수*/, 
							95/*장비유형*/, 130/*기관명*/, 110/*출발지IP*/, 105/*출발지Port*/, 110/*목적지IP*/,105/*목적지Port*/,105/*자산구분*/, 90/*해외IP*/,
							150/*공격명*/, 100/*공격유형*/, 100/*프로토콜*/, 105/*패턴문자열*/, 130/*악성의심파일명*/, 
							100/*탐지건수*/, 110/*위협경보ID*/
						],
						filter_data: []
					}
				);
			} else {
				$.lcst('threat_monitoring',
					{
						upTime: $filter("date")(new Date(), 'yyyy-MM-dd HH:mm:ss'),
						save_data: [
							50/*체크박스*/, 180/*수집일시*/, 100/*위험도*/, 95/*시나리오*/,95/*시나리오건수*/, 
							95/*장비유형*/, 130/*기관명*/, 110/*출발지IP*/, 105/*출발지Port*/, 110/*목적지IP*/,105/*목적지Port*/,105/*자산구분*/, 90/*해외IP*/,
							150/*공격명*/, 100/*공격유형*/, 100/*프로토콜*/, 105/*패턴문자열*/, 130/*악성의심파일명*/, 
							100/*탐지건수*/, 110/*위협경보ID*/
						],
						filter_data: []
					}
				);
			}
			$.lcst('search',
					{
				       idx: {},
						upTime: $filter("date")(new Date(), 'yyyy-MM-dd HH:mm:ss'),
						save_data: {},
						param: {}
					}
			);
		}
		//@@EXP 위협경보 데이터 넣어주는 부분
		var isNew = true;
		$scope.load_data = function () {
			filter_list.rt_size = rt_cnt.rt_size + 1;

			if (typeof def == 'undefined') {
				localStorage();
				// window.location.reload();
			} 
			if (def.filter_data && isNew) {
				filter_list.filter = $.extend([], def.filter_data);
				for (var i in def.filter_data) {
					if (def.filter_data[i].value1 != undefined) {
						$scope.add_filter(def.filter_data[i].field, def.filter_data[i].name, def.filter_data[i].value1, isNew, def.filter_data[i].value2, def.filter_data[i].mode);
					} else {
						$scope.add_filter(def.filter_data[i].field, def.filter_data[i].name, def.filter_data[i].value, isNew, '', def.filter_data[i].mode);
					}
				}
				filter_data = def.filter_data;
				isNew = false;
			} else {
				filter_list.filter = $.extend([], filter_data);
			}
			filter_list.pressing = pressing;
//			filter_list.risk = el.find("#risk_filter").val();
			if (filter_list.risk == null || filter_list.risk == '' || typeof filter_list.risk == 'undefined') {
				filter_list.risk = "";
			} 
			niUt.startLoading('.panel-body');
			$http.post(gAction.list, $.param({json: JSON.stringify(filter_list)}), $rootScope.http_config).then(function (rs) {
				var row = niCvUt.resDataResult(rs, "aaData");
				
				list_time = new Date();
				It.threat_list = [];
				if (row) {
					angular.forEach(row, function (a, key) {
						It.threat_list.push(a);
					});
					tbl.threat_list.setData(It.threat_list);
					tbl.threat_list.render();
					
					rt_cnt.tot_size = rs.data.aaData.hits.total;
					if (rs.data.aaData.hits.hits) {
						rt_cnt.rt_size = rs.data.aaData.hits.hits.length;
					} else {
						rt_cnt.rt_size = 0;
					}
					el.find("#threat_list").css('margin-bottom', '10px');
				}
				niUt.endLoading('.panel-body');
			});
			el.find("#threat_list").val();
		};
		//------ 리스트 리로드-----------------------------------------------------
		//@@EXP 1분마다 화면 리스트 리로드
		var list_reload = $interval(function () {
			if ($scope.auto == true) {
				rt_cnt.rt_size = 1000;
				$scope.load_data();
			}
		}, 60000);
		//기본 값 60000
		//-------------------------------------------------------------------

		//------ 슬릭그리드 기능--------------------------------------------------
		//@@EXP 컬럼 사이즈 변경시
		tbl.threat_list.onColumnsResized.subscribe(function (e, args) {
			// var def_lcst = $.lcst('threat_monitoring');
			def.save_data = [];
			angular.forEach(args.grid.getColumns(), function (o) {
				def.save_data.push(o.width);
			});
			log.info(def);
			$.lcst('threat_monitoring', def);
		});
		//@@EXP 정렬기능
		tbl.threat_list.onSort.subscribe(function (e, args) {
			var dataList;
			if (args.sortAsc) {
				dataList = Jlinq.From(args.grid.getData()).OrderBy("$." + args.sortCol.field);
			} else {
				dataList = Jlinq.From(args.grid.getData()).OrderByDescending("$." + args.sortCol.field);
			}
			dataList = dataList.ToArray();
			tbl.threat_list.setData(dataList);
			tbl.threat_list.render();
		});
		//@@EXP 스크롤 기능
		tbl.threat_list.onScroll.subscribe(function (e, o) {
			if (o.scrollTop >= el.find("#threat_list .grid-canvas").height() - el.find("#threat_list .slick-viewport").height()) {
				if (rt_cnt.tot_size != 0) {
					if (rt_cnt.tot_size > (rt_cnt.rt_size)) {
						var check_time = new Date();
						if (check_time - list_time > pageConf.scroll * 60000) {
						} else {
							rt_cnt.rt_size += pageConf.rtSize;
							$scope.load_data();
						}
					}
				}
			}
		});
		//@@EXP 필드 더블클릭 기능
		tbl.threat_list.onDblClick.subscribe(function (e, args) {
			e.preventDefault();
			var cell = tbl.threat_list.getCellFromEvent(e);
			var obj = tbl.threat_list.getColumns()[cell.cell];
			var data = tbl.threat_list.getDataItem(cell.row);
			var val = data[obj.id];
		
			$scope.$parent.att_mode(cell, obj, data, val);
		});
		//@@EXP 위협경보 체크박스 이벤트
		var checkRows = [];
		tbl.threat_list.onSelectedRowsChanged.subscribe(function (e, args) {
			checkRows = [];
			for (var i in args.rows) {
				checkRows.push(args.rows[i]);
			}
		});
		//@@EXP 위협경보 선택
		$scope.threat_select = function () {
			var select_list = [];
			var param = {};
			angular.forEach(checkRows, function (value, key) {
				var data = tbl.threat_list.getDataItem(value);
				select_list.push({
					_id: data._id,
					_datetime: data._datetime,
					TW_ID_ORI: data.TW_ID_ORI,
					GEAR_TYPE: data.GEAR_TYPE
				});
			});
			if (select_list == '') {
				alert("위협경보를 선택하지 않았습니다.");
				return;
			}
			//넘기기전 TW_ID_ORI를 오름차순으로 정렬
			select_list.sort(function (a, b) {
				return a.TW_ID_ORI < b.TW_ID_ORI ? -1 : a.TW_ID_ORI > b.TW_ID_ORI ? 1 : 0;
			});
			param.select_list = $.extend([], select_list);
			console.log("threat select");
			console.log(param);
			if (confirm("[" + select_list.length + "]개의 위협경보를 선택하였습니다. 선택완료 하시겠습니까?")) {
				niUt.startLoading('.panel-body');
				$http.post(sAction.select, $.param({json: JSON.stringify(param)}), $rootScope.http_config).then(function (rs) {
					if (rs.data.sOk) {
						tbl.threat_list.setSelectedRows([]);
						$scope.load_data();
						var all_chk = el.find('#all_check').prop('checked');
						if (all_chk == true) {
							el.find('#all_check').attr('checked', false);
						}
					}
					if (rs.data.overlap) {
						alert(rs.data.overlap);
						$scope.load_data();
					}
					if (rs.data.sError)
						alert(rs.data.sError);
					if (rs.status == 440)
						$scope.$emit('pageRD', [location.href, rs.status]);
					niUt.endLoading('.panel-body');
				}, function (rs) {
					$scope.$emit('pageRD', [location.href, rs.status]);
				});
			}
		};
		//-------------------------------------------------------------------
		//@@ 해외아이피 표기
		var ct_code_type = function (att, dmg) {
			var obj = {att: '-', dmg: '-'};
			if (att == 'KR'  || att == '00') {
				obj.att = '-';
			} else {
				obj.att = 'src';
			}
			if (dmg == 'KR'  || dmg == '00') {
				obj.dmg = '-';
			} else {
				obj.dmg = 'dst';
			}
			return obj;
		};
		//------ 검색조건 관련--------------------------------------------------
		//@@EXP 검색조건 기능
		tbl.threat_list.onContextMenu.subscribe(function (e) {
			e.preventDefault();
			var cell = tbl.threat_list.getCellFromEvent(e);
			var obj = tbl.threat_list.getColumns()[cell.cell];
			var data = tbl.threat_list.getDataItem(cell.row);
			var val = data[obj.id];

			//값이 없으면 검색조건 팝업창 안띄움
			if (typeof val == 'undefined') {
				return;
			}
			//@@EXP 체크박스 또는 수집일시는 contextMenu 활성화 안하도록
			if (cell.cell == 0 || obj.field == '_datetime' || obj.field == 'TW_ID' || obj.field == 'RISK.RISK_VAL_0' || obj.field == 'RISK.IN_SPEC_VAL_2_3' || obj.field == 'RISK.IN_SPEC_VAL_2_4' || obj.field == 'RISK' /*|| obj.field == 'TW_ATT_CT_CODE'*/) {
				return;
			}
			
			$("#myMenu")
					.css("top", e.pageY)
					.css("left", e.pageX)
					.show();
			var ct_code;
			var html = '';
			html += '<li class="menu">&nbsp;&nbsp;검색조건</li>';
			html += '<li class="separator"></li>';
			if (obj.field == "GEAR_TYPE") {
				var gear = val == '0' ? 'NTM' : 'MTM';
				html += '<li class="text-center" style="font-size:13px; padding:10px;">[ ' + gear + ' ]</li>'
			} else if (obj.field == "SCEN_INFOS") {
				html += '<li class="text-center" style="font-size:13px; padding:10px;">[ ' + val.length + ' ]</li>'
			} else if (obj.field == 'TW_ATT_CT_CODE') {
				ct_code = ct_code_type(data.TW_ATT_CT_CODE, data.TW_DMG_CT_CODE);
				html += '<select id="ct_code_sel" class="form-control" style="width: 130px;">';
				html += '<option value="-">해외IP X</option>';
				html += '<option value="src">Src</option>';
				html += '<option value="dst">Dst</option>';
				html += '<option value="srcdst">Src/Dst</option>';
				html += '</select>';
			} else {
				html += '<li class="text-center" style="font-size:13px; padding:10px;">[ ' + val + ' ]</li>'
			}
			html += '<li class="separator"></li>';
			html += '<li class="separator"></li>';
			if (obj.field == 'TW_ATT_IP' || obj.field == 'TW_DMG_IP') {
				html += '<li class="">&nbsp;&nbsp;' + obj.name + ' 직접입력</li>';
				html += '<li class="" style="padding: 0 4px 0 4px; margin-bottom: 5px;">';
				html += '<input type="text" class="ip_box" name="direct_search" id="direct_search" style="border:1px solid #ccc; line-height:21px; height: 27px; color:black; padding-left:2px;">~';
				html += '<input type="text" class="ip_box" name="direct_search2" id="direct_search2" style="border:1px solid #ccc; line-height:21px; height: 27px; color:black; padding-left:2px;">';
				html += '</li>';
				html += '<li class="">';
				html += '<button id="btn_direct" class="btn btn-sm btn-primary" ng-click="add_filter(\'' + obj.id + '\',\'' + obj.name + '\', \'' + val + '\',' + isNew + '' + ',\'\', \'add\')" style="margin-left:2px; margin-bottom:3px; margin-right: 4px; width: 45%;">';
				html += '검색';
				html += '</button>';
				html += '<button id="btn_direct" class="btn btn-sm btn-danger" ng-click="add_filter(\'' + obj.id + '\',\'' + obj.name + '\', \'' + val + '\',' + isNew + '' + ',\'\', \'ect\')" style="margin-left:2px; margin-bottom:3px; margin-right: 4px; width: 45%;">';
				html += '예외';
				html += '</button>';
				html += '</li>'
			} else if (obj.field == 'SCEN_INFOS') {
				html += '<input type="text" id="direct_search" style="border:1px solid #ccc; line-height:21px; height: 27px; color:black; padding-left:2px; margin-bottom: 5px; margin-left: 3px; width: 96%;">';
				html += '</li>';
				html += '<li class="">';
				html += '<button id="btn_direct" class="btn btn-sm btn-primary" ng-click="add_filter(\'' + obj.id + '\',\'' + obj.name + '\', \'' + val.length + '\',' + isNew + '' + ',\'\', \'add\')" style="margin-left:2px; margin-bottom:3px; margin-right: 4px; width: 45%;">';
				html += '검색';
				html += '</button>';
				html += '<button id="btn_direct" class="btn btn-sm btn-danger" ng-click="add_filter(\'' + obj.id + '\',\'' + obj.name + '\', \'' + val.length + '\',' + isNew + '' + ',\'\', \'ect\')" style="margin-left:2px; margin-bottom:3px; margin-right: 4px; width: 45%;">';
				html += '예외';
				html += '</button>';
				html += '</li>';
			} else if (obj.field == 'TW_ATT_CT_CODE' ) {
				if (ct_code.att == 'src' && ct_code.dmg == 'dst') {
					val = 'srcdst';
				} else if (ct_code.att == 'src') {
					val = 'src';
				} else if (ct_code.dmg == 'dst') {
					val = 'dst';
				} else {
					val = '-';
				}
				html += '<li class="">';
				html += '<button id="btn_direct" class="btn btn-sm btn-primary" ng-click="add_filter(\'' + obj.id + '\',\'' + obj.name + '\', \'' + val + '\',' + isNew + '' + ',\'\', \'ect\')" style="margin-left:2px; margin-bottom:3px; margin-right: 4px; width: 45%;">';
				html += '검색';
				html += '</button>';
				html += '<button id="btn_direct" class="btn btn-sm btn-danger" ng-click="add_filter(\'' + obj.id + '\',\'' + obj.name + '\', \'' + val + '\',' + isNew + '' + ',\'\', \'add\')" style="margin-left:2px; margin-bottom:3px; margin-right: 4px; width: 45%;">';
				html += '예외';
				html += '</button>';
				html += '</li>';
			} else {
				html += '<input type="text" id="direct_search" style="border:1px solid #ccc; line-height:21px; height: 27px; color:black; padding-left:2px; margin-bottom: 5px; margin-left: 3px; width: 96%;">';
				html += '</li>';
				html += '<li class="">';
				html += '<button id="btn_direct" class="btn btn-sm btn-primary" ng-click="add_filter(\'' + obj.id + '\',\'' + obj.name + '\', \'' + val + '\',' + isNew + '' + ',\'\', \'add\')" style="margin-left:2px; margin-bottom:3px; margin-right: 4px; width: 45%;">';
				html += '검색';
				html += '</button>';
				html += '<button id="btn_direct" class="btn btn-sm btn-danger" ng-click="add_filter(\'' + obj.id + '\',\'' + obj.name + '\', \'' + val + '\',' + isNew + '' + ',\'\', \'ect\')" style="margin-left:2px; margin-bottom:3px; margin-right: 4px; width: 45%;">';
				html += '예외';
				html += '</button>';
				html += '</li>';
			}
			el.find("#myMenu").html(html);
			$compile('#myMenu')($scope);
			el.find("#direct_search").focus();
			if (obj.field == 'TW_ATT_IP' || obj.field == 'TW_DMG_IP') {
				el.find('.ip_box').ipaddress({cidr: false});
				el.find("#direct_search").ipaddress({copy_ip: 'direct_search2'});
				el.find("#direct_search_octet_1").focus();
			}
			if (obj.field == 'TW_ATT_CT_CODE') {
				if (ct_code.att == '-' && ct_code.dmg == '-') {
					el.find('#ct_code_sel').val('-');
				} else if (ct_code.att == 'src' && ct_code.dmg == 'dst') {
					el.find('#ct_code_sel').val('srcdst');
				} else if (ct_code.att == 'src') {
					el.find('#ct_code_sel').val('src');
				} else if (ct_code.dmg == 'dst') {
					el.find('#ct_code_sel').val('dst');
				}
			}
			el.find("#direct_search").on('keydown', function (e) {
				if (e.which == 13) {
					el.find("#btn_direct").trigger("click");
					e.preventDefault();
				}
			});
		});
		//contextmenu에서 input이나 select 같은걸 마우스 클릭했을 때 사라지지 않게 하려면 여기에 추가해줘야함
		$("body").on("click", function (e) {
			var thisEl = $(e.target);
			switch (thisEl.attr("id")) {
				case 'direct_search':
					break;
				case 'direct_search_octet_1':
					break;
				case 'direct_search_octet_2':
					break;
				case 'direct_search_octet_3':
					break;
				case 'direct_search_octet_4':
					break;
				case 'direct_search2_octet_1':
					break;
				case 'direct_search2_octet_2':
					break;
				case 'direct_search2_octet_3':
					break;
				case 'direct_search2_octet_4':
					break;
				case 'ct_code_sel':
					break;
				default:
					$("#myMenu").hide();
					break;
			}
		});
		//@@EXP 검색조건 추가
		var seq = 0;
		$scope.add_filter = function (id, name, data, isNew, data2, mode) {
			var check = true;
			var def = $.lcst("threat_monitoring");
			var direct_search = '';
			var direct_search2 = '';
			if (!isNew) {
				angular.forEach(filter_data, function (value, key) {
					var f = value.field;
					var v = value.value;
					if (id == f && data == v) {
						alert("이미 추가된 데이터 입니다.");
						check = false;
					}
				});
			}
			var tmp = {};
			if (check) {
				if (isNew) {
					if (data2 != '') {
						direct_search = data;
						direct_search2 = data2;
						data = 'direct';
					} else {
						direct_search = def.filter_data.value;
					}
				} else {
					if (id == 'TW_ATT_CT_CODE') {
						data = 'direct';
						direct_search = el.find('#ct_code_sel').val();
					} else {
						if (el.find("#direct_search").val() != "") {
							data = 'direct';
							direct_search = el.find("#direct_search").val();
							direct_search2 = el.find("#direct_search2").val();
						}
					}
				}
				el.find("#info_filter").hide();
				el.find("#now_filter").show();
				rt_cnt.rt_size = 1000;
				if (data == 'direct') {
					if (id == 'TW_ATT_IP' || id == 'TW_DMG_IP') {
						for (var i = 1; i <= 4; i++) {
							if (el.find("#direct_search_octet_" + i).val() == '') {
								alert("IP를 정확히 입력해주시기 바랍니다.");
								el.find("#direct_search_octet_" + i).focus();
								return;
							}
							if (el.find("#direct_search2_octet_" + i).val() == '') {
								alert("IP를 정확히 입력해주시기 바랍니다.");
								el.find("#direct_search2_octet_" + i).focus();
								return;
							}
						}
						tmp = {
							type: 'direct',
							field: id,
							value1: direct_search,
							value2: direct_search2,
							name: name,
							seq: seq,
							mode: mode
						};
						filter_data.push(tmp);
						el.find("#now_filter").append("<label class=\"mrgB0\" id=\"filter_" + seq + "\"> " + name + " : " + (mode == 'ect' ? '!' + direct_search : direct_search) + "~" + direct_search2 + " <label class=\"control-label\" style=\"padding-top:1px; color:#545454; font-size:11px;\"><i id=\"remove_" + seq + "\" class=\"fa fa-times\" style=\"cursor:pointer; margin-left:1px;\"></i></label> ,&nbsp;</label>");
					} else if (id == 'TW_ATT_CT_CODE') {
						var msg = el.find('#ct_code_sel option:selected').text();
						tmp = {
							type: 'direct',
							field: id,
							value: direct_search,
							name: name,
							seq: seq,
							mode: mode
						}
						if (direct_search == '-' && mode == 'add') tmp.mode = 'ect';
						if (direct_search == '-' && mode == 'ect') tmp.mode = 'add';
						filter_data.push(tmp);
						el.find("#now_filter").append("<label class=\"mrgB0\" id=\"filter_" + seq + "\"> " + name + " : " + msg + " <label class=\"control-label\" style=\"padding-top:1px; color:#545454; font-size:11px;\"><i id=\"remove_" + seq + "\" class=\"fa fa-times\" style=\"cursor:pointer; margin-left:1px;\"></i></label> ,&nbsp;</label>");
					} else if (id == 'GEAR_TYPE') {
						var gear = direct_search;
						switch (gear) {
							case 'NTM':
								tmp = {
									type: 'direct',
									field: id,
									value: '0',
									name: name,
									seq: seq,
									mode: mode
								};
								filter_data.push(tmp);
								el.find("#now_filter").append("<label class=\"mrgB0\" id=\"filter_" + seq + "\"> " + name + " : " + direct_search + " <label class=\"control-label\" style=\"padding-top:1px; color:#545454; font-size:11px;\"><i id=\"remove_" + seq + "\" class=\"fa fa-times\" style=\"cursor:pointer; margin-left:1px;\"></i></label> ,&nbsp;</label>");
								break;
							case 'ntm':
								tmp = {
									type: 'direct',
									field: id,
									value: '0',
									name: name,
									seq: seq,
									mode: mode
								};
								filter_data.push(tmp);
								el.find("#now_filter").append("<label class=\"mrgB0\" id=\"filter_" + seq + "\"> " + name + " : " + direct_search + " <label class=\"control-label\" style=\"padding-top:1px; color:#545454; font-size:11px;\"><i id=\"remove_" + seq + "\" class=\"fa fa-times\" style=\"cursor:pointer; margin-left:1px;\"></i></label> ,&nbsp;</label>");
								break;
							case 'MTM' :
								tmp = {
									type: 'direct',
									field: id,
									value: '1',
									name: name,
									seq: seq,
									mode: mode
								};
								filter_data.push(tmp);
								el.find("#now_filter").append("<label class=\"mrgB0\" id=\"filter_" + seq + "\">  " + name + " : " + direct_search + " <label class=\"control-label\" style=\"padding-top:1px; color:#545454; font-size:11px;\"><i id=\"remove_" + seq + "\" class=\"fa fa-times\" style=\"cursor:pointer; margin-left:1px;\"></i></label> ,&nbsp;</label>");
								break;
							case 'mtm' :
								tmp = {
									type: 'direct',
									field: id,
									value: '1',
									name: name,
									seq: seq,
									mode: mode
								};
								filter_data.push(tmp);
								el.find("#now_filter").append("<label class=\"mrgB0\" id=\"filter_" + seq + "\">  " + name + " : " + direct_search + " <label class=\"control-label\" style=\"padding-top:1px; color:#545454; font-size:11px;\"><i id=\"remove_" + seq + "\" class=\"fa fa-times\" style=\"cursor:pointer; margin-left:1px;\"></i></label> ,&nbsp;</label>");
								break;
							default:
								alert("장비유형은 NTM(ntm), MTM(mtm)으로만 입력이 가능합니다.");
								return;
								break;
						}
					} else {
						if (id == 'SCEN_INFOS') {
							tmp = {
								type: 'direct',
								field: id,
								value: direct_search,
								name: name,
								seq: seq,
								mode: mode
							};
							filter_data.push(tmp);
							el.find("#now_filter").append("<label class=\"mrgB0\" id=\"filter_" + seq + "\">  " + name + " : " + (mode == 'ect' ? ('!' + direct_search) : direct_search) + " <label class=\"control-label\" style=\"padding-top:1px; color:#545454; font-size:11px;\"><i id=\"remove_" + seq + "\" class=\"fa fa-times\" style=\"cursor:pointer; margin-left:1px;\"></i></label> ,&nbsp;</label>");
						} else {
							tmp = {
								type: 'direct',
								field: id,
								value: "*" + direct_search + "*",
								name: name,
								seq: seq,
								mode: mode
							};
							filter_data.push(tmp);
							el.find("#now_filter").append("<label class=\"mrgB0\" id=\"filter_" + seq + "\">  " + name + " : " + (mode == 'ect' ? ('!*' + direct_search + "*") : "*" + direct_search + "*") + " <label class=\"control-label\" style=\"padding-top:1px; color:#545454; font-size:11px;\"><i id=\"remove_" + seq + "\" class=\"fa fa-times\" style=\"cursor:pointer; margin-left:1px;\"></i></label> ,&nbsp;</label>");
						}
					}
				} else {
					switch (id) {
						case 'RISK.RISK_VAL_0':
							if (data == '매우낮음') {
								data = 1;
							}
							if (data == '낮음') {
								data = 2;
							}
							if (data == '보통') {
								data = 3;
							}
							if (data == '높음') {
								data = 4;
							}
							if (data == '매우높음') {
								data = 5;
							}
							tmp = {
								type: 'indirect',
								field: id,
								value: data,
								name: name,
								seq: seq,
								mode: mode
							};
							filter_data.push(tmp);
							el.find("#now_filter").append("<label class=\"mrgB0\" id=\"filter_" + seq + "\"> " + name + " : " + data + " <label class=\"control-label\" style=\"padding-top:1px; color:#545454; font-size:11px;\"><i id=\"remove_" + seq + "\" class=\"fa fa-times\" style=\"cursor:pointer; margin-left:1px;\"></i></label> ,&nbsp;</label>");
							break;
						case 'GEAR_TYPE':
							var gear = data == '0' ? 'NTM' : 'MTM';
							tmp = {
								type: 'indirect',
								field: id,
								value: data,
								name: name,
								seq: seq,
								mode: mode
							};
							filter_data.push(tmp);
							el.find("#now_filter").append("<label class=\"mrgB0\" id=\"filter_" + seq + "\">  " + name + " : " + gear + " <label class=\"control-label\" style=\"padding-top:1px; color:#545454; font-size:11px;\"><i id=\"remove_" + seq + "\" class=\"fa fa-times\" style=\"cursor:pointer; margin-left:1px;\"></i></label> ,&nbsp;</label>");
							break;
						default :
							tmp = {
								type: 'indirect',
								field: id,
								value: data,
								name: name,
								seq: seq,
								mode: mode
							};
							filter_data.push(tmp);
							el.find("#now_filter").append("<label class=\"mrgB0\" id=\"filter_" + seq + "\">  " + name + " : " + (mode == 'ect' ? ('!' + data) : data) + " <label class=\"control-label\" style=\"padding-top:1px; color:#545454; font-size:11px;\"><i id=\"remove_" + seq + "\" class=\"fa fa-times\" style=\"cursor:pointer; margin-left:1px;\"></i></label> ,&nbsp;</label>");
							break;
					}
				}
				if (!isNew) {
					def.filter_data = [];
					for (var i in filter_data) {
						def.filter_data.push(filter_data[i]);
					}
					$.lcst('threat_monitoring', def);
					$scope.load_data(filter_data);
				}
				$compile('#now_filter')($scope);
				$compile('#term_remove')($scope);
			}
			seq++;
		};
		
		//검색조건 이름 옆 x버튼
		el.on("click", ".fa-times", function (e) {
			$scope.filter_delete(e.target.id);
		});
		
		//remove
		$scope.term_remove = function (type, field, value, name, value2) {
			var filter_id = type + '_' + field + '_' + value + (value2 == undefined ? "" : '_' + value2);
			var tmp = "";
			var def = $.lcst("threat_monitoring");
			for (var i in filter_data) {
				tmp = filter_data[i].type + '_' + filter_data[i].field + '_' + filter_data[i].value + (filter_data[i].value2 == undefined ? "" : '_' + filter_data[i].value2);
				if (filter_id == tmp) {
					filter_data.splice([i], 1);
				}
			}
			def.filter_data = [];
			for (var i in filter_data) {
				def.filter_data.push(filter_data[i]);
			}
			$.lcst('threat_monitoring', def);
			el.find('#' + filter_id).html('');
			$scope.load_data();
		};
		
		//@@EXP 검색조건 부분 삭제
		$scope.filter_delete = function (target) {
			var def = $.lcst('threat_monitoring');
			var rm_seq = target.split("_")[1];
			
			for (var i in filter_data) {
				if (filter_data[i].seq == rm_seq) {
					def.filter_data.splice(i, 1);
					filter_data.splice(i, 1);
					el.find("#now_filter #filter_"+rm_seq).remove();
				}
			}
			if (filter_data.length == 0) {
				$scope.collect_start();
				seq = 0;
				def.filter_data = [];
				filter_data = [];
				el.find("#info_filter").show();
				el.find("#now_filter").hide();
				el.find("#now_filter").html('검색조건 > ');
			}
			$.lcst("threat_monitoring", def);
			rt_cnt.rt_size = 1000;

			$scope.load_data();
		};
		
		//@@EXP 검색조건 초기화
		$scope.filter_reset = function () {
			$scope.collect_start();
			def.filter_data = [];
			$.lcst('threat_monitoring', def);
			rt_cnt.rt_size = 1000;
			filter_data = [];
			seq = 0;
			el.find("#info_filter").show();
			el.find("#now_filter").hide();
			el.find("#now_filter").html('검색조건 > ');
			$scope.load_data();
		};
		//@@EXP 새로고침
		$scope.filter_refresh = function () {
			el.find('#all_check').attr('checked', false);
			rt_cnt.rt_size = 1000;
			$scope.load_data();
		};
		//@@EXP 디자인
		el.find("#now_filter, #info_filter").css("font-size", "12px");
		el.find("#now_filter, #info_filter").css("background-color", "#eee");
		el.find("#now_filter, #info_filter").css("padding", "5px 0 5px 10px");
		el.find("#now_filter, #info_filter").css("border-bottom", "1px solid #999");
		//-------------------------------------------------------------------

		//------ WHOIS 검색--------------------------------------------------------
		//@@EXP 팝업 설정
		var whois_pop = function () {
			var bWidth = 500;
			el.find('#whois_pop').width(bWidth);
			el.find('#whois_pop').height(260);
			el.find('#whois_pop').css('margin-left', -(bWidth / 2));
			el.find('#whois_pop .panel-body').css('padding', 7);
			el.find('#whois_pop').css('top', 260);
			el.find('#whois_pop').css('z-index', 100000);
			el.find('#whois_pop').reveal({
				animation: 'none',
				closeonbackgroundclick: true
			});
		};
		//@@EXP 결과창
		$scope.search_whois = function (ip) {
			whois_pop();
			var test = '{"whois":{"query":"' + ip + '","queryType":"IPv4","registry":"KRNIC","countryCode":"KR"}}';
			var test_json = JSON.parse(test);
			el.find('#query').html("Query: " + test_json.whois.query);
			el.find("#queryType").html("queryType: " + test_json.whois.queryType);
			el.find("#registry").html("registry: " + test_json.whois.registry);
			el.find("#countryCode").html("countryCode: " + test_json.whois.countryCode);
		};
		//@@EXP 닫기
		$scope.whois_close = function () {
			el.find("#whois_pop").trigger('reveal:close');
		};
		//-------------------------------------------------------------------------

		//@@EXP 검색조건 설정
        class Term {
			constructor(code,conjunction,flag,func,nm,pose,sign,type,value1,value2,value3,value4) {
				this.CC_CODE = "";
				this.COL_CODE = code;
				this.COL_CONJUNCTION = conjunction;
				this.COL_FLAG = flag; 
				this.COL_FMT = undefined;
				this.COL_FUNC = func;
				this.COL_NM = nm;
				this.COL_POSE = pose;
				this.COL_SIGN = sign;
				this.COL_TYPE = type;
				this.COL_VALUE1 = value1;
				this.COL_VALUE2 = value2;
				this.COL_VALUE3 = value3;
				this.COL_VALUE4 = value4;
				this.COL_WIDTH = "120";
			}
			
			makeId() { // 검색조건 맵(termsMap)에 저장할 키 설정
				const stamp = new Date().getTime();

				return this.COL_CODE + "_" + stamp;
			}		
        }
      //@@EXP 검색조건 맵 생
		const termsMap = {
				standardDate: "none",
				terms: new Map()
		}
		
        //검색조건 저장
		const setSearchTerm = function (save_query = false) {

			let endDate = new Date();
		    endDate.setSeconds(0);
		    
		    let startDate = new Date();
		    startDate.setTime(endDate.getTime() - (60 * 1000 * 1440));
		    
			const standardDate = new Term('_datetime','','term','B','수집일시','text-center','eq','date','range',$filter("date")(startDate, "yyyy-MM-dd HH:mm:00"),$filter("date")(endDate, "yyyy-MM-dd HH:mm:59"),'');
			termsMap.standardDate = standardDate;

			let rt = {};
			angular.copy(termsMap, rt);	

			return rt;
		};
		
		
		//------ 상세보기-----------------------------------------------------
		//@@EXP 시나리오 정책
		// var symbol_arr = [
		// 	{val: "eq", symbol: "="}, {val: "neq", symbol: "!="}, {val: "gt", symbol: ">"}, {val: "gte", symbol: ">="}, {val: "lt", symbol: "<"}, {val: "lte", symbol: "<="}, {val: "includeRange", symbol: "대역포함"}, {val: "exceptRange", symbol: "대역제외"}
		// ];
		// $scope.draw_scenario = function (num, seq, obj) {
		// 	var html = "";
		// 	var sel = 'term_' + seq;
		// 	var signHtml = '=';
		// 	html += '<div id="' + sel + '" class="col-sm-12 paddLR0 condition_box">';
		// 	html += '<div class="col-sm-2 paddR0">';
		// 	html += '<div class="form-group" style="margin-left: 0px;margin-right: 0px;">';
		// 	html += '<input class="form-control" readonly="readonly" value="' + seq + '">';
		// 	html += '</div>';
		// 	html += '</div>';
		// 	html += '<div class="col-sm-3 paddR0">';
		// 	html += '<div class="form-group" style="margin-left: 0px;margin-right: 0px;">';
		// 	html += '<input class="form-control" readonly="readonly" value="' + obj.COL_NM + '">';
		// 	html += '</div>';
		// 	html += '</div>';
		// 	html += '<div class="col-sm-2 paddR0">';
		// 	html += '<div class="form-group" style="margin-left: 0px;margin-right: 0px;">';

		// 	if (obj.COL_SIGN == "include") {
		// 		signHtml = "포함";
		// 	} else if (obj.COL_SIGN == "except") {
		// 		signHtml = "포함제외";
		// 	} else {
		// 		for (var i in symbol_arr) {
		// 			if (symbol_arr[i].val == obj.COL_SIGN) {
		// 				signHtml = symbol_arr[i].symbol;
		// 			}
		// 		}
		// 	}

		// 	html += '<input class="form-control" readonly="readonly" value="' + signHtml + '">';
		// 	html += '</div>';
		// 	html += '</div>';
		// 	html += '<div class="col-sm-3 paddR0">';
		// 	html += '<div class="form-group" style="margin-left: 0px;margin-right: 0px;">';
		// 	if (obj.REF_INDEX == 'direct') {
		// 		html += '<input class="form-control value" readonly="readonly" value="">';
		// 	} else {
		// 		html += '<input class="form-control value" readonly="readonly" value="' + obj.COL_VALUE_NM + '">';
		// 	}
		// 	html += '</div>';
		// 	html += '</div>';
		// 	html += '<div class="col-sm-2">';
		// 	html += '<div class="form-group" style="margin-left: 0px;margin-right: 0px;">';
		// 	html += '<input class="form-control" readonly="readonly" value="' + obj.COL_CONJUNCTION + '">';
		// 	html += '</div>';
		// 	html += '</div>';
		// 	html += '</div>';
		// 	el.find("#term_list_" + num).append($compile(html)($scope));
		// };
		// $scope.load_scenario = function (row) {
		// 	el.find('#secn_info').html('');
		// 	for (var i in row) {
		// 		var scen_html = '';
		// 		scen_html += '<table class="table table-bordered">\n\
		// 						<tbody>\n\
		// 							<tr class="tb_l">\n\
		// 								<th style="width: 10%">시나리오 정책명</th>\n\
		// 								<td colspan="2" style="width: 80%">\n\
		// 									<input class="form-control" value="' + row[i].POL_NM + '" readonly="readonly">\n\
		// 								</td>\n\
		// 							</tr>\n\
		// 							<tr class="">\n\
		// 								<th rowspan="3" style="width: 10%">시나리오 정책사유</th>\n\
		// 								<td style="width: 10%">작성자</td>\n\
		// 								<td style="width: 80%">\n\
		// 									<input class="form-control" value="' + row[i].POL_EDITOR_NM + '" readonly="readonly">\n\
		// 								</td>\n\
		// 							</tr>\n\
		// 							<tr>\n\
		// 								<td style="width: 10%">작성일시</td>\n\
		// 								<td style="width: 80%">\n\
		// 									<input class="form-control" value="' + row[i].POL_UPD_DT.split("+")[0] + '" readonly="readonly">\n\
		// 								</td>\n\
		// 							</tr>\n\
		// 							<tr>\n\
		// 								<td style="width: 10%">작성사유</td>\n\
		// 								<td style="width: 80%">\n\
		// 									<textarea rows="5" style="height:100px; resize:none;" class="form-control" readonly="readonly">' + niCvUt.decodingTextArea(row[i].POL_DESC) + '</textarea>\n\
		// 								</td>\n\
		// 							</tr>\n\
		// 							<tr class="">\n\
		// 								<th style="width: 10%">시나리오 정책</br>검색 조건 목록</th>\n\
		// 								<td id="term_list_' + i + '" colspan="2" style="width: 90%">\n\
		// 									<div class="col-sm-12 paddLR0">\n\
		// 										<div class="col-sm-2 paddR0">\n\
		// 											<div class="form-group" style="margin-left: 0px;margin-right: 0px;">\n\
		// 												<label class="control-label">번호</label>\n\
		// 											</div>\n\
		// 										</div>\n\
		// 										<div class="col-sm-3 paddR0">\n\
		// 											<div class="form-group" style="margin-left: 0px;margin-right: 0px;">\n\
		// 												<label class="control-label">항목</label>\n\
		// 											</div>\n\
		// 										</div>\n\
		// 										<div class="col-sm-2 paddR0">\n\
		// 											<div class="form-group" style="margin-left: 0px;margin-right: 0px;">\n\
		// 												<label class="control-label">연산자</label>\n\
		// 											</div>\n\
		// 										</div>\n\
		// 										<div class="col-sm-3 paddR0">\n\
		// 											<div class="form-group" style="margin-left: 0px;margin-right: 0px;">\n\
		// 												<label class="control-label">지식정보</label>\n\
		// 											</div>\n\
		// 										</div>\n\
		// 										<div class="col-sm-2">\n\
		// 											<div class="form-group" style="margin-left: 0px;margin-right: 0px;">\n\
		// 												<label class="control-label">검색항목간 조건</label>\n\
		// 											</div>\n\
		// 										</div>\n\
		// 									</div>\n\
		// 								</td>\n\
		// 							</tr>\n\
		// 						</tbody>\n\
		// 					</table><br>';
		// 		el.find("#secn_info").append($compile(scen_html)($scope));
		// 		var seq = 0;
		// 		var ref = row[i].REF_PROPERTIES;
		// 		for (var k in ref) {
		// 			seq++;
		// 			$scope.draw_scenario(i, seq, ref[k]);
		// 		}

		// 		var pol_col = row[i].POL_COL;
		// 		for (var j in pol_col) {
		// 			seq++;
		// 			pol_col[j].COL_VALUE_NM = pol_col[j].COL_VALUE2;
		// 			$scope.draw_scenario(i, seq, pol_col[j]);
		// 		}
		// 	}
		// };
		//@@EXP 위험험도 계산
		// var compute_risk = function (index) {
		// 	if (index > 0 && index <= 20) {
		// 		return risk_code[0].CC_NM;
		// 	} else if (index >= 21 && index <= 40) {
		// 		return risk_code[1].CC_NM;
		// 	} else if (index >= 41 && index <= 60) {
		// 		return risk_code[2].CC_NM;
		// 	} else if (index >= 61 && index <= 80) {
		// 		return risk_code[3].CC_NM;
		// 	} else if (index >= 81 && index <= 100) {
		// 		return risk_code[4].CC_NM;
		// 	} else {
		// 		return '-';
		// 	}
		// };
		//@@EXP 수집일시 변환
		// var detail_view_time = function (v) {
		// 	var text1 = v.replace("T", " ");
		// 	text1 = text1.replace("+0900", "");
		// 	return text1;
		// };
		// //@@EXP 위험도 변환
		// var detail_risk_rank = function (v) {
		// 	if (parseInt(v) <= 20) {
		// 		return risk_code[0].CC_NM;
		// 	} else if (parseInt(v) >= 21 && parseInt(v) <= 40) {
		// 		return risk_code[1].CC_NM;
		// 	} else if (parseInt(v) >= 41 && parseInt(v) <= 60) {
		// 		return risk_code[2].CC_NM;
		// 	} else if (parseInt(v) >= 61 && parseInt(v) <= 80) {
		// 		return risk_code[3].CC_NM;
		// 	} else if (parseInt(v) >= 81 && parseInt(v) <= 100) {
		// 		return risk_code[4].CC_NM;
		// 	}
		// };
		//@@EXP 장비유형 변환 
		// var detail_gear_type = function (v) {
		// 	switch (v) {
		// 		case '0':
		// 			return 'NTM';
		// 			break;
		// 		case '1':
		// 			return 'MTM';
		// 			break;
		// 	}
		// };
		//@@EXP 공격유형 코드
		// var detail_att_types = function (v) {
		// 	for (var i in att_code) {
		// 		if (att_code[i].CC_CODE == v) {
		// 			return att_code[i].CC_NM;
		// 		}
		// 	}
		// };
		
		//출발지 IP , 목적지 IP 통합검색	
		// $scope.search_ip = function (searchtype) {
			
		// 	const termObj = {
		// 			TERM_CODE: '',
		// 			TERM_NM: '',
		// 			TERM_DESC: '',
		// 			TERM_INDEX: 'ts_data_accident',
		// 			TERM_AGENT: 'all',
		// 			TERM_SORT: 'none',
		// 			TERM: setSearchTerm()
		// 		};
				
		// 	const term_drule_nm = new Term('DRULE_NM','AND','term','','탐지규칙명','text-left','eq','string','equal',el.find('#DRULE_NM').text(),'','');;
		// 	termObj.TERM.terms.put(term_drule_nm.makeId(), term_drule_nm);
		// 	const term_inst_nm = new Term('INST_NM','AND','term','','기관명','text-left','eq','string','equal',el.find('#INST_NM').text(),'','');;
			
		// 	if(searchtype == 'ATT'){
		// 		const term_tw_att_ip = new Term('TW_ATT_IP','AND','term','','위협출발지IP','text-left','eq','ip','equal',el.find('#TW_ATT_IP').text(),'','');;
		// 		termObj.TERM.terms.put(term_tw_att_ip.makeId(), term_tw_att_ip);
		// 		termObj.TERM.terms.put(term_inst_nm.makeId(), term_inst_nm);
		// 	}
			
		// 	if(searchtype == 'DMG'){
		// 		const term_tw_dmg_ip = new Term('TW_DMG_IP','AND','term','','위협목적지IP','text-left','eq','ip','equal',el.find('#TW_DMG_IP').text(),'','');;
		// 		termObj.TERM.terms.put(term_inst_nm.makeId(), term_inst_nm);
		// 		termObj.TERM.terms.put(term_tw_dmg_ip.makeId(), term_tw_dmg_ip);
				
		// 	}
		// 	const date = $filter("date")(new Date(), "yyyyMMddHHmmss");
			
		// 	const localStorage = $.lcst("search");
		// 	localStorage.param = termObj;
		// 	$.lcst("search", localStorage);

		// 	let pop_path = "sas-pop.html#!/search/search?applyTermsFlag=true";
		// 	if (NI_CONF.mode === "B") {
		// 		pop_path = "nbig-pop.html#!/search?applyTermsFlag=true";
		// 	}
		// 	niUt.popUp("search_" + date, pop_path, { width: 1460, height: 768 });	
		// };
		
		//@@EXP 상세보기 (+사고등록)
		$scope.pop_edit = function (r) {
			POP_STAT = 'edit';
			el.find("#data_list").hide();
			el.find("#data_edit").show();
			var threat_anal = {};
			var getThreat_data = tbl.threat_list.getDataItem(r);
			console.log(getThreat_data);
			var threat_data = [];
			var search_btn = '<button ng-click="search_attip_btn()" id="search_attip_btn" class="btn btn-xs btn-primary pull-right" style="float: left;" title="출발지IP를 현재 등록되어 있는 자산에 있는지를 조회합니다."><i class="glyphicon glyphicon-search"></i></button>';
			threat_data.push(getThreat_data);
			var risk_type = 'RISK';
			if (getThreat_data.RISK == null) {
				risk_type = 'RISK_V2';
				risk_v2_obj = getThreat_data.RISK_V2;
			} else {
				risk_obj = getThreat_data.RISK;
			}
			el.find("#_id").val(getThreat_data._id);
			el.find('#_datetime').html($scope.$parent.detail_view_time(getThreat_data._datetime));
			el.find('#TW_COLLECT_DT').html($scope.$parent.detail_view_time(getThreat_data.TW_COLLECT_DT));
			
			el.find('#GEAR_TYPE').html($scope.$parent.detail_gear_type(getThreat_data.GEAR_TYPE));
			el.find('#INST_NM').html(getThreat_data.INST_NM);
			el.find('#INST_CODE').val(getThreat_data.INST_CODE);
			el.find('#DRULE_ATT_TYPE_CODE1').html($scope.$parent.detail_att_types(getThreat_data.DRULE_ATT_TYPE_CODE1));
			if (NI_CONF.is_ecsc == 'N') {
				el.find('.ooec_show').show();
				el.find("#INST_DETAIL_NM").html(getThreat_data.INST_DETAIL_NM);
			} else {
				el.find('.ooec_show').hide();
			}
			el.find('#DRULE_NM').html(getThreat_data.DRULE_NM);
			el.find('#TW_ID').html(getThreat_data.TW_ID);
			el.find('#TW_ATT_IP').html(getThreat_data.TW_ATT_IP + search_btn);
			$compile(el.find('#TW_ATT_IP'))($scope);
			if (getThreat_data.TW_ATT_IP_SEARCH_DATA) {
				el.find("#search_data").show();
				el.find("#search_attip_btn").attr("disabled", true);
				var data = getThreat_data.TW_ATT_IP_SEARCH_DATA;
				el.find("#SC_INST_NM").html(data.INST_NM);
				el.find("#SC_INST_HIGH_NM").html(data.INST_HIGH_NM);
			} else {
				el.find("#search_data").hide();
				el.find("#search_attip_btn").attr("disabled", false);
				$scope.search_attip_btn = function () {
					var ip = {
						att_ip: el.find('#TW_ATT_IP').text(),
						_id: getThreat_data._id,
						regist_type: "monitoring"
					};
					$http.post(gAction.search_assets, $.param(ip), $rootScope.http_config).then(function (rs) {
						if (rs.data.sOk) {
							var data = rs.data.sOk;
							alert("출발지IP와 일치하는 자산을 가진 기관이 있습니다.");
							el.find("#search_data").show();
							el.find("#search_attip_btn").attr("disabled", true);
							el.find("#SC_INST_NM").html(data.INST_NM);
							el.find("#SC_INST_HIGH_NM").html(data.INST_HIGH_NM);
						}
						if (rs.data.no) {
							el.find("#search_attip_btn").attr("disabled", true);
							alert('등록되어 있는 자산 중에 출발지IP( ' + ip.att_ip + ' )와 일치하는 IP가 없습니다.');
							return;
						}
						if (rs.data.sError)
							alert(rs.data.sError);
						if (rs.status == 440)
							$scope.$emit('pageRD', [location.href, rs.status]);
						niUt.endLoading('.panel-body');
					}, function (rs) {
						$scope.$emit('pageRD', [location.href, rs.status]);
					});
				};
				
			}
			el.find('#TW_ATT_PORT').html(getThreat_data.TW_ATT_PORT);
			el.find('#TW_DMG_IP').html(getThreat_data.TW_DMG_IP);
			el.find('#TW_DMG_PORT').html(getThreat_data.TW_DMG_PORT);
			el.find('#TW_PROTO_NM').html(getThreat_data.TW_PROTO_NM);
			el.find('#TW_DETECT_CNT').html(getThreat_data.TW_DETECT_CNT);
			if (getThreat_data.GEAR_TYPE == '0') {
				el.find('.TW_NTM').show();
				el.find('.TW_MTM').hide();
				el.find('#TW_PATTERN_STR').html(getThreat_data.TW_PATTERN_STR);
				el.find('#TW_PATTERN_STR_hex').val(getThreat_data.TW_PATTERN_STR);
				var hex_to_string =  niCvUt.hex_to_string(getThreat_data.TW_PATTERN_STR)
				// el.find('#TW_PATTERN_STR_str').val(niCvUt.hex_to_string(getThreat_data.TW_PATTERN_STR));
				try {
					hex_to_string = decodeURIComponent(escape(decodeURIComponent(hex_to_string)));
				} catch (e) {
					hex_to_string = hex_to_string;
				}
				el.find('#TW_PATTERN_STR_str').val(hex_to_string);
			} else {
				el.find('.TW_NTM').hide();
				el.find('.TW_MTM').show();
				var mtm = {
					regist_type: 'monitoring',
					_id: getThreat_data._id,
					detectionDateTime: getThreat_data.TW_COLLECT_DT,
					institutionCode: getThreat_data.INST_CODE,
					equipCode: getThreat_data.GEAR_CODE,
					attackIp: getThreat_data.TW_ATT_IP,
					attackPort: getThreat_data.TW_ATT_PORT,
					victimIp: getThreat_data.TW_DMG_IP,
					victimPort: getThreat_data.TW_DMG_PORT
				};

				$http.post(gAction.mtmEvent, $.param(mtm), $rootScope.http_config).then(function (rs) {
					if (rs.data.no) {
						el.find("#TW_MALIG_FILE_NM").html("없음");
						var data = rs.data.no;
						getThreat_data.TW_MALIG_FILE_NM = data.TW_MALIG_FILE_NM;
						getThreat_data.TW_MALIG_FILE_SIZE = data.TW_MALIG_FILE_SIZE;
						el.find("#analyze_btn").attr("disabled", true);
					}
					if (rs.data.sOk) {
						var data = rs.data.result;
						getThreat_data.TW_MALIG_FILE_NM = data.detectionFileName;
						getThreat_data.TW_MALIG_FILE_SIZE = data.detectionFileSize;
						var drule = data.detectionRuleNames;
						el.find('#DRULE_NM').html("");
						if(typeof drule === 'object') {
							var htmls = '';
							for(var i in drule) {
								htmls +=  '<span>'+ drule[i] +' </span> <br />';
							}
							el.find('#DRULE_NM').html(htmls);
						}else {
							el.find('#DRULE_NM').html('<span>'+ drule+ '</span>');
						}
						// for (var i in drule) {
						// 	el.find('#DRULE_NM').append('<a href="javascript:;" ng-click="showDruleInfo(\''+drule[i]+'\', \'' + getThreat_data.GEAR_TYPE + '\')">' + drule[i] + '</a>');
						// 	el.find('#DRULE_NM').append("\n");
						// }
						$compile('#DRULE_NM')($scope);
						var filename = getThreat_data.TW_MALIG_FILE_NM + " (" + niCvUt.bytesToSize(getThreat_data.TW_MALIG_FILE_SIZE) + ")";
						el.find('#TW_MALIG_FILE_NM').html('<a href="javascript:;" ng-click="FileDownload(\''+ getThreat_data._id +'\', \'' + getThreat_data._datetime + '\')">' + filename+ '</a>');
						$compile('#TW_MALIG_FILE_NM')($scope);
						// el.find("#TW_MALIG_FILE_NM").html(getThreat_data.TW_MALIG_FILE_NM + " (" + niCvUt.bytesToSize(getThreat_data.TW_MALIG_FILE_SIZE) + ")");
						el.find("#analyze_btn").attr("disabled", false);
					}
					if (rs.data.sError)
						alert(rs.data.sError);
					if (rs.status == 440)
						$scope.$emit('pageRD', [location.href, rs.status]);
					niUt.endLoading('.panel-body');
				}, function (rs) {
					$scope.$emit('pageRD', [location.href, rs.status]);
				});
			}

			//위험도 산정 정보
			if (risk_type == 'RISK') {
				el.find('.risk_old').show();
				el.find('.risk_v2').hide();
				el.find('#TW_RISK').html($scope.$parent.detail_risk_rank(risk_obj.RISK_VAL_0));
				el.find("#risk_val_nm").val($scope.$parent.compute_risk(risk_obj.RISK_VAL_0));
				el.find("#risk_val_0").val(risk_obj.RISK_VAL_0 + " (" + compute_risk(risk_obj.RISK_VAL_0) + ")");
				for (var i = 1; i < 4; i++) {
					el.find("#risk_val_" + i).val(compute_risk(risk_obj['RISK_VAL_' + i]));
				}
				for (var i = 0; i < 7; i++) {
					el.find("#intent_val_" + i).val(compute_risk(risk_obj['INTENT_VAL_' + i]));
				}
				for (var i = 1; i < 23; i++) {
					el.find("#assets_val_" + i).val(compute_risk(risk_obj['ASSETS_VAL_' + i]));
				}
				for (var i = 1; i < 6; i++) {
					el.find("#source_val_" + i).val(compute_risk(risk_obj['SOURCE_VAL_' + i]));
				}
				
				el.find('#in_spec_1').val(risk_obj.IN_SPEC_VAL_1);
				el.find('#in_spec_2').val(risk_obj.IN_SPEC_VAL_2);
				el.find('#in_spec_2_1').val(risk_obj.IN_SPEC_VAL_2_1);
				el.find('#in_spec_2_2').val(risk_obj.IN_SPEC_VAL_2_2);
				el.find('#in_spec_2_3').val(risk_obj.IN_SPEC_VAL_2_3);
				el.find('#in_spec_2_4').val(risk_obj.IN_SPEC_VAL_2_4);

				var global = parseInt(risk_obj.GLOBAL_VAL_1);
				el.find("#global_val_low").val("-");
				el.find("#global_val_medium").val("-");
				el.find("#global_val_high").val("-");
				el.find("#global_val_critical").val("-");
				if (global >= 21 && global <= 40) {
					el.find("#global_val_low").val(risk_code[1].CC_NM);
				} else if (global >= 41 && global <= 60) {
					el.find("#global_val_medium").val(risk_code[2].CC_NM);
				} else if (global >= 61 && global <= 80) {
					el.find("#global_val_high").val(risk_code[3].CC_NM);
				} else if (global >= 81 && global <= 100) {
					el.find("#global_val_critical").val(risk_code[4].CC_NM);
				}
			} else {
				el.find('.risk_old').hide();
				el.find('.risk_v2').show();
				el.find('#TW_RISK').html($scope.$parent.detail_risk_rank($scope.$parent.risk_v2_obj.RISK_VAL_0));
				el.find("#risk_val_nm").val($scope.$parent.compute_risk(risk_v2_obj.RISK_VAL_0));
				el.find("#risk_val_0").val(risk_v2_obj.RISK_VAL_0 + " (" + $scope.$parent.compute_risk(risk_v2_obj.RISK_VAL_0) + ")");
				for (var i = 1; i < 4; i++) {
					el.find("#risk_val_" + i).val($scope.$parent.compute_risk(risk_v2_obj['RISK_VAL_' + i]));
				}
				for (var i = 0; i < 7; i++) {
					el.find("#intent_val_" + i).val($scope.$parent.compute_risk(risk_v2_obj['INTENT_VAL_' + i]));
				}
				for (var i = 1; i < 23; i++) {
					el.find("#assets_val_" + i).val($scope.$parent.compute_risk(risk_v2_obj['ASSETS_VAL_' + i]));
				}
				for (var i = 1; i < 6; i++) {
					el.find("#source_val_" + i).val($scope.$parent.compute_risk(risk_v2_obj['SOURCE_VAL_' + i]));
				}
				//탐지규칙 중요도
				el.find('#detect_rule_val_1').val($scope.$parent.compute_risk(risk_v2_obj['DETECT_RULE_VAL_1']));
				//취약점 점검 이력
				for (var i = 1; i < 21; i++) {
					el.find('#weekness_val_' + i).val($scope.$parent.compute_risk(risk_v2_obj["WEEKNESS_VAL_" +i]));
				}
				//시나리오 적중률
				for (var i = 1; i < 4; i++) {
					el.find('#scen_hit_val_' + i).val($scope.$parent.compute_risk(risk_v2_obj["SCEN_HIT_VAL_" +i]));
				}
				//침해사고 이력 //! 2020 고도화로인해 더이상 사용하지 않기로해서 일단 주석처리
				// for (var i = 1; i < 7; i++) {
				// 	el.find('#accd_hist_val_' + i).val($scope.$parent.compute_risk(risk_v2_obj["ACCD_HIST_VAL_" +i]));
				// }
				
				var global = parseInt(risk_v2_obj.GLOBAL_VAL_1);
				el.find("#global_val_low").val("-");
				el.find("#global_val_medium").val("-");
				el.find("#global_val_high").val("-");
				el.find("#global_val_critical").val("-");
				if (global >= 21 && global <= 40) {
					el.find("#global_val_low").val(risk_code[1].CC_NM);
				} else if (global >= 41 && global <= 60) {
					el.find("#global_val_medium").val(risk_code[2].CC_NM);
				} else if (global >= 61 && global <= 80) {
					el.find("#global_val_high").val(risk_code[3].CC_NM);
				} else if (global >= 81 && global <= 100) {
					el.find("#global_val_critical").val(risk_code[4].CC_NM);
				}
			}

			el.find('#anal_finish').val(getThreat_data._id);
			//@@EXP 파일 분석 기록 확인
			let ax_id;
			let fx_anal;
			if (getThreat_data.GEAR_TYPE == '1') {
				el.find("#TW_MALIG_FILE_RESULT_AX").html('');
				el.find("#TW_MALIG_FILE_RESULT_FX").html('');
				el.find("#analyze_btn").show();
				el.find("#analyze_refresh_btn").hide();
				el.find("#go_ax_btn").attr("disabled", true);
				el.find("#go_fx_btn").attr("disabled", true);
				var analyze_file_check = function () {
					$http.post(gAction.analyze_file_check, $.param({_id: getThreat_data._id, regist_type: 'monitoring',	_datetime: getThreat_data._datetime}), $rootScope.http_config).then(function (rs) {
						if(rs.sOk="ok"){console.log("------- 파일 분석 기록 확인 ---------");
						console.log(rs);
						//AX
						let ax_state;
						if (typeof rs.data.AX != 'undefined') {
							ax_state = rs.data.AX.state;
							if (ax_state == 0) {
								console.log("AX분석중");
								el.find("#analyze_btn").hide();
								el.find("#analyze_refresh_btn").show();
								el.find("#analyze_btn").attr("disabled", true);
								// el.find("#TW_MALIG_FILE_NM").html(getThreat_data.TW_MALIG_FILE_NM + " (" + niCvUt.bytesToSize(getThreat_data.TW_MALIG_FILE_SIZE) + ") <span class='org'>-> 현재 분석 중인 파일입니다.</span>");
								el.find("#TW_MALIG_FILE_NM").html(getThreat_data.TW_MALIG_FILE_NM + " (" + niCvUt.bytesToSize(getThreat_data.TW_MALIG_FILE_SIZE) + ")");
								el.find('#TW_MALIG_FILE_RESULT_AX').html('현재 AX에서 분석 중인 파일입니다.');
							} else if (ax_state == 1) {
								console.log("AX결과있음");
								console.log(rs.data.AX);
								let result = rs.data.AX.result;
								ax_id = rs.data.AX.id;
								if(!rs.data.AX.id){
									el.find("#go_ax_btn").attr("disabled", true);
								}else{
									el.find("#go_ax_btn").attr("disabled", false);
								}
								
								if (result == 'majr') {
									console.log("AX감염");
									console.log(rs.data.AX);
									el.find("#analyze_btn").show();
									el.find("#analyze_refresh_btn").hide();
									el.find("#analyze_btn").attr("disabled", true);
									// el.find("#TW_MALIG_FILE_NM").html(getThreat_data.TW_MALIG_FILE_NM + " (" + niCvUt.bytesToSize(getThreat_data.TW_MALIG_FILE_SIZE) + ") <span class='org'>-> 분석결과 : 감염된 파일입니다.</span>");
									el.find("#TW_MALIG_FILE_NM").html(getThreat_data.TW_MALIG_FILE_NM + " (" + niCvUt.bytesToSize(getThreat_data.TW_MALIG_FILE_SIZE) + ")");
									if (typeof rs.data.AX.anal != undefined) {
										let anal = rs.data.AX.anal;
										el.find("#TW_MALIG_FILE_RESULT_AX").html('');
										var html = '';
										html += "[감염된 파일입니다.]" + "\n" ;
										html += '<table class="table table-striped table-bordered">';
										let data = new Map();
										for(let key in anal){
											html += '<tr>';
											if (key == 'os_changes' || key == 'malware_detected' || key == 'cnc_services') {
												html += '<td style="width: 10%;">' + key + '</td>';
												html += '<td id="view_' + key + '" style="text-align:left;"></td>'
												data.put(key, anal[key]);
											} else {
												html += '<td style="width: 10%;">' + key + '</td>';
												html += '<td style="text-align:left;">' + anal[key] + '</td>';
											}
											html += '</tr>';
										}
										html += '</table>';
										el.find('#TW_MALIG_FILE_RESULT_AX').html(html);
										var ax_data = data.map;
										for (var key in ax_data) {
											el.find('#view_' + key).jsonViewer(JSON.parse(ax_data[key]), {keyword: "", map: data});
										}
									}
								} else {
									console.log("AX감염아님");
									el.find("#analyze_btn").show();
									el.find("#analyze_refresh_btn").hide();
									el.find("#analyze_btn").attr("disabled", true);
									// el.find("#TW_MALIG_FILE_NM").html(getThreat_data.TW_MALIG_FILE_NM + " (" + niCvUt.bytesToSize(getThreat_data.TW_MALIG_FILE_SIZE) + ") <span class='org'>-> 분석결과 : 감염되지 않은 파일입니다.</span>");
									el.find("#TW_MALIG_FILE_NM").html(getThreat_data.TW_MALIG_FILE_NM + " (" + niCvUt.bytesToSize(getThreat_data.TW_MALIG_FILE_SIZE) + ")");
									el.find("#TW_MALIG_FILE_RESULT_AX").html('');
									// el.find("#TW_MALIG_FILE_RESULT_AX").append("[감염되지 않은 파일입니다.]");
									el.find("#TW_MALIG_FILE_RESULT_AX").html("[감염되지 않은 파일입니다.]");
								}
								
							} else {
								console.log("AX결과없음");
								el.find("#analyze_btn").attr("disabled", false);
								el.find("#analyze_btn").show();
								el.find("#analyze_refresh_btn").hide();
							}
						}
						
						//FX
						let fx_state;
						if (typeof rs.data.FX != 'undefined') {
							fx_state = rs.data.FX.state;
							if (fx_state == 0) {
								console.log("FX분석중");
								/*
							el.find("#analyze_btn").hide();
							el.find("#analyze_refresh_btn").show();
							el.find("#analyze_btn").attr("disabled", true);
							el.find("#TW_MALIG_FILE_NM").html(getThreat_data.TW_MALIG_FILE_NM + " (" + niCvUt.bytesToSize(getThreat_data.TW_MALIG_FILE_SIZE) + ") <span class='org'>-> 현재 분석 중인 파일입니다.</span>");
								 */
								el.find("#TW_MALIG_FILE_RESULT_FX").html("현재 FX에서 분석 중인 파일입니다.");
							} else if (fx_state == 1) {
								console.log("FX결과있음");
								let result = rs.data.FX.result
								
								if (result) {
									console.log("FX감염");
									console.log(rs.data.FX);
									/*
								el.find("#analyze_btn").show();
								el.find("#analyze_refresh_btn").hide();
								el.find("#analyze_btn").attr("disabled", true);
								el.find("#TW_MALIG_FILE_NM").html(getThreat_data.TW_MALIG_FILE_NM + " (" + niCvUt.bytesToSize(getThreat_data.TW_MALIG_FILE_SIZE) + ") <span class='org'>-> 분석결과 : 감염된 파일입니다.</span>");
									 */
									if (typeof rs.data.FX.anal != undefined) {
										let anal = rs.data.FX.anal;
										fx_anal = anal;
										el.find("#TW_MALIG_FILE_RESULT_FX").html('');
										var html = '';
										html += '<table class="table table-striped table-bordered">';
										for(let key in anal){
											// el.find("#TW_MALIG_FILE_RESULT_FX").append(key+": "+anal[key]+"\n");
											html += '<tr>';
											html += '<td style="width: 10%;>' + key + '</td>';
											html += '<td>' + anal[key] + '</td>'
											html += '</tr>';
										}
										html += '</table>';
										if(!anal || typeof anal.UUID == "undefined"){
											el.find("#go_fx_btn").attr("disabled", true);
											// el.find("#TW_MALIG_FILE_RESULT_FX").html("분석 결과 : " + result);
											html += '분석 결과 : ' + result;
										}else{
											el.find("#go_fx_btn").attr("disabled", false);
										}
										el.find('#TW_MALIG_FILE_RESULT_FX').html(html);
									}
								} else {
									console.log("FX감염아님");
									/*
								el.find("#analyze_btn").show();
								el.find("#analyze_refresh_btn").hide();
								el.find("#analyze_btn").attr("disabled", true);
								el.find("#TW_MALIG_FILE_NM").html(getThreat_data.TW_MALIG_FILE_NM + " (" + niCvUt.bytesToSize(getThreat_data.TW_MALIG_FILE_SIZE) + ") <span class='org'>-> 분석결과 : 감염되지 않은 파일입니다.</span>");
									 */
								}
								
							} else {
								console.log("FX결과없음");
								/*
							el.find("#analyze_btn").attr("disabled", false);
							el.find("#analyze_btn").show();
							el.find("#analyze_refresh_btn").hide();
								 */
							}
						}}else if(rs.sError){
							alert(rs.sError)
						}else{
							alert("서버통신오류");
						}
					});
				};
				if (typeof getThreat_data.TW_MALIG_FILE_RESULT == 'undefined') {
					analyze_file_check();
				}
				//@@EXP 파일분석 새로고침
				$scope.analyze_refresh_btn = function () {
					analyze_file_check();
				};
			}
			
			//AX,FX 새탭 
			$scope.go_ax = function(){
				window.open(NI_CONF.fireeye_ax_url+ax_id,'_blank');
			}
			$scope.go_fx = function(){
				window.open(NI_CONF.fireeye_fx_url+fx_anal.UUID,'_blank');
			}
			//@@EXP 파일 분석
			$scope.analyze_btn = function () {
				console.log("파일 분석!!");
				if (getThreat_data.TW_MALIG_FILE_SIZE == 'null' || getThreat_data.TW_MALIG_FILE_SIZE == null || getThreat_data.TW_MALIG_FILE_SIZE == undefined) {
					alert("분석 할 파일이 없습니다.");
					return;
				}
				
				if (confirm("파일분석을 요청하시겠습니까?\n파일 크기에 따라 요청 시간이 다를 수 있습니다.")) {
					niUt.startLoading('.panel-body');
					var param = {
						_id: getThreat_data._id,
						regist_type: 'monitoring',
						_datetime: getThreat_data._datetime
					};
					console.log(param);
//					alert("분석 요청 중 입니다.\n잠시만 기다려주시기 바랍니다.");
					$http.post(sAction.analyze_file, $.param(param), $rootScope.http_config).then(function (rs) {
						if (rs.data.sOk) {
							alert('파일분석 요청 완료');
							el.find("#analyze_btn").hide();
							el.find("#analyze_refresh_btn").show();
							// el.find("#TW_MALIG_FILE_NM").html(getThreat_data.TW_MALIG_FILE_NM + " (" + niCvUt.bytesToSize(getThreat_data.TW_MALIG_FILE_SIZE) + ") <span class='org'>-> 현재 분석 중인 파일입니다.</span>");
							el.find("#TW_MALIG_FILE_NM").html(getThreat_data.TW_MALIG_FILE_NM + " (" + niCvUt.bytesToSize(getThreat_data.TW_MALIG_FILE_SIZE) + ")");
							el.find('#TW_MALIG_FILE_RESULT_AX').html("현재 AX에서 분석 중인 파일입니다.");
						}
						
						if (rs.data.sError)
							alert(rs.data.sError);
						if (rs.status == 440)
							$scope.$emit('pageRD', [location.href, rs.status]);
						niUt.endLoading('.panel-body');
					}, function (rs) {
						$scope.$emit('pageRD', [location.href, rs.status]);
					});
				}
			};
			//시나리오 정보 출력
			$scope.$parent.load_scenario(getThreat_data.SCEN_INFOS);
			
			var att_type = (getThreat_data.DRULE_NM).split("-");
			if (getThreat_data.DRULE_NM.indexOf("-") == -1) {
				att_type = (getThreat_data.DRULE_NM).split("_");
			}
			var att_type_code1 = '';
			var att_type_nm1 = '';
			var att_type_code2 = '';
			var att_type_nm2 = '';
			//공격유형 주분류 데이터 구하기
			$http.post(gAction.att_type, $.param({att_type: att_type[0]}), $rootScope.http_config).then(function (rs) {
				att_type_code1 = rs.data.attack.hits.hits[0]._source.CC_CODE;
				att_type_nm1 = rs.data.attack.hits.hits[0]._source.CC_NM;
			});
			//공격유형 세분류 데이터 구하기
			$http.post(gAction.att_type, $.param({att_type: att_type[1]}), $rootScope.http_config).then(function (rs) {
				att_type_code2 = rs.data.attack.hits.hits[0]._source.CC_CODE;
				att_type_nm2 = rs.data.attack.hits.hits[0]._source.CC_NM;
			});
			//@@EXP 사고 등록
			$scope.accd_save = function () {
				console.log(getThreat_data);
				var param = {
					regist_type: 'monitoring',
					_id: getThreat_data._id,
					TW_ID_ORI: getThreat_data.TW_ID_ORI,
					ACCD_RESPONSE_RESULT: "null",
					ACCD_PREVENT_RECURRENCE: "null",
					ACCD_REJECT: "null",
					ACCD_PROCESS_HISTORY: "null",
					ACCD_TITLE: '[' + getThreat_data.INST_NM + '] ' + att_type_nm1 + '-' + att_type_nm2,
					ACCD_PRIORITY_CODE: '2',
					ACCD_PRIORITY_NM: '일반',
					ACCD_INOUT: 0,
					ACCD_FIND_MTD_CODE: (getThreat_data.GEAR_TYPE == "0" ? 1 : 2),
					ACCD_FIND_MTD_NM: (getThreat_data.GEAR_TYPE == "0" ? "NTM" : "MTM"),
					GEAR_CODE: getThreat_data.GEAR_CODE,
					ACCD_ACCEPT_MTD_CODE: 1,
					ACCD_ACCEPT_MTD_NM: 'ECSC-위협',
					ACCD_INST_CODE: getThreat_data.INST_CODE,
					ACCD_INST_NM: getThreat_data.INST_NM,
					TW_DMG_IP: getThreat_data.TW_DMG_IP,
					TW_DMG_PORT: getThreat_data.TW_DMG_PORT,
					ACCD_DMG_PROTO_NM: getThreat_data.GEAR_TYPE == "0" ? getThreat_data.TW_PROTO_NM : "null",
					ACCD_DMG_PROTO_CODE: getThreat_data.GEAR_TYPE == "0" ? getThreat_data.TW_PROTO_CODE : "null",
					ACCD_DMG_ATTACK_NM: getThreat_data.DRULE_NM,
					DRULE_ATT_TYPE_CODE1: att_type_code1,
					DRULE_ATT_TYPE_CODE2: att_type_code2,
					DRULE_ATT_TYPE_NM1: att_type_nm1,
					DRULE_ATT_TYPE_NM2: att_type_nm2,
					TW_DMG_CT_CODE: getThreat_data.TW_DMG_CT_CODE,
					TW_DMG_GEOLOCATION: getThreat_data.TW_DMG_GEOLOCATION,
					TW_ATT_IP: getThreat_data.TW_ATT_IP,
					TW_ATT_PORT: getThreat_data.TW_ATT_PORT,
					TW_ATT_CT_CODE: getThreat_data.TW_ATT_CT_CODE,
					TW_ATT_GEOLOCATION: getThreat_data.TW_ATT_GEOLOCATION,
					TW_COLLECT_DT: getThreat_data.TW_COLLECT_DT,
					TW_DETECT_CNT: getThreat_data.TW_DETECT_CNT,
					ACCD_CONTENT: 'null',
					ACCD_TRACE_FILE_NM: 'null',
					ACCD_TRACE_FILE_ID: 'null',
					ACCD_TRACE_FILE_SIZE: 'null',
					INST_CODE: getThreat_data.INST_CODE,
					INST_NM: getThreat_data.INST_NM,
					DRULE_NM: getThreat_data.DRULE_NM,
					TW_PATTERN_STR: getThreat_data.TW_PATTERN_STR,
					TW_MALIG_FILE_NM: 'null', TW_MALIG_FILE_SIZE: 'null',
					ACCD_DMG_FILE_NM: 'null', ACCD_DMG_FILE_ID: 'null', ACCD_DMG_FILE_SIZE: 'null',
					ACCD_PROC_STAT_CODE: 'REGIST',
					ACCD_PROC_STAT_NM: '등록',
					ACCD_DETAIL_ORG_CODE: getThreat_data.INST_CODE, ACCD_DETAIL_ORG_NM: getThreat_data.INST_NM, ACCD_ACTION_MTD: 'null', ACCD_ROUTE_IP: 'null', ACCD_ROUTE_PORT: 'null',
					ACCD_TRANSFER_CONTACT_ID: 'null', ACCD_TRANSFER_CONTACT_NM: 'null', ACCD_ALLO_RESN_DESC: 'null',
					ACCD_INFORM_CONTACT_NM: 'null', ACCD_INFORM_HP: 'null', ACCD_INFORM_TEL: 'null', ACCD_INFORM_EMAIL: 'null', /*ACCD_INFORM_CONTACT_POSITION: 'null',*/
					ACCD_TRANSFER_TEL: 'null', ACCD_TRANSFER_HP: 'null', ACCD_TRANSFER_EMAIL: 'null', ACCD_TRANSFER_MSG: 'null', /*ACCD_TRANSFER_CONTACT_POSITION: 'null',*/
					ACCD_RESPONSE_DT: 'null', ACCD_RESPONSE_CONTACT_NM: 'null', ACCD_RESPONSE_TEL: 'null', ACCD_RESPONSE_HP: 'null', ACCD_RESPONSE_EMAIL: 'null', /*ACCD_RESPONSE_CONTACT_POSITION: 'null',*/
					ACCD_RESPONSE_STAT_CODE: 'null', ACCD_RESPONSE_STAT_NM: 'null', ACCD_REGIST_INST_CODE: '1', ACCD_REGIST_INST_NM: 'ECSC',
					ACCD_CONFIRM_DT: 'null', ACCD_ACCEPT_INST: 'null', ACCD_CLOSE_SCHEDULE_DT: 'null', ACCD_CLOSE_PROCESS_CODE: 'null', ACCD_CLOSE_PROCESS_NM: 'null', ACCD_PROC_TERM_CODE: 'null',
					ACCD_PROC_TERM_NM: 'null', ACCD_MAIL_TEMPLATE_CODE: 'null', ACCD_ACCEPT_DT: 'null', ACCD_UPD_DT: 'null', ACCD_RESPONSE_RESULT_DT: 'null',
					ACCD_CLOSE_DT: 'null'
				};
				if (getThreat_data.GEAR_TYPE == '1') {
					console.log("MTM 사고등록");
					param.TW_MALIG_FILE_NM = getThreat_data.TW_MALIG_FILE_NM;
					param.TW_MALIG_FILE_SIZE = getThreat_data.TW_MALIG_FILE_SIZE;
					param.TW_MALIG_FILE_RESULT = getThreat_data.TW_MALIG_FILE_RESULT;
					param.TW_MALIG_FILE_STATE = getThreat_data.TW_MALIG_FILE_STATE;
					param.ACCD_DMG_FILE_NM = getThreat_data.ACCD_DMG_FILE_NM;
					param.ACCD_DMG_FILE_ID = getThreat_data.ACCD_DMG_FILE_ID;
					param.ACCD_DMG_FILE_SIZE = getThreat_data.ACCD_DMG_FILE_SIZE;
					if (param.TW_MALIG_FILE_NM == null || param.TW_MALIG_FILE_NM == '') {
						param.TW_MALIG_FILE_NM = 'null';
					}
					if (param.TW_MALIG_FILE_SIZE == null || param.TW_MALIG_FILE_SIZE == '') {
						param.TW_MALIG_FILE_SIZE = 'null';
					}
					if (param.TW_MALIG_FILE_STATE == null || param.TW_MALIG_FILE_STATE == '') {
						param.TW_MALIG_FILE_STATE = 'null';
					}
					if (param.TW_MALIG_FILE_RESULT == null || param.TW_MALIG_FILE_RESULT == '') {
						param.TW_MALIG_FILE_RESULT = 'null';
					}
					if (param.ACCD_DMG_FILE_NM == null || param.ACCD_DMG_FILE_NM == '') {
						param.ACCD_DMG_FILE_NM = 'null';
					}
					if (param.ACCD_DMG_FILE_ID == null || param.ACCD_DMG_FILE_ID == '') {
						param.ACCD_DMG_FILE_ID = 'null';
					}
					if (param.ACCD_DMG_FILE_SIZE == null || param.ACCD_DMG_FILE_SIZE == '') {
						param.ACCD_DMG_FILE_SIZE = 0;
					}
					if (param.TW_ATT_CT_CODE == null || param.TW_ATT_CT_CODE == '') {
						param.TW_ATT_CT_CODE = 'null';
						param.TW_ATT_GEOLOCATION = 'null';
					}
					if (param.TW_DMG_CT_CODE == null || param.TW_DMG_CT_CODE == '') {
						param.TW_DMG_CT_CODE = 'null';
						param.TW_DMG_GEOLOCATION = 'null';
					}
					if (param.TW_DETECT_CNT == null) {
						param.TW_DETECT_CNT = 'null';
					}
					if (param.TW_PATTERN_STR == null) {
						param.TW_PATTERN_STR = 'null';
					}
				}
				//시도교육청일 때 기관정보 바꿔야함 ACCD_TITLE: '[' + getThreat_data.INST_NM + '] ' + att_type_nm1 + '-' + att_type_nm2,
				if (NI_CONF.is_ecsc == 'N') {
					if (getThreat_data.INST_DETAIL_CODE != null && getThreat_data.INST_DETAIL_CODE != '') {
						param.IS_DETAIL = 'true';
						param.ACCD_TITLE = '[' + getThreat_data.INST_DETAIL_NM + ']' + att_type_nm1 + '-' + att_type_nm2;
						param.INST_CODE = getThreat_data.INST_DETAIL_CODE;
						param.INST_NM = getThreat_data.INST_DETAIL_NM;

						param.ACCD_INST_CODE = getThreat_data.INST_DETAIL_CODE;
						param.ACCD_INST_NM = getThreat_data.INST_DETAIL_NM;

						param.ACCD_DETAIL_ORG_CODE = getThreat_data.INST_DETAIL_CODE;
						param.ACCD_DETAIL_ORG_NM = getThreat_data.INST_DETAIL_NM;
					} else {
						param.IS_DETAIL = 'false';
					}
					//등록기관 및 사고 접수방법 OOEC_CODE 가져와서 넣도록 변경 (예: 경상북도 교육청이면 GBE-위협)
					param.ACCD_REGIST_INST_NM = NI_CONF.ooec_name;
					param.ACCD_ACCEPT_MTD_NM = NI_CONF.ooec_name + '-위협';
				}
				console.log(param);
				if (confirm("선택한 위협경보를 사고 등록하시겠습니까?")) {
					niUt.startLoading('.panel-body');
					$http.post(sAction.accept_accd, $.param(param), $rootScope.http_config).then(function (rs) {
//						console.log(rs);
						if (rs.data.sOk) {
							alert('사고로 등록되었습니다.');
							$scope.load_data();
							$scope.pop_close();
						}
						if (rs.data.overlap) {
							var result = rs.data.overlap;
							alert("사고에 아직 처리되지 않은 동일한 정보의 위협경보가 있습니다.\n사고번호 : " + result.ACCD_NO + "\n사고제목 : " + result.ACCD_TITLE);
						}
						if (rs.data.sError)
							alert(rs.data.sError);
						if (rs.status == 440)
							$scope.$emit('pageRD', [location.href, rs.status]);
						niUt.endLoading('.panel-body');
					}, function (rs) {
						$scope.$emit('pageRD', [location.href, rs.status]);
					});
				}
			};
		};
		//@@EXP 상세보기 닫기   
		$scope.pop_close = function () {
			POP_STAT = null;
			el.find('#data_edit').hide();
			el.find('#data_list').show();
			$(window).trigger("resize");
		};
		//-----------------------------------------------------------------------
		//--------- MTM 파일 다운로드 -------------------------------------------------------------------
		$scope.FileDownload = function (id, dt) {
			var _id = id;

			var yyyy = dt.substring(0,4);
			var mm = dt.substring(5,7);
			var index = "data_mtm_event-" + yyyy + mm;

			var inputs = '';
			inputs += '<input type="hidden" name="_id" value="' + _id + '"\>';
			inputs += '<input type="hidden" name="index" value="' + index + '"\>';
			inputs += '<input type="hidden" name="columns" value="detectionFileContent"\>';
			jQuery('<form action="' + gAction.fileDown + '"method="post">' + inputs + '</form>').appendTo('body').submit().remove();
		};

        $scope.load_data();
		//-------------------------------------------------------------------------------------------

		//----- 자산정보 조회 --------------------------------------------------------
		//@@EXP 자산정보 팝업 설정
		var victim_pop_init = function () {
			var bWidth = 900;
			el.find('#victim_pop').width(bWidth);
			el.find('#victim_pop').height(453);
			el.find('#victim_pop').css('margin-left', -(bWidth / 2));
			el.find('#victim_pop .panel-body').css('padding', 7);
			el.find('#victim_pop').css('top', 245);
			el.find('#victim_pop').css('z-index', 100000);
			el.find('#victim_pop').reveal({
				animation: 'none',
				closeonbackgroundclick: true
			});
			el.find('#victim_pop .panel-body').height(170);
		};
		var victim_table;
		var victim_pop = function (data) {
			victim_pop_init();
			if (typeof victim_table != 'undefined') {
				victim_table.fnDestroy();
			}	
			$scope.victim_table = function () {
				victim_table = el.find('#victim_list').dataTable({
					ajax: {error: function (xhr) {
							if ("error" == xhr.statusText || xhr.readyState == 4)
								$scope.$emit('pageRD', [location.href, xhr.status]);
						}},
					bJQueryUI: false,
					bAutoWidth: false,
					bLengthChange: false,
					bPaginate: true,
					iDisplayLength: 10,
					sPaginationType: "full_numbers",
					scrollY: "200px",
					sDom: 'z<"dt-toolbar"> t <"dt-toolbar-footer" <"pull-right"p>>',
					language: {
						zeroRecords: "데이터가 없습니다",
						lengthMenu: "<div class='pull-right'>_MENU_</div >",
						search: '<span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span> ',
						paginate: {first: "First", last: "Last", next: ">", previous: "<"}
					},
					aoColumnDefs: [
						{aTargets: [0], sWidth: '15%', sClass: "text-left", bSortable: false},
						{aTargets: [1], sWidth: '15%', sClass: "text-left", bSortable: false},
						{aTargets: [2], sWidth: '13%', sClass: "text-left", type: 'ip-address', bSortable: false},
						{aTargets: [3], sWidth: '13%', sClass: "text-left", type: 'ip-address', bSortable: false},
						{aTargets: [4], sWidth: '10%', sClass: "text-left", bSortable: false},
						{aTargets: [5], sWidth: '12%', sClass: "text-left", bSortable: false},
						{aTargets: [6], sWidth: '22%', sClass: "text-left", bSortable: false}
					],
					aoColumns: [
						{mDataProp: "INST_SECTION"},
						{mDataProp: "INST_SECTION_SUB"},
						{mDataProp: "INST_IP.gte"},
						{mDataProp: "INST_IP.lte"},
						{mDataProp: "INST_IP_SECTION"},
						{mDataProp: "INST_ASSETS_SECTION"},
						{mDataProp: "INST_NOTE"}
					],
					createdRow: function (row, data) {
						$('td:eq(0)', row).html(data.INST_SECTION);
						$('td:eq(1)', row).html(data.INST_SECTION_SUB);
						$('td:eq(2)', row).html(data.INST_IP.gte);
						$('td:eq(3)', row).html(data.INST_IP.lte);
						$('td:eq(4)', row).html(ip_section(data.INST_IP_SECTION));
						$('td:eq(5)', row).html(assets_section(data.INST_ASSETS_SECTION));
						$('td:eq(6)', row).html(data.INST_NOTE);
						if (data.search_type == "dmg") {
							$('td:eq(2)', row).css('color', 'blue');
							$('td:eq(3)', row).css('color', 'blue');
						} else if (data.search_type == "att") {
							$('td:eq(2)', row).css('color', 'red');
							$('td:eq(3)', row).css('color', 'red');
						}
						$compile(row)($scope);
					}
				});

			};
			$scope.victim_table();
			victim_table.fnClearTable();
			victim_table.fnAddData(data);
			//@@EXP 자산정보 팝업창 닫기
			$scope.victim_close = function () {
				victim_table.fnClearTable();
				el.find("#victim_pop").trigger('reveal:close');
			};
		};
		//@@EXP 자산정보 서치 버튼
		$scope.search_vicip_btn = function () {
			var ip = {
				dmg_ip: el.find("#TW_DMG_IP").text(),
				inst_code: el.find("#INST_CODE").val(),
				_id: el.find("#_id").val(),
				regist_type: 'monitoring'
			};
			$http.post(gAction.search_victim_assets, $.param(ip), $rootScope.http_config).then(function (rs) {
				if (rs.data.att_no && rs.data.dmg_no) {
					alert("자산 정보가 없습니다.");
				} else {
					el.find("#result_att_ip").html("출발지IP : " + el.find("#TW_ATT_IP").text());
					el.find("#result_dmg_ip").html("목적지IP : " + el.find("#TW_DMG_IP").text());
					var att_data;
					var dmg_data;
					var data = [];
					if (rs.data.att_data) {
						att_data = rs.data.att_data;
						for (var i in att_data) {
							data.push(att_data[i]);
						}
					}
					if (rs.data.dmg_data) {
						dmg_data = rs.data.dmg_data;
						for (var i in dmg_data) {
							data.push(dmg_data[i]);
						}
					}
					victim_pop(data);
				}
				if (rs.data.sError)
					alert(rs.data.sError);
				if (rs.status == 440)
					$scope.$emit('pageRD', [location.href, rs.status]);
				niUt.endLoading('.panel-body');
			}, function (rs) {
				$scope.$emit('pageRD', [location.href, rs.status]);
			});
		};
		//@@EXP 기관IP대역 자산구분
		var assets_section = function (data) {
			switch (data) {
				case "":
					return "선택";
				case "3":
					return "WEB 서버";
				case "4":
					return "내부응용 서버";
				case "5":
					return "DB 서버";
				case "6":
					return "패치서버";
				case "7":
					return "네트워크 PC";
				case "8":
					return "보안 PC";
				case "9":
					return "업무용 PC";
				case "10":
					return "비업무용 PC";
				case "11":
					return "기타";
			}
		};
		//@@XEP 기관IP대역 IP구분
		var ip_section = function (data) {
			switch (data) {
				case "0":
					return "공인IP";
				case "1":
					return "사설IP";
			}
		};
		//-----------------------------------------------------------------------

		//----- 분석종료 --------------------------------------------------------
		//@@EXP 분석종료 팝업
		$scope.anal_finish = function () {
			$scope.$parent.anal_finish();
		};
		//@@EXP 분석종료 저장
		$scope.anal_finish_save = function () {
			var id = el.find('#anal_finish').val();
			var info = niCvUt.encodingTextArea(el.find('#tw_anal_info').val());
			var type_code = el.find('input:radio[name="threat_anal_type"]:checked').val();
			var etc_info = niCvUt.encodingTextArea(el.find('#threat_anal_etc_info').val());
			if (info == '') {
				alert("분석 정보를 입력해주시기 바랍니다.");
				return;
			}
			if (confirm("분석종료 하시겠습니까?")) {
				niUt.startLoading('.panel-body');
				var param = {
					regist_type: 'monitoring',
					_id: id, 
					_datetime: el.find('#_datetime').text(),
					TW_ANAL_INFO: info,
					TW_ANAL_TYPE_CODE: type_code,
					TW_ANAL_ETC_INFO: etc_info
				};
				$scope.$parent.threat_finish(param).then(function (rs) {
					if (rs.sOk) {
                        $scope.load_data();
                        $scope.filter_refresh();
                        $scope.pop_close();
                        $scope.anal_finish_close();
                        POP_STAT = null;
                    }
				}).catch(function(err) {
					alert(err);
				});
				niUt.endLoading('.panel-body')
			}
		};
		//@@EXP 분석종료 팝업 닫기
		$scope.anal_finish_close = function () {
			$scope.$parent.anal_finish_close();
		};
		//---------------------------------------------------------------------------

		//------ 새창/컬럼설정-----------------------------------------------------------
		//@@EXP 새창
		var window_number = 0;
		$scope.new_window = function () {
			window_number += 1;
			window.open('sas-pop.html#!/threat/newWindow', 'moitoring_' + window_number, 'width=1024, height=768');
		};
		//@@EXP 레이어 팝업을 열어주는 함수
		var open_layerPopup = function (e) {
			var bWidth = 800;
			el.find('#view_item').width(bWidth);
			el.find('#view_item').height(678);
			el.find('#view_item').css('margin-left', -(bWidth / 2));
			el.find('#view_item').css('top', 80);
			el.find('#view_item').css('z-index', 100000);
			el.find('#view_item').reveal({
				animation: 'none',
				closeonbackgroundclick: true
			});
		};
		var view_table;
		//@@EXP 컬럼설정
		$scope.view_load = function () {
			open_layerPopup();
			var cols = [];
			for (var i in cols_rank) {
				if (cols_rank[i].id != "_checkbox_selector") {
					cols.push(cols_rank[i]);
				}
			}
			view_table = el.find('#view_list').dataTable({
				bJQueryUI: false,
				bAutoWidth: false,
				bLengthChange: false,
				bPaginate: false,
				retrieve: true,
				sScrollY: "475px",
				sDom: 'z<"dt-toolbar" <"pull-left"f>> t',
				oLanguage: {
					sZeroRecords: "데이터가 없습니다",
					sLengthMenu: "<span>Show entries:</span> _MENU_",
					sSearch: '<span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span> ',
					oPaginate: {sFirst: "First", sLast: "Last", sNext: ">", sPrevious: "<"}
				},
				data: cols,
				aaSorting: [[0, '']],
				aoColumnDefs: [
					{aTargets: [0], sWidth: '60px', sortable: false, sClass: 'tx-c'},
					{aTargets: [1], sWidth: '*', sortable: false, sClass: 'tx-c'}
				],
				aoColumns: [
					{mDataProp: "RANK"},
					{mDataProp: "name"}
				],
				fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
					$(nRow).attr('id', 'tbl_list_tr_' + iDisplayIndex);
					view_drawRow(nRow, aData);
				},
				createdRow: function (nRow, aData) {
					if (aData.IS_USE == true || aData.IS_USE == 'true') {
						$('td:eq(0)', nRow).html('<div class="checkbox3 checkbox-sm checkbox-inline checkbox-check checkbox-light"><input type="checkbox" id="query_select_' + aData.id + '" class="input_check"  checked="checked"/><label for="query_select_' + aData.id + '"/></div>');
						el.find("#view_chk_total").attr('checked', true);
					} else {
						$('td:eq(0)', nRow).html('<div class="checkbox3 checkbox-sm checkbox-inline checkbox-check checkbox-light"><input type="checkbox" id="query_select_' + aData.id + '" class="input_check" /><label for="query_select_' + aData.id + '"/></div>');
						el.find("#view_chk_total").attr('checked', false);
					}

				}
			}).rowReordering();
			el.find(".dataTables_scroll").css("border-right", "0px");
			el.find(".dataTables_scroll").css("border-left", "0px");
			$(document).on("keyup", "#view_list_filter input", function () {
				if ($(this).val().match(/[\{\}\[\]\/?/.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi)) {
					$(this).val($(this).val().replace(/[\{\}\[\]\/?/.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi, ""));
				}
			});
			el.find("#view_chk_total").attr('checked', true);
			for (var i in columns) {
				if (columns[i].IS_USE == false && columns[i].field != 'sel') {
					el.find("#view_chk_total").attr('checked', false);
				}
			}
			//@@EXP 전체 체크/해제
			el.find("#view_chk_total").click(function () {
				$('.input_check').prop('checked', $(this).is(':checked'));
			});
			//@@EXP eunsun : 개별 체크시 전체목록의 체크 여부에 따라 view_chk_total 체크/해제
			el.on("click", "#view_list .input_check", function () {
				if (el.find("#view_chk_total").is(":checked")) {
					if (!$(this).is(":checked"))
						el.find("#view_chk_total").prop("checked", false);
				} else {
					if ($(this).is(":checked")) {
						var aData = view_table.fnGetData();
						var n = 0;
						for (var i in aData) {
							if (i != 0 && !el.find("#view_list .checkbox3 input[id*='" + aData[i].id + "']").is(":checked")) {
								n++;
								break;
							}
						}
						if (n == 0)
							el.find("#view_chk_total").prop("checked", true);
					}
				}
			});
		};
		//@@EXP 항목 지정 테이블 그리는 함수
		var view_drawRow = function (nRow, aData) {
			if (aData.field == 'sel') {
				nRow.style.display = 'none';
//				$('tr:eq(0)', nRow).attr('disabled', true);
//				$('td:eq(0)', nRow).html('<div class="checkbox3 checkbox-sm checkbox-inline checkbox-check checkbox-light"><input type="checkbox" id="query_select_' + aData.id + '" class="input_check" ' + (aData.IS_USE ? 'checked="checked"' : '') + '/><label for="query_select_' + aData.id + '"/></div>');
//				$('td:eq(1)', nRow).html("위협경보 선택 체크박스");
			} else {
				$('td:eq(0)', nRow).html('<div class="checkbox3 checkbox-sm checkbox-inline checkbox-check checkbox-light"><input type="checkbox" id="query_select_' + aData.id + '" class="input_check" ' + (aData.IS_USE ? 'checked="checked"' : '') + '/><label for="query_select_' + aData.id + '"/></div>');
				$('td:eq(1)', nRow).html(aData.name + " (" + aData.id + ")");
			}
		};
		//@@EXP 컬럼설정 저장 버튼 클릭 시 로컬호스트에 저장
		$scope.btn_view_save = function () {
			var aData = view_table.fnGetData();
			var temp = [];
			temp.push(checkboxSelector.getColumnDefinition());
			var setColumns = [];
			var col_data = new Map();
			for (var i in aData) {
				if (el.find("#view_list .checkbox3 input[id='query_select_" + aData[i].id + "']").is(":checked")) {
					aData[i].IS_USE = true;
				} else {
					aData[i].IS_USE = false;
				}
				setColumns.push(aData[i]);
				col_data.put(aData[i].id, aData[i]);
			}
			if (confirm("저장하시겠습니까?")) {
				$http.post(sAction.user_columns, $.param({type: "monitoring", json: JSON.stringify(setColumns)}), $rootScope.http_config).then(function (rs) {
					if (rs.data.sOk) {
						angular.forEach(columns, function (value, key) {
							if (value.id != "_checkbox_selector") {
								var data = col_data.get(value.id);
								value.IS_USE = data.IS_USE;
								value.RANK = data.RANK;
								value.width = data.width;
								if (data.IS_USE) {
									temp.push(value);
								}
							}
						});
						//랭크순 정렬
						var sortingField = "RANK";
						temp.sort(function (a, b) {
							return a[sortingField] - b[sortingField];
						});
						tbl.threat_list.setColumns(temp);
						el.find('#view_list').dataTable().fnDestroy();
						$scope.btn_view_close();
					}
					if (rs.data.sError) {
						alert(rs.data.sError);
					}
					if (rs.status == 440) {
						$scope.$emit("pageRD", [location.href, rs.status]);
					}
				}, function (rs) {
					$scope.$emit("pageRD", [location.href, rs.status]);
				});
			}
		};
		//@@EXP 컬럼설정 닫기
		$scope.btn_view_close = function () {
			$scope.view_load();
			el.find("#view_item").trigger('reveal:close');
		};
		el.on("click", "#view_item-bg", function () {
			$scope.btn_view_close();
		});
		//-------------------------------------------------------------------------

		//------ 검색조건 저장 및 수정 기능-----------------------------------------------------
		var searchTermTable; 
		var row_edit = null;
		var searchTermTable;
		var termCode;
		var tst_type = "monitoring";
		//@@EXP 검색조건 팝업창 설정
		var threat_search_term_pop = function () {
			var bWidth = 800;
			el.find('#term_item').width(bWidth);
			el.find('#term_item').height(678);
			el.find('#term_item').css('margin-left', -(bWidth / 2));
			el.find('#term_item').css('top', 80);
			el.find('#term_item').css('z-index', 100000);
			el.find('#term_item').reveal({
				animation: 'none',
				closeonbackgroundclick: true
			});
		};
		//@@EXP 검색조건 팝업창 및 목록
		$scope.threat_search_term = function() {
			row_edit = null;
			termCode = null;
			threat_search_term_pop();
			$scope.threat_search_term_table();
			var param = {
				type : tst_type
			};
			$http.post(gAction.searchTermList, $.param(param), $rootScope.http_config).then(function (rs){
				if (rs.data.sOk) {
					var data = niCvUt.resDataResult(rs, "data");
					searchTermTable.fnClearTable();
					if (data.length != 0) {	
						searchTermTable.fnAddData(data);
					} 
				}
				if (rs.data.sError) {
					alert(rs.data.sError);
				}
				if (rs.status == 440) {
					$scope.$emit("pageRD", [location.href, rs.status]);
				}
			}, function (rs) {
				$scope.$emit("pageRD", [location.href, rs.status]);
			});
		};
		//@@EXP 검색조건 데이터테이블
		$scope.threat_search_term_table = function () {
			searchTermTable = el.find("#term_list_table").dataTable({
				bJQueryUI: false,
				bAutoWidth: false,
				bLengthChange: true,
				bPaginate: true,
				retrieve: true,
				iDisplayLength: 25,
				aaSorting: [[3, 'desc'], [1, 'asc']],
				sScrollY: "365px",
				sDom: '<"dt-toolbar" <"pull-left"f>> t <"dt-toolbar-footer" <"pull-left"> <"pull-right"p>>',
				language: {
					sLoadingRecords: "Loading...",
					sZeroRecords: "데이터가 없습니다.",
					sLengthMenu: "<span>Show entries:</span> _MENU_",
					sSearch: '<span class="input-group-addon" style="background: unset; border: 0px;"><i class="fas fa-search"></i></span> ',
					oPaginate: {sFirst: "First", sLast: "Last", sNext: ">", sPrevious: "<"}
				},
				columnDefs: [
					{aTargets: [0], sWidth: '30px', sClass: 'text-center', bSearchable: false, bSortable: false},
					{aTargets: [1], sWidth: '200px', sClass: 'text-left', bSortable: true},
					{aTargets: [2], sWidth: '*', sClass: 'text-left', bSortable: true},
					{aTargets: [3], sWidth: '140px', sClass: 'tx-center', bSortable: true},
					{aTargets: [4], sWidth: '70px', sClass: 'tx-center', bSortable: false}
				],
				columns: [
					{mDataProp: "_id"},
					{mDataProp: "TST_NM"},
					{mDataProp: "TST_DESC"},
					{mDataProp: "TST_UPD_DT"},
					{mDataProp: "USER_ID"}
				],
				createdRow: function (row, data) {
					drawRow(row, data);
				}
			});
		};
		//@@EXP 등록 버튼 클릭 이벤트
		el.find('#btn_item_insert').click(function () {
			if (row_edit) {
				alert("이미 다른 작업이 있습니다.");
				return;
			}
			var new_row = searchTermTable.fnAddData({_id: '', TST_NM: '', TST_DESC: '', TST_TYPE: tst_type, TST_UPD_DT: '9999-12-31 23:59:59', USER_ID: '', mode: 'ins'});
			var row = searchTermTable.fnGetNodes(new_row);
			editRow(row);
			el.find("#TST_NM").focus();
		});
		//@@EXP row draw
		var drawRow = function (row, data) {
			if (!row_edit) {
				$('td:eq(0)', row).html('<div class="radio3 radio-sm" style="height:30px;"><input type="radio" name="term_select" id="term_select' + data._id + '" value="' + data._id + '"class="input_check"/><label for="term_select' + data._id + '"/></div>');
				$('td:eq(1)', row).html('<a href="javascript:;" class="show_data">' + data.TST_NM + '</a>');
				$('td:eq(2)', row).html(data.TST_DESC);
				$('td:eq(3)', row).html(data.TST_UPD_DT);
				var td = '<button class="btn btn-xs btn-warning edit_row" value="' + data._id + '" title="수정" style="margin:3px 0 0 0;"><span class="fas fa-pencil-alt"></span></button>';
				td += ' <button class="btn btn-xs btn-danger del_row" title="삭제" value="' + data._id + '" style="margin:3px 0 0 0;"><span class="fas fa-trash-alt"></span></button>';
				$('td:eq(4)', row).html(td);
				$compile(row)($scope);
			}
		}
		//@@EXP 수정
		var editRow = function (row) {
			row_edit = row;
			var data = searchTermTable.fnGetData(row);
			var set_td = $('>td', row);
			set_td[0].innerHTML = '';
			set_td[1].innerHTML = '<input type="text" id="TST_NM"class="input_box form-control" value="' + data.TST_NM + '" maxlength="100" style="width:100%;" noCharCustom="1">';
			set_td[2].innerHTML = '<input type="text" id="TST_DESC"class="input_box form-control" value="' + data.TST_DESC + '" maxlength="100" style="width:100%;" noCharCustom="1">';
			set_td[3].innerHTML = '<input type="text" id="TST_UPD_DT" class="input_box form-control" value="' + $filter("date")(new Date(), 'yyyy-MM-dd HH:mm:ss') + '" style="width:100%;" readonly="readonly">';
			var td = '<button class="btn btn-xs btn-warning save_row" title="저장" value="' + data._id + '"style="margin:3px 0 0 0;"><span class="fas fa-check"></span></button>';
			td += ' <button class="btn btn-xs btn-danger cancel_row" title="취소" style="margin:3px 0 0 0;"><span class="fas fa-times"></span></button>';
			set_td[4].innerHTML = td;
		};
		//@@EXP 내용 보기
		el.on("click", "#term_list_table .show_data", function () {
			var row = $(this).parents("tr")[0];
			var data = searchTermTable.fnGetData(row);
			var msg = "[ 검색조건 내용 ]\n";
			var mode;
			var tst_data = data.TST_DATA;
			for (var i in tst_data) {
				mode = tst_data[i].mode == 'add' ? '검색' : '예외';
				if (!tst_data[i].value) {
					msg +=  "[" + mode + "] " + tst_data[i].name + " : " + tst_data[i].value1 + "~" + tst_data[i].value2 + "\n";
				} else {
					if (tst_data[i].field == 'GEAR_TYPE') {
						var gear = tst_data[i].value == 0 ? 'NTM' : 'MTM';
						msg +=  "[" + mode + "] " + tst_data[i].name + " : " + gear + "\n";
					} else {
						msg +=  "[" + mode + "] " + tst_data[i].name + " : " + tst_data[i].value + "\n";
					}
				}
			}
			alert(msg);	
		})
		//@@EXP 저장 버튼
		el.on("click", "#term_list_table .save_row", function () {
			var row = $(this).parents("tr")[0];
			var data = searchTermTable.fnGetData(row);
			if (filter_data.length == 0) {
				alert("저장 할 검색조건이 없습니다.");
				return;
			} else {
				var param = {
					TST_TYPE: "monitoring",
					TST_NM : el.find("#TST_NM").val(),
					TST_DESC: el.find("#TST_DESC").val(),
					TST_UPD_DT: el.find("#TST_UPD_DT").val()
				}
				$scope.threat_search_term_action(data.mode, param);
			}
		});
		//@@EXP 수정 버튼
		el.on('click', '#term_list_table .edit_row', function () { 
			if (row_edit) {
				alert("이미 다른 작업이 있습니다.");
				return;
			}
			var row = $(this).parents('tr')[0];
			editRow(row);
			el.find('#TST_NM').focus();
		});
		//@@EXP 삭제 버튼
		el.on("click", "#term_list_table .del_row", function () { 
			if (row_edit) {
				alert("이미 다른 작업이 있습니다.");
				return;
			}
			var row = $(this).parents("tr")[0];
			var data = searchTermTable.fnGetData(row);
			if (confirm("검색조건 [" +data.TST_NM + "] 을/를 삭제 하시겠습니까?")) {
				var param = {
					mode: 'del',
					_id: data._id
				};
				$http.post(sAction.searchTermAction, $.param(param), $rootScope.http_config).then(function (rs) {
					if (rs.data.sOk) {
						alert("완료되었습니다.");
						row_edit = null;
						$scope.threat_search_term();
					}
					if (rs.data.sError) {
						alert(rs.data.sError);
					}
					if (rs.status == 440) {
						$scope.$emit("pageRD", [location.href, rs.status]);
					}
				}, function (rs) {
					$scope.$emit("pageRD", [location.href, rs.status]);
				});
			}
		});
		//@@EXP 취소 버튼
		el.on("click", "#term_list_table .cancel_row", function () {
			var row = $(this).parents("tr")[0];
			var data = searchTermTable.fnGetData(row);
			row_edit = null;
			if (data.TST_UPD_DT.indexOf("9999") != -1) {
				var iRow = searchTermTable.fnGetPosition(row);
				searchTermTable.fnDeleteRow(iRow);
			} else {
				drawRow(row, data);
			}
		});
		//@@EXP 검색조건 row 이벤트 (등록, 수정, 삭제)
		$scope.threat_search_term_action = function (mode, data) {
			var msg = "다음 검색 조건을 등록하시겠습니까?\n";
			if (!mode) {
				mode = 'upd'
				var _id = el.find(".save_row").val();
				data._id = _id;
				msg = "다음과 같이 검색 조건을 수정하시겠습니까?\n";
			}
			
			data.mode = mode;
			data.TST_DATA = JSON.stringify(filter_data);
			data.TST_TYPE = tst_type;
			for (var i in filter_data) {
				mode = filter_data[i].mode == 'add' ? '검색' : '예외';
				if (!filter_data[i].value) {
					msg +=  "[" + mode + "] " + filter_data[i].name + " : " + filter_data[i].value1 + "~" + filter_data[i].value2 + "\n";
				} else {
					if (filter_data[i].field == 'GEAR_TYPE') {
						var gear = filter_data[i].value == '0' ? 'NTM' : 'MTM';
						msg +=  "[" + mode + "] " + filter_data[i].name + " : " + gear + "\n";
					} else {
						msg +=  "[" + mode + "] " + filter_data[i].name + " : " + filter_data[i].value + "\n";
					}
				}
			}
			if (confirm(msg)) {
				$http.post(sAction.searchTermAction, $.param(data), $rootScope.http_config).then(function (rs) {
					if (rs.data.sOk) {
						alert("완료되었습니다.");
						row_edit = null;
						$scope.threat_search_term();
					}
					if (rs.data.sError) {
						alert(rs.data.sError);
					}
					if (rs.status == 440) {
						$scope.$emit("pageRD", [location.href, rs.status]);
					}
				}, function (rs) {
					$scope.$emit("pageRD", [location.href, rs.status]);
				});
			}
		};
		//@@EXP 검색조건 라디오버튼 클릭 이벤트
		el.on('click', '#term_list_table .input_check', function () {
			var row = $(this).parents('tr')[0];
			var data = searchTermTable.fnGetData(row);
			termCode = data.TST_DATA;
		});
		//@@EXP 검색조건 불러오기
		$scope.threat_search_term_load = function () {
			if (!termCode) {
				alert("불러올 검색조건을 선택해주세요.");
				return;
			} else {
				var msg = "다음 검색 조건을 불러오시겠습니까?\n";
				var mode;
				for (var i in termCode) {
					mode = termCode[i].mode == 'add' ? '검색' : '예외';
					if (!termCode[i].value) {
						msg +=  "[" + mode + "] " + termCode[i].name + " : " + termCode[i].value1 + "~" + termCode[i].value2 + "\n";
					} else {
						if (termCode[i].field == 'GEAR_TYPE') {
							var gear = termCode[i].value == 0 ? 'NTM' : 'MTM';
							msg +=  "[" + mode + "] " + termCode[i].name + " : " + gear + "\n";
						} else {
							msg +=  "[" + mode + "] " + termCode[i].name + " : " + termCode[i].value + "\n";
						}
					}
				}	
				if (confirm(msg)) {
					filter_data = [];
					def.filter_data = [];
					$.lcst('threat_monitoring', def);
					for (var i in termCode) {
						def.filter_data.push(termCode[i]);
					}
					el.find("#info_filter").show();
					el.find("#now_filter").hide();
					el.find("#now_filter").html('검색조건 > ');
					$.lcst('threat_monitoring', def);
					rt_cnt.rt_size = 1000;
					isNew = true;
					$scope.load_data();
					
					if (confirm("완료되었습니다. 검색조건 창을 닫으시겠습니까?")) {
						el.find("#term_item").trigger('reveal:close');
					}
				}
			}
		};
		$scope.threat_search_term_pop_close = function () {
			el.find("#term_item").trigger('reveal:close');
		};
		//-------------------------------------------------------------------------------------------

		//------ 시작/정지/긴급시나리오/위험도 필터 기능-----------------------------------------------------
		//@@EXP 정지
		$scope.collect_stop = function () {
			$scope.auto = false;
			el.find("#collect_stop").hide();
			el.find("#collect_start").show();
		};
		//@@EXP 시작
		$scope.collect_start = function () {
			$scope.auto = true;
			el.find("#collect_stop").show();
			el.find("#collect_start").hide();
		};
		//@@EXP 긴급시나리오만 보기
		$scope.pressing_true = function () {
			rt_cnt.rt_size = 1000;
			pressing = true;
			$scope.load_data();
			el.find("#pressing_true").hide();
			el.find("#pressing_false").show();
		};
		//@@EXP 전체보기
		$scope.pressing_false = function () {
			rt_cnt.rt_size = 1000;
			pressing = false;
			$scope.load_data();
			el.find("#pressing_true").show();
			el.find("#pressing_false").hide();
		};
//		//@@EXP 위험도 기능
//		el.on('change', '#risk_filter', function (e) {
//			rt_cnt.rt_size = 1000;
//			$scope.load_data();
//		});
//		
		//@@EXP 위험도 기능
		el.find("#risk_filter").multipleSelect({
			filter: true, selectAll: false, width: '100%',
			onClick: function (element) {
				rt_cnt.rt_size = 1000;
				var value = element.value;
				if (element.checked == true) {
					filter_list.risk += value;
				} else {
					if (typeof filter_list.risk == 'number') {
						filter_list.risk = value.toString();
					}
					if (typeof filter_list.risk == 'undefined') {
						filter_list.risk = value;
					}
					filter_list.risk = filter_list.risk.replace(value, "");
				}
				$scope.load_data();
			}
		});
		//-------------------------------------------------------------------------

// --------------------------------------------------------------- 단축키 및 Enter 모음 --------------------------------------------------------------- //

		//Ctrl+q : 초기화
		$rootScope.key_reset = function () {
			if (POP_STAT == null) {							//검색조건 초기화
				el.find("button[ng-click='filter_reset()']").click();
				return;
			}
		};
		//Ctrl+i : 등록
		$rootScope.key_insert = function () {
			if (POP_STAT == null) {							//컬럼설정
				el.find("button[ng-click='view_load()']").click();
				return;
			}
		};

		//Ctrl+s : 저장
		$rootScope.key_save = function () {
			if (POP_STAT == null) {							//위협경보 선택
				el.find("button[ng-click='threat_select()']").click();
				return;
			}
			if (POP_STAT == 'view_item') {						//컬럼설정 저장
				el.find("button[ng-click='btn_view_save()']").click();
				return;
			}
			if (POP_STAT == 'edit') {							//상세보기 사고 등록
				el.find("button[ng-click='accd_save()']").click();
				return;
			}
			if (POP_STAT == 'anal_finish_pop') {					//상세보기 분석 종료 시 분석 정보 입력 저장
				el.find("button[ng-click='anal_finish_save()']").click();
				return;
			}
		};
		
		$(document).keydown(function (e) {
			//Ctrl+a : 분석 종료(해당페이지만 적용)
			if ((e.ctrlKey || e.metaKey) && e.keyCode == 65) {
				if (POP_STAT == 'edit') {						//상세보기 분석 종료
					e.preventDefault();
					el.find("button[ng-click='anal_finish()']").click();
					return;
				}
			}
		});
		//ESC
		$rootScope.key_close = function () {
			if (POP_STAT == 'view_item') {						//컬럼설정 창 닫기
				el.find("button[ng-click='btn_view_close()']").click();
				return;
			}
			if (POP_STAT == 'edit') {							//상세보기 창 닫기
				el.find("button[ng-click='pop_close()']").click();
				return;
			}
			if (POP_STAT == 'anal_finish_pop') {					//상세보기 분석 종료 시 분석 정보 입력 창 닫기
				el.find("button[ng-click='anal_finish_close()']").click();
				return;
			}
			if (POP_STAT == 'term_item') {					//상세보기 분석 종료 시 분석 정보 입력 창 닫기
				el.find("button[ng-click='threat_search_term_pop_close()']").click();
				return;
			}
		};
		angular.element(el).ready(function () {
			$(window).trigger("resize");
		});
		$(window).trigger("resize");
		//@@EXP 페이지 이동시 $interval 종료 (종료 안하면 다른페이지에서도 돌아감)
		$scope.$on("$destroy", function () {
			$interval.cancel(list_reload);
		});
		$scope.load_data();
	});
});

