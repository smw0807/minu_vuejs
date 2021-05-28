(function ($) {
	// register namespace
	$.extend(true, window, {
		"Slick": {
			"CheckboxSelectColumn": CheckboxSelectColumn
		}
	});


	function CheckboxSelectColumn(options) {
		var _grid;
		var _self = this;
		var _handler = new Slick.EventHandler();
		var _selectedRowsLookup = {};
		var _defaults = {
			columnId: "_checkbox_selector",
			cssClass: null,
			toolTip: "클릭시 전체선택 또는 전체해제 됩니다.",
			width: 50
		};

		var _options = $.extend(true, {}, _defaults, options);

		function init(grid) {
			_grid = grid;
			_handler
					.subscribe(_grid.onSelectedRowsChanged, handleSelectedRowsChanged)
					.subscribe(_grid.onClick, handleClick)
					.subscribe(_grid.onHeaderClick, handleHeaderClick)
					.subscribe(_grid.onKeyDown, handleKeyDown);
		}

		function destroy() {
			_handler.unsubscribeAll();
		}

		function handleSelectedRowsChanged(e, args) {
			var selectedRows = _grid.getSelectedRows();
			var lookup = {}, row, i;
			for (i = 0; i < selectedRows.length; i++) {
				row = selectedRows[i];
				lookup[row] = true;
				if (lookup[row] !== _selectedRowsLookup[row]) {
					_grid.invalidateRow(row);
					delete _selectedRowsLookup[row];
				}
			}
			for (i in _selectedRowsLookup) {
				_grid.invalidateRow(i);
			}
			_selectedRowsLookup = lookup;
			_grid.render();
			var input = '<div class="checkbox3 checkbox-sm checkbox-inline checkbox-check checkbox-light"><input type="checkbox" id="all_check" style="width:40px;"><label for="all_check" style="padding-left:40px; margin-top:-3px; margin-left:-3px;"></label></div>';
			var input_checked = '<div class="checkbox3 checkbox-sm checkbox-inline checkbox-check checkbox-light"><input type="checkbox" id="all_check" style="width:40px;" checked="checked"><label for="all_check" style="padding-left:40px; margin-top:-3px; margin-left:-3px;"></label></div>';
			if (selectedRows.length && selectedRows.length == _grid.getDataLength()) {
				_grid.updateColumnHeader(_options.columnId, input_checked, _options.toolTip);
//				_grid.updateColumnHeader(_options.columnId, "<input type='checkbox' checked='checked'>", _options.toolTip);
			} else {
				_grid.updateColumnHeader(_options.columnId, input, _options.toolTip);
//				_grid.updateColumnHeader(_options.columnId, "<input type='checkbox'>", _options.toolTip);
			}
		}

		function handleKeyDown(e, args) {
			if (e.which == 32) {
				if (_grid.getColumns()[args.cell].id === _options.columnId) {
					// if editing, try to commit
					if (!_grid.getEditorLock().isActive() || _grid.getEditorLock().commitCurrentEdit()) {
						toggleRowSelection(args.row);
					}
					e.preventDefault();
					e.stopImmediatePropagation();
				}
			}
		}

		function handleClick(e, args) {
			// clicking on a row select checkbox
			if (_grid.getColumns()[args.cell].id === _options.columnId && $(e.target).is(":checkbox")) {
				// if editing, try to commit
				if (_grid.getEditorLock().isActive() && !_grid.getEditorLock().commitCurrentEdit()) {
					e.preventDefault();
					e.stopImmediatePropagation();
					return;
				}

				toggleRowSelection(args.row);
				e.stopPropagation();
				e.stopImmediatePropagation();
			}
		}

		function toggleRowSelection(row) {
			if (_selectedRowsLookup[row]) {
				_grid.setSelectedRows($.grep(_grid.getSelectedRows(), function (n) {
					return n != row
				}));
			} else {
				_grid.setSelectedRows(_grid.getSelectedRows().concat(row));
			}
		}

		function handleHeaderClick(e, args) {
			if (args.column.id == _options.columnId && $(e.target).is(":checkbox")) {
				// if editing, try to commit
				if (_grid.getEditorLock().isActive() && !_grid.getEditorLock().commitCurrentEdit()) {
					e.preventDefault();
					e.stopImmediatePropagation();
					return;
				}

				if ($(e.target).is(":checked")) {
					var rows = [];
					for (var i = 0; i < _grid.getDataLength(); i++) {
						rows.push(i);
					}
					_grid.setSelectedRows(rows);
				} else {
					_grid.setSelectedRows([]);
				}
				e.stopPropagation();
				e.stopImmediatePropagation();
			}
		}
		//위협경보에서 사용
		function getColumnDefinition() {
			return {
				id: _options.columnId,
				name: '<div class="checkbox3 checkbox-sm checkbox-inline checkbox-check checkbox-light"><input type="checkbox" id="all_check" style="width:40px;"><label for="all_check" style="padding-left:40px; margin-top:-3px; margin-left:-3px;"></label></div>',
//				name: '<div class="checkbox3 checkbox-sm checkbox-inline checkbox-check checkbox-light"><input type="checkbox" id="all_check" style="width:40px;"><label for="all_check" style="padding-left:40px; margin-top:-3px; margin-left:-3px;"></label></div>',
//				name: "<input type='checkbox' id='all_check'>",
				toolTip: _options.toolTip,
				field: "sel",
				width: _options.width,
				resizable: false,
				sortable: false,
				cssClass: _options.cssClass,
				formatter: checkboxSelectionFormatter
			};
		}
		//통보설정관리에서 사용
		function getColumnNoticeDefinition() {
			return {
				id: _options.columnId,
				name: '<div class="checkbox3 checkbox-sm checkbox-inline checkbox-check checkbox-light"><input type="checkbox" id="all_check" style="width:40px;"><label for="all_check" style="padding-left:40px; margin-top:-3px; margin-left:-3px;"></label></div>',
				toolTip: _options.toolTip,
				field: "sel",
				width: _options.width,
				resizable: false,
				sortable: false,
				cssClass: _options.cssClass,
				formatter: checkboxSelectionNoticeFormatter
			};
		}
		//통보설정관리에서 사용
		function getColumnNoticeReceiverDefinition() {
			return {
				id: _options.columnId,
				name: '<div class="checkbox3 checkbox-sm checkbox-inline checkbox-check checkbox-light"><input type="checkbox" id="all_check" style="width:40px;"><label for="all_check" style="padding-left:40px; margin-top:-3px; margin-left:-3px;"></label></div>',
				toolTip: _options.toolTip,
				field: "sel",
				width: _options.width,
				resizable: false,
				sortable: false,
				cssClass: _options.cssClass,
				formatter: checkboxSelectionNoticeReceiverFormatter
			};
		}
		//위협경보에서 사용
		function checkboxSelectionFormatter(row, cell, value, columnDef, dataContext) {
			if (dataContext) {
				return _selectedRowsLookup[row]
						? '<div class="checkbox3 checkbox-sm checkbox-inline checkbox-check checkbox-light"><input type="checkbox" id="' + row + '" class="thr_' + dataContext._id + '" value=' + dataContext._id + ' style="width:40px;" checked="checked"><label for="' + row + '" style="padding-left:29px;"></label></div>'
						: '<div class="checkbox3 checkbox-sm checkbox-inline checkbox-check checkbox-light"><input type="checkbox" id="' + row + '" class="thr_' + dataContext._id + '" value=' + dataContext._id + ' style="width:40px;"><label for="' + row + '" style="padding-left:29px;"></label></div>';
//						? "<input type='checkbox' id='" + row + "' class='thr_" + dataContext._id + "' checked='checked' value='" + dataContext._id + "'>"
//						: "<input type='checkbox' id='" + row + "' class='thr_" + dataContext._id + "' value='" + dataContext._id + "'>";
			}
			return null;
		}
		//통보설정관리에서 사용
		function checkboxSelectionNoticeFormatter(row, cell, value, columnDef, dataContext) {
			if (dataContext) {
				return _selectedRowsLookup[row]
						? '<div class="checkbox3 checkbox-sm checkbox-inline checkbox-check checkbox-light"><input type="checkbox" id="' + dataContext._id + '" class="check_User" value=' + dataContext._id + ' style="width:40px;" checked="checked"><label for="' + dataContext._id + '" style="padding-left:40px;"></label></div>'
						: '<div class="checkbox3 checkbox-sm checkbox-inline checkbox-check checkbox-light"><input type="checkbox" id="' + dataContext._id + '" class="check_User" value=' + dataContext._id + ' style="width:40px;"><label for="' + dataContext._id + '" style="padding-left:40px;"></label></div>';
			}
			
			return null;
		}
		//통보설정관리에서 사용
		function checkboxSelectionNoticeReceiverFormatter(row, cell, value, columnDef, dataContext) {
			if (dataContext) {
				return _selectedRowsLookup[row]
						? '<div class="checkbox3 checkbox-sm checkbox-inline checkbox-check checkbox-light"><input type="checkbox" id="' + dataContext._id + '" class="check_Receiver" value=' + dataContext._id + ' style="width:40px;" checked="checked"><label for="' + dataContext._id + '" style="padding-left:40px;"></label></div>'
						: '<div class="checkbox3 checkbox-sm checkbox-inline checkbox-check checkbox-light"><input type="checkbox" id="' + dataContext._id + '" class="check_Receiver" value=' + dataContext._id + ' style="width:40px;"><label for="' + dataContext._id + '" style="padding-left:40px;"></label></div>';
			}
			
			return null;
		}

		$.extend(this, {
			"init": init,
			"destroy": destroy,

			"getColumnDefinition": getColumnDefinition,
			"getColumnNoticeReceiverDefinition": getColumnNoticeReceiverDefinition,
			"getColumnNoticeDefinition": getColumnNoticeDefinition
		});
	}
})(jQuery);