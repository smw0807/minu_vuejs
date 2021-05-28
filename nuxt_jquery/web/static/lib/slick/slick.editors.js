(function ($) {
	// register namespace
	$.extend(true, window, {
		"Slick": {
			"Editors": {
				"Select": SelectEditor,
				"SelectCd": SelectEditorCd,
				"SelectColumn": SelectEditorColumn,
				"Text": TextEditor,
				"Integer": IntegerEditor,
				"Date": DateEditor,
				"RangeDate": RangeDateEditor,
				"AndOrSelect": AndOrSelectEditor,
				"OperatorSelect": OperatorSelectEditor,
				"Checkbox": CheckboxEditor,
				"Radiobox": RadioboxEditor,
				"Lock": LockEditor,
				"PercentComplete": PercentCompleteEditor,
				"LongText": LongTextEditor,
				"RangeText": RangeTextEditor,
				"NumericRange": NumericRangeEditor,
				"CollectDate": CollectDate
			}
		}
	});
	
	function SelectEditor(args) {
		var map = args.item.map;
		var map_keys = map.keys();
		var $select;
		var defaultValue = args.item.COL_VALUE2;
		var scope = this;

		this.init = function () {
			var td = "<SELECT tabIndex='0' class='editor-yesno'>";
			for (var i in map_keys) {
				td += "<OPTION value='" + map.get(map_keys[i]).CODE + "'>" + map.get(map_keys[i]).NAME + "</OPTION>";
			}
			td += "</SELECT>";
			$select = $(td);

			$select.appendTo(args.container);
			$select.focus();
			$select.addClass("form-control");
		};

		this.destroy = function () {
			$select.remove();
		};

		this.focus = function () {
			$select.focus();
		};

		this.loadValue = function (item) {
			if (item[args.column.field] != 0) {
				$select.val(item[args.column.field]);
			} else {
				$select.val(map.get(map_keys[0]).CODE);
			}
			$select.select();
		};

		this.serializeValue = function () {
			return $select.val();
		};

		this.applyValue = function (item, state) {
			item[args.column.field] = state;
		};

		this.isValueChanged = function () {
			return ($select.val() != defaultValue);
		};

		this.validate = function () {
			return {
				valid: true,
				msg: null
			};
		};

		this.init();
	}

	function SelectEditorCd(args) {
		var map = args.column.m_data;
		var map_keys = map.keys();

		var $select;
		var defaultValue = '';
		var scope = this;

		this.init = function () {
			var td = "<SELECT >";
			td += "<OPTION value=''> --선택-- </OPTION>";
			for (var i in map_keys) {
				td += "<OPTION value='" + map.get(map_keys[i]).CODE + "'>" + map.get(map_keys[i]).NAME + "</OPTION>";
			}
			td += "</SELECT>";
			$select = $(td);

			$select.appendTo(args.container);
			$select.focus();
			//	$select.select();
		};

		this.destroy = function () {
			$select.remove();
		};

		this.focus = function () {
			$select.focus();
		};

		this.loadValue = function (item) {
			if (item[args.column.field] != 0) {
				$select.val(item[args.column.field]);
			} else {
				$select.val('');
			}
			$select.select();
		};

		this.serializeValue = function () {
			return $select.val();
		};

		this.applyValue = function (item, state) {
			item[args.column.field] = state;
		};

		this.isValueChanged = function () {
			return true;
			//return ($select.val() != defaultValue);
		};

		this.validate = function () {
			return {
				valid: true,
				msg: null
			};
		};

		this.init();
	}

	function SelectEditorColumn(args) {
		var lt = args.item.colArr;
		if (!lt || lt.length == 0) {
			console.info("EDIT 리턴");
			return;
		}
		var $select;
		var defaultValue = lt[0].COL_CODE;
		var scope = this;

		this.init = function () {
			var td = "<SELECT tabIndex='0' class='editor-yesno'>";
			for (var i in lt) {
				td += "<OPTION value='" + lt[i].COL_CODE + "'>" + lt[i].COL_NAME + "</OPTION>";
			}
			td += "</SELECT>";
			$select = $(td);

			$select.appendTo(args.container);
			$select.focus();
		};

		this.destroy = function () {
			$select.remove();
		};

		this.focus = function () {
			$select.focus();
		};

		this.loadValue = function (item) {
			if (item[args.column.field] != 0) {
				$select.val(item[args.column.field]);
			} else {
				$select.val(lt[0].COL_CODE);
			}
			$select.select();
		};

		this.serializeValue = function () {
			return $select.val();
		};

		this.applyValue = function (item, state) {
			item[args.column.field] = state;
		};

		this.isValueChanged = function () {
			return ($select.val() != defaultValue);
		};

		this.validate = function () {
			return {
				valid: true,
				msg: null
			};
		};

		this.init();
	}

	function TextEditor(args) {
		var $input;
		var defaultValue;
		var scope = this;

		this.init = function () {
			console.info(args.item.COL_TYPE);
			var inputAttr = '';
			if (args.item.COL_TYPE == "string" || args.item.COL_TYPE == "text" || args.item.COL_TYPE == "uri") {
				inputAttr = 'noCharCustom="1"';
			} else if (args.item.COL_TYPE == "int" || args.item.COL_TYPE == "num") {
				inputAttr = 'numberonly="1"';
			} else if (args.item.COL_TYPE == "ip") {
				inputAttr = 'id="ip_val" name="ip_val"';
			}
			if (args.item.COL_CODE == "left_bracket" || args.item.COL_CODE == "right_bracket") {
				$input = $("<INPUT type=hidden>")
			} else {
				$input = $("<INPUT type=text class='editor-text " + (args.item.COL_TYPE == "ip" ? " ip_box" : "") + "' " + inputAttr + "style='height:21px; width:100%;'/>")
						.appendTo(args.container)
						.bind("keydown.nav", function (e) {
							//if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
							if (e.keyCode === 37 || e.keyCode === 39) {
								e.stopImmediatePropagation();
							}
						})
						.focus()
						.select();
				$input.addClass("form-control");
			}
		};

		this.destroy = function () {
			$input.remove();
		};

		this.focus = function () {
			$input.focus();
		};

		this.getValue = function () {
			return $input.val();
		};

		this.setValue = function (val) {
			$input.val(val);
		};

		this.loadValue = function (item) {
			defaultValue = item[args.column.field] || "";
			$input.val(defaultValue);
			$input[0].defaultValue = defaultValue;
			$input.select();
			if (args.item.COL_TYPE == "ip") {
				$('#ip_val').ipaddress({cidr: false});
				$('input[type="text"].ip_octet').css('height', '1.4em')
			}
		};

		this.serializeValue = function () {
			return $input.val();
		};

		this.applyValue = function (item, state) {
			item[args.column.field] = state;
		};

		this.isValueChanged = function () {
			return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
		};

		this.validate = function () {
			if (args.column.validator) {
				var validationResults = args.column.validator($input.val());
				if (!validationResults.valid) {
					return validationResults;
				}
			}

			return {
				valid: true,
				msg: null
			};
		};

		this.init();
	}

	function IntegerEditor(args) {
		var $input;
		var defaultValue;
		var scope = this;

		this.init = function () {
			$input = $("<INPUT type=text class='editor-text input-sm' />");

			$input.bind("keydown.nav", function (e) {
				//if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
				if (e.keyCode === 37 || e.keyCode === 39) {
					e.stopImmediatePropagation();
				}
			});

			$input.appendTo(args.container);
			$input.focus().select();
		};

		this.destroy = function () {
			$input.remove();
		};

		this.focus = function () {
			$input.focus();
		};

		this.loadValue = function (item) {
			defaultValue = item[args.column.field];
			$input.val(defaultValue);
			$input[0].defaultValue = defaultValue;
			$input.select();
		};

		this.serializeValue = function () {
			return parseInt($input.val(), 10) || 0;
		};

		this.applyValue = function (item, state) {
			item[args.column.field] = state;
		};

		this.isValueChanged = function () {
			return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
		};

		this.validate = function () {
			if (isNaN($input.val())) {
				return {
					valid: false,
					msg: "Please enter a valid integer"
				};
			}

			return {
				valid: true,
				msg: null
			};
		};

		this.init();
	}

	function DateEditor(args) {
		var $input;
		var defaultValue;
		var scope = this;

		this.init = function () {
			$input = $("<INPUT type=text class='editor-text input-sm' />")
					.appendTo(args.container)
					.bind("keydown.nav", function (e) {
						if (e.keyCode === 37 || e.keyCode === 39) {
							e.stopImmediatePropagation();
						}
					})
					.focus()
					.select();
			$input.datetimepicker({
				mask: '9999-19-39 29:59:59',
				format: 'Y-m-d H:i:s',
				step: 1,
				datepicker: true,
				timepicker: true,
				onClose: function () {
				},
				onChangeDateTime: function (v) {
				}
			});
			$input.width($input.width() - 18);
			$(".xdsoft_datetimepicker").css("z-index", 10002);
			$input.addClass("form-control");
		};

		this.destroy = function () {
			$input.remove();
		};

		this.focus = function () {
			$input.focus();
		};

		this.getValue = function () {
			return $input.val();
		};

		this.setValue = function (val) {
			$input.val(val);
		};

		this.loadValue = function (item) {
			var strVal = item[args.column.field] + "";
			if (strVal.split(".0").length > 1) {
				defaultValue = strVal.split(".0")[0];
			} else {
				defaultValue = strVal + ".0";
			}
			$input.val(defaultValue);
			$input[0].defaultValue = defaultValue;
			$input.select();
		};

		this.serializeValue = function () {
			var strVal = $input.val() + "";
			var rt = "";
			if (strVal.split(".0").length > 1) {
				rt = strVal.split(".0")[0];
			} else {
				rt = strVal + ".0";
			}
			return rt;
		};

		this.applyValue = function (item, state) {
			item[args.column.field] = state;
		};

		this.isValueChanged = function () {
			return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
		};

		this.validate = function () {
			if (args.column.validator) {
				var validationResults = args.column.validator($input.val());
				if (!validationResults.valid) {
					return validationResults;
				}
			}

			return {
				valid: true,
				msg: null
			};
		};

		this.init();
	}

	function RangeDateEditor(args) {
		var $from, $to;
		var scope = this;
		var defaultValue;
		this.init = function () {
			$from = $("<INPUT type=text class='editor-text input-sm' style='width:100px'/>")
					.appendTo(args.container)
					.bind("keydown.nav", function (e) {
						if (e.keyCode === 37 || e.keyCode === 39) {
							e.stopImmediatePropagation();
						}
					})
					.focus()
					.select();
			$(args.container).append("&nbsp; AND &nbsp;");
			$to = $("<INPUT type=text class='editor-text input-sm' style='width:100px'/>")
					.appendTo(args.container)
					.bind("keydown.nav", function (e) {
						if (e.keyCode === 37 || e.keyCode === 39) {
							e.stopImmediatePropagation();
						}
					})
					.focus()
					.select();
			scope.focus();
			$from.datetimepicker({
				mask: '9999-19-39 29:59:59',
				format: 'Y-m-d H:i:s',
				step: 1,
				datepicker: true,
				timepicker: true,
				onClose: function () {
				},
				onChangeDateTime: function (v) {
				}
			});
			$to.datetimepicker({
				mask: '9999-19-39 29:59:59',
				format: 'Y-m-d H:i:s',
				step: 1,
				datepicker: true,
				timepicker: true,
				onClose: function () {
				},
				onChangeDateTime: function (v) {
				}
			});
			$from.width($from.width() - 18);
			$to.width($to.width() - 18);
			$(".xdsoft_datetimepicker").css("z-index", 10002);
		};

		this.destroy = function () {
			$(args.container).empty();
		};

		this.focus = function () {
			$from.focus();
		};

		//this.getValue = function () {
		//	return $input.val();
		//};

		//this.setValue = function (val) {
		//	$input.val(val);
		//};

		this.loadValue = function (item) {
			var val = item[args.column.field] + "";
			var valArr = val.split(" AND ");
			if (valArr.length > 1) {
				$from.val(valArr[0]);
				$to.val(valArr[1]);
			} else {
				$from.val(valArr[0]);
				$to.val(valArr[0]);
			}
		};

		this.serializeValue = function () {
			if ($from.val().trim() == "" && $to.val().trim() != "") {
				$from.val($to.val());
			}
			if ($from.val().trim() != "" && $to.val().trim() == "") {
				$to.val($from.val());
			}
			return $from.val() + " AND " + $to.val();
		};

		this.applyValue = function (item, state) {
			item[args.column.field] = state;
		};

		this.isValueChanged = function () {
			return args.item[args.column.field] != $from.val() + " AND " + $from.val();
		};

		this.validate = function () {
			return {
				valid: true,
				msg: null
			};
		};

		this.init();
	}

	function AndOrSelectEditor(args) {
		var $select;
		var defaultValue;
		var scope = this;

		this.init = function () {
			if (args.item.COL_CODE == "left_bracket") {
				$select = $("<SELECT tabIndex='0' class='editor-yesno'><OPTION value='-'>-</OPTION></SELECT>");
			} else {
				$select = $("<SELECT tabIndex='0' class='editor-yesno'><OPTION value='-'>-</OPTION><OPTION value='AND'>AND</OPTION><OPTION value='OR'>OR</OPTION></SELECT>");
			}
			
			$select.appendTo(args.container);
			$select.addClass("form-control");
			$select.focus();
		};

		this.destroy = function () {
			$select.remove();
		};

		this.focus = function () {
			$select.focus();
		};

		this.loadValue = function (item) {
			$select.val(item.COL_CONJUNCTION);
			$select.select();
		};

		this.serializeValue = function () {
			return $select.val();
		};

		this.applyValue = function (item, state) {
			item[args.column.field] = state;
		};

		this.isValueChanged = function () {
			return ($select.val() != defaultValue);
		};

		this.validate = function () {
			return {
				valid: true,
				msg: null
			};
		};

		this.init();
	}

	function OperatorSelectEditor(args) {
		var $select;
		var defaultValue = "=";
		var scope = this;

		this.init = function () {
			if (args.item.COL_VALUE1 == "link") {
				if(args.item.COL_TYPE == "int"){
					$select = $("<SELECT tabIndex='0' class='editor-yesno'><OPTION value='eq'>=</OPTION><OPTION value='neq'>!=</OPTION></SELECT>");
				 } else if(args.item.COL_TYPE == "ip"){
					 $select = $("<SELECT tabIndex='0' class='editor-yesno'><OPTION value='eq'>=</OPTION><OPTION value='neq'>!=</OPTION></SELECT>");
				 } else{
					 $select = $("<SELECT tabIndex='0' class='editor-yesno'><OPTION value='eq'>=</OPTION><OPTION value='neq'>!=</OPTION><OPTION value='like'>like</OPTION></SELECT>");
				 }
			} else if (args.item.COL_TYPE == "string" || args.item.COL_TYPE == "text" || args.item.COL_TYPE == "uri") {
				$select = $("<SELECT tabIndex='0' class='editor-yesno'><OPTION value='eq'>=</OPTION><OPTION value='neq'>!=</OPTION><OPTION value='like'>like</OPTION></SELECT>");
			} else if (args.item.COL_TYPE == "date") {
				//$select = $("<SELECT tabIndex='0' class='editor-yesno'><OPTION value='lt'>></OPTION><OPTION value='lte'>>=</OPTION><OPTION value='gt'><</OPTION><OPTION value='gte'><=</OPTION><OPTION value='eq'>=</OPTION><OPTION value='neq'>!=</OPTION><OPTION value='between'>between</OPTION></SELECT>");
				$select = $("<SELECT tabIndex='0' class='editor-yesno'><OPTION value='lt'><</OPTION><OPTION value='lte'><=</OPTION><OPTION value='gt'>></OPTION><OPTION value='gte'>>=</OPTION><OPTION value='eq'>=</OPTION><OPTION value='neq'>!=</OPTION></SELECT>");
			} else if (args.item.COL_TYPE == "ip") {
				//$select = $("<SELECT tabIndex='0' class='editor-yesno'><OPTION value='lt'>></OPTION><OPTION value='lte'>>=</OPTION><OPTION value='gt'><</OPTION><OPTION value='gte'><=</OPTION><OPTION value='eq'>=</OPTION><OPTION value='neq'>!=</OPTION><OPTION value='between'>between</OPTION></SELECT>");
				$select = $("<SELECT tabIndex='0' class='editor-yesno'><OPTION value='lt'><</OPTION><OPTION value='lte'><=</OPTION><OPTION value='gt'>></OPTION><OPTION value='gte'>>=</OPTION><OPTION value='eq'>=</OPTION><OPTION value='neq'>!=</OPTION></SELECT>");
			} else if (args.item.COL_TYPE == "code") {
				$select = $("<SELECT tabIndex='0' class='editor-yesno'><OPTION value='eq'>=</OPTION><OPTION value='neq'>!=</OPTION></SELECT>");
			} else if (args.item.COL_CODE == "left_bracket" || args.item.COL_CODE == "right_bracket") {
				//$select = $("<SELECT tabIndex='0' class='editor-yesno'><OPTION value='lt'>></OPTION><OPTION value='lte'>>=</OPTION><OPTION value='gt'><</OPTION><OPTION value='gte'><=</OPTION><OPTION value='eq'>=</OPTION><OPTION value='neq'>!=</OPTION><OPTION value='between'>between</OPTION></SELECT>");
				$select = $("<SELECT tabIndex='0' class='hide'><OPTION value=''></OPTION></SELECT>");
			} else {
				//$select = $("<SELECT tabIndex='0' class='editor-yesno'><OPTION value='lt'>></OPTION><OPTION value='lte'>>=</OPTION><OPTION value='gt'><</OPTION><OPTION value='gte'><=</OPTION><OPTION value='eq'>=</OPTION><OPTION value='neq'>!=</OPTION><OPTION value='between'>between</OPTION></SELECT>");
				$select = $("<SELECT tabIndex='0' class='editor-yesno'><OPTION value='lt'><</OPTION><OPTION value='lte'><=</OPTION><OPTION value='gt'>></OPTION><OPTION value='gte'>>=</OPTION><OPTION value='eq'>=</OPTION><OPTION value='neq'>!=</OPTION></SELECT>");
			}

			$select.appendTo(args.container);
			$select.focus();
			$select.addClass("form-control");
		};

		this.destroy = function () {
			$select.remove();
		};

		this.focus = function () {
			$select.focus();
		};

		this.loadValue = function (item) {
			if (args.item.COL_CODE == "left_bracket"||args.item.COL_CODE == "right_bracket") {
				$select.val("");
				$select.select();
			} else {
				console.info($select.val());
				$select.val((defaultValue = item[args.column.field]) ? item[args.column.field] : "=");
				$select.select();
			}
		};

		this.serializeValue = function () {
			return $select.val();
		};

		this.applyValue = function (item, state) {
			item[args.column.field] = state;
		};

		this.isValueChanged = function () {
			return ($select.val() != defaultValue);
		};

		this.validate = function () {
			return {
				valid: true,
				msg: null
			};
		};

		this.init();
	}

	function CheckboxEditor(args) {
		var $select;
		var defaultValue;
		var scope = this;

		this.init = function () {
			$select = $("<INPUT type=checkbox value='true' class='editor-checkbox' hideFocus>");
			$select.appendTo(args.container);
			$select.focus();
		};

		this.destroy = function () {
			$select.remove();
		};

		this.focus = function () {
			$select.focus();
		};

		this.loadValue = function (item) {
			defaultValue = !!item[args.column.field];
			if (defaultValue) {
				$select.prop('checked', true);
			} else {
				$select.prop('checked', false);
			}
		};

		this.serializeValue = function () {
			return $select.prop('checked');
			//return $select.prop('checked') ? "DESC" : "ASC";
		};

		this.applyValue = function (item, state) {
			item[args.column.field] = state;
		};

		this.isValueChanged = function () {
			return (this.serializeValue() !== defaultValue);
		};

		this.validate = function () {

			return {
				valid: true,
				msg: null
			};
		};

		this.init();
	}

	function RadioboxEditor(args) {
		var $select;
		var defaultValue = [];
		var scope = this;
		var str = ["sum", "avg", "min", "max"];

		this.init = function () {
			if (args.item.COL_TYPE != "num") {
				return;
			}
			$select = $("<font>sum :</font><INPUT type=checkbox id='" + args.item.COL_CODE + "_sum' value='true' class='editor-checkbox' hideFocus><font> avg :</font><INPUT type=checkbox id='" + args.item.COL_CODE + "_avg' value='true' class='editor-checkbox' hideFocus><font> min :</font><INPUT type=checkbox id='" + args.item.COL_CODE + "_min' value='true' class='editor-checkbox' hideFocus><font> max :</font><INPUT type=checkbox id='" + args.item.COL_CODE + "_max' value='true' class='editor-checkbox' hideFocus>");
			$select.appendTo(args.container);
			$select.focus();
		};

		this.destroy = function () {
			if (args.item.COL_TYPE != "num") {
				return;
			}
			$select.remove();
		};

		this.focus = function () {
			if (args.item.COL_TYPE != "num") {
				return;
			}
			$select.focus();
		};

		this.loadValue = function (item) {
			if (args.item.COL_TYPE != "num") {
				return;
			}
			var val = item[args.column.field] + "";
			for (var i in str) {
				if (~val.indexOf(str[i])) {
					defaultValue.push(true);
				} else {
					defaultValue.push(false);
				}
			}
			for (var i in defaultValue) {
				if (defaultValue[i]) {
					$("#" + item.COL_CODE + "_" + str[i]).prop('checked', true);
				} else {
					$("#" + item.COL_CODE + "_" + str[i]).prop('checked', false);
				}
			}
		};

		this.serializeValue = function () {
			if (args.item.COL_TYPE != "num") {
				return;
			}
			var temp = [];
			var aa = "";
			temp.push($("#" + args.item.COL_CODE + "_sum").prop('checked'));
			temp.push($("#" + args.item.COL_CODE + "_avg").prop('checked'));
			temp.push($("#" + args.item.COL_CODE + "_min").prop('checked'));
			temp.push($("#" + args.item.COL_CODE + "_max").prop('checked'));
			for (var i in temp) {
				if (temp[i]) {
					if (aa == "") {
						aa += str[i];
					} else {
						aa += ", " + str[i];
					}
				}
			}
			return aa;
		};

		this.applyValue = function (item, state) {
			if (args.item.COL_TYPE != "num") {
				return;
			}
			item[args.column.field] = state;
		};

		this.isValueChanged = function () {
			if (args.item.COL_TYPE != "num") {
				return;
			}
			return (this.serializeValue() !== defaultValue);
		};

		this.validate = function () {
			if (args.item.COL_TYPE != "num") {
				return;
			}
			return {
				valid: true,
				msg: null
			};
		};

		this.init();
	}

	function LockEditor(args) {
		var $input;
		var defaultValue;
		var scope = this;

		this.init = function () {
			$input = $("<INPUT type=text class='editor-text input-sm hide' readonly='readonly'/>")
					.appendTo(args.container)
					.bind("keydown.nav", function (e) {
						//if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
						if (e.keyCode === 37 || e.keyCode === 39) {
							e.stopImmediatePropagation();
						}
					})
					.focus()
					.select();
		};

		this.destroy = function () {
			$input.remove();
		};

		this.focus = function () {
			$input.focus();
		};

		this.getValue = function () {
			return $input.val();
		};

		this.setValue = function (val) {
			$input.val(val);
		};

		this.loadValue = function (item) {
			defaultValue = item[args.column.field] || "";
			$input.val(defaultValue);
			$input[0].defaultValue = defaultValue;
			$input.select();
		};

		this.serializeValue = function () {
			return $input.val();
		};

		this.applyValue = function (item, state) {
			item[args.column.field] = state;
		};

		this.isValueChanged = function () {
			return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
		};

		this.validate = function () {
			if (args.column.validator) {
				var validationResults = args.column.validator($input.val());
				if (!validationResults.valid) {
					return validationResults;
				}
			}

			return {
				valid: true,
				msg: null
			};
		};

		this.init();
	}

	function PercentCompleteEditor(args) {
		var $input, $picker;
		var defaultValue;
		var scope = this;

		this.init = function () {
			$input = $("<INPUT type=text class='editor-percentcomplete input-sm' />");
			$input.width($(args.container).innerWidth() - 25);
			$input.appendTo(args.container);

			$picker = $("<div class='editor-percentcomplete-picker' />").appendTo(args.container);
			$picker.append("<div class='editor-percentcomplete-helper'><div class='editor-percentcomplete-wrapper'><div class='editor-percentcomplete-slider' /><div class='editor-percentcomplete-buttons' /></div></div>");

			$picker.find(".editor-percentcomplete-buttons").append("<button val=0>Not started</button><br/><button val=50>In Progress</button><br/><button val=100>Complete</button>");

			$input.focus().select();

			$picker.find(".editor-percentcomplete-slider").slider({
				orientation: "vertical",
				range: "min",
				value: defaultValue,
				slide: function (event, ui) {
					$input.val(ui.value)
				}
			});

			$picker.find(".editor-percentcomplete-buttons button").bind("click", function (e) {
				$input.val($(this).attr("val"));
				$picker.find(".editor-percentcomplete-slider").slider("value", $(this).attr("val"));
			})
		};

		this.destroy = function () {
			$input.remove();
			$picker.remove();
		};

		this.focus = function () {
			$input.focus();
		};

		this.loadValue = function (item) {
			$input.val(defaultValue = item[args.column.field]);
			$input.select();
		};

		this.serializeValue = function () {
			return parseInt($input.val(), 10) || 0;
		};

		this.applyValue = function (item, state) {
			item[args.column.field] = state;
		};

		this.isValueChanged = function () {
			return (!($input.val() == "" && defaultValue == null)) && ((parseInt($input.val(), 10) || 0) != defaultValue);
		};

		this.validate = function () {
			if (isNaN(parseInt($input.val(), 10))) {
				return {
					valid: false,
					msg: "Please enter a valid positive number"
				};
			}

			return {
				valid: true,
				msg: null
			};
		};

		this.init();
	}

	/*
	 * An example of a "detached" editor.
	 * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
	 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
	 */
	function LongTextEditor(args) {
		var $input, $wrapper;
		var defaultValue;
		var scope = this;

		this.init = function () {
			var $container = $("body");

			$wrapper = $("<DIV style='z-index:1000000;position:absolute;background:white;padding:5px;border:3px solid gray; -moz-border-radius:10px; border-radius:10px;'/>")
					.appendTo($container);

			$input = $("<TEXTAREA hidefocus rows=5 style='backround:white;width:250px;height:80px;border:0;outline:0'>")
					.appendTo($wrapper);

			$("<DIV style='text-align:right'><BUTTON>Save</BUTTON><BUTTON>Cancel</BUTTON></DIV>")
					.appendTo($wrapper);

			$wrapper.find("button:first").bind("click", this.save);
			$wrapper.find("button:last").bind("click", this.cancel);
			$input.bind("keydown", this.handleKeyDown);

			scope.position(args.position);
			$input.focus().select();
			$input.addClass("form-control");
		};

		this.handleKeyDown = function (e) {
			if (e.which == 13 && 17) {
				scope.save();
			} else if (e.keyCode == 27) {
				e.preventDefault();
				scope.cancel();
			} else if (e.which == 9 && 16) {
				e.preventDefault();
				args.grid.navigatePrev();
			} else if (e.keyCode == e.keyCode.TAB) {
				e.preventDefault();
				args.grid.navigateNext();
			}
		};

		this.save = function () {
			args.commitChanges();
		};

		this.cancel = function () {
			$input.val(defaultValue);
			args.cancelChanges();
		};

		this.hide = function () {
			$wrapper.hide();
		};

		this.show = function () {
			$wrapper.show();
		};

		this.position = function (position) {
			$wrapper
					.css("top", position.top - 5)
					.css("left", position.left - 5)
		};

		this.destroy = function () {
			$wrapper.remove();
		};

		this.focus = function () {
			$input.focus();
		};

		this.loadValue = function (item) {
			$input.val(defaultValue = item[args.column.field]);
			$input.select();
		};

		this.serializeValue = function () {
			return $input.val();
		};

		this.applyValue = function (item, state) {
			item[args.column.field] = state;
		};

		this.isValueChanged = function () {
			return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
		};

		this.validate = function () {
			return {
				valid: true,
				msg: null
			};
		};

		this.init();
	}

	function RangeTextEditor(args) {
		var $from, $to;
		var scope = this;

		this.init = function () {
			$from = $("<INPUT type=text class='input-sm' style='width:75px' />")
					.appendTo(args.container)
					.bind("keydown", scope.handleKeyDown);
			$(args.container).append("&nbsp; AND &nbsp;");
			$to = $("<INPUT type=text class='input-sm' style='width:75px' />")
					.appendTo(args.container)
					.bind("keydown", scope.handleKeyDown);
			scope.focus();
		};
		this.handleKeyDown = function (e) {
			if (e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 9) {
				e.stopImmediatePropagation();
			}
		};
		this.destroy = function () {
			$(args.container).empty();
		};

		this.focus = function () {
			$from.focus();
		};

		this.loadValue = function (item) {
			var val = item[args.column.field] + "";
			var valArr = val.split(" AND ");
			if (valArr.length > 1) {
				$from.val(valArr[0]);
				$to.val(valArr[1]);
			} else {
				$from.val(valArr[0]);
				$to.val(valArr[0]);
			}
		};

		this.serializeValue = function () {
			if ($from.val().trim() == "" && $to.val().trim() != "") {
				$from.val($to.val());
			}
			if ($from.val().trim() != "" && $to.val().trim() == "") {
				$to.val($from.val());
			}
			return $from.val() + " AND " + $to.val();
		};

		this.applyValue = function (item, state) {
			item[args.column.field] = state;
		};

		this.isValueChanged = function () {
			return args.item[args.column.field] != $from.val() + " AND " + $from.val();
		};

		this.validate = function () {
			return {
				valid: true,
				msg: null
			};
		};

		this.init();
	}

	function NumericRangeEditor(args) {
		var $from, $to;
		var scope = this;
		this.init = function () {
			$from = $("<INPUT type=text class='input-sm' style='width:40px' />")
					.appendTo(args.container)
					.bind("keydown", scope.handleKeyDown);
			$(args.container).append("&nbsp; to &nbsp;");
			$to = $("<INPUT type=text class='input-sm' style='width:40px' />")
					.appendTo(args.container)
					.bind("keydown", scope.handleKeyDown);
			scope.focus();
		};
		this.handleKeyDown = function (e) {
			if (e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 9) {
				e.stopImmediatePropagation();
			}
		};
		this.destroy = function () {
			$(args.container).empty();
		};
		this.focus = function () {
			$from.focus();
		};
		this.serializeValue = function () {
			return {from: parseInt($from.val(), 10), to: parseInt($to.val(), 10)};
		};
		this.applyValue = function (item, state) {
			item.from = state.from;
			item.to = state.to;
		};
		this.loadValue = function (item) {
			$from.val(item.from);
			$to.val(item.to);
		};
		this.isValueChanged = function () {
			return args.item.from != parseInt($from.val(), 10) || args.item.to != parseInt($from.val(), 10);
		};
		this.validate = function () {
			if (isNaN(parseInt($from.val(), 10)) || isNaN(parseInt($to.val(), 10))) {
				return {valid: false, msg: "Please type in valid numbers."};
			}
			if (parseInt($from.val(), 10) > parseInt($to.val(), 10)) {
				return {valid: false, msg: "'from' cannot be greater than 'to'"};
			}
			return {valid: true, msg: null};
		};
		this.init();
	}

	function CollectDate(args) {
		var $select, $input;
		var defaultValue = "=";
		var scope = this;
		this.init = function () {
			if (args.item.REF_FLAG == "raw") {
				$input = $("<INPUT type=text class='editor-text' readonly value='0' style='width:100%; height: 22px;'/>")
						.appendTo(args.container)
						.bind("keydown.nav", function (e) {
							if (e.keyCode === 37 || e.keyCode === 39) {
								e.stopImmediatePropagation();
							}
						})
						.focus()
						.select();
			} else {
				$select = $("<SELECT tabIndex='0' class='editor-yesno' style='width:100%;'>\n\
								<OPTION value='0'>사용안함</OPTION>\n\
								<OPTION value='7'>1주</OPTION>\n\
								<OPTION value='30'>1개월</OPTION>\n\
								<OPTION value='60'>2개월</OPTION>\n\
								<OPTION value='90'>3개월</OPTION>\n\
								<OPTION value='120'>4개월</OPTION>\n\
								<OPTION value='150'>5개월</OPTION>\n\
								<OPTION value='180'>6개월</OPTION>\n\
								<OPTION value='360'>1년</OPTION>\n\
							</SELECT>");
				$select.appendTo(args.container);
				$select.focus();
			}
		};

		this.destroy = function () {
			if (args.item.REF_FLAG == "raw") {
				$input.remove();
			} else {
				$select.remove();
			}
		};

		this.focus = function () {
			if (args.item.REF_FLAG == "raw") {
				$input.focus();
			} else {
				$select.focus();
			}
		};

		this.loadValue = function (item) {
			if (args.item.REF_FLAG == "raw") {
				defaultValue = item[args.column.field];
				$input.val('0');
				$input[0].defaultValue = 'defaultValue';
				$input.select();
			} else {
				$select.val((defaultValue = item[args.column.field]) ? item[args.column.field] : "=");
				$select.select();
			}
		};

		this.serializeValue = function () {
			if (args.item.REF_FLAG == "raw") {
				return $input.val();
			} else {
				return $select.val();
			}

		};

		this.applyValue = function (item, state) {
			item[args.column.field] = state;
		};

		this.isValueChanged = function () {
			if (args.item.REF_FLAG == "raw") {
				return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);

			} else {
				return ($select.val() != defaultValue);

			}

		};

		this.validate = function () {
			return {
				valid: true,
				msg: null
			};
		};

		this.init();
	}
})(jQuery);