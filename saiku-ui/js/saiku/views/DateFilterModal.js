/*  
 *   Copyright 2012 OSBI Ltd
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

/**
 * Dialog for date filter
 */
var DateFilterModal = Modal.extend({
	type: 'date-filter',

	buttons: [
		{ text: 'Save', method: 'save' },
		{ text: 'Cancel', method: 'close' }
	],

	events: {
		'click a': 'call',
		'focus #selection-date'  : 'selection_date',
		'click .selection-radio' : 'disable_divselections'
	},

	template_mdx: 'CurrentDateMember([{dimension}].[{hierarchy}], \"[{hierarchy2}]\\\.{AnalyzerDateFormat}\", EXACT)',

	template_selection: _.template(
		'<div class="box-selections">' +
			'<div class="selection-option">' +
				'<input type="radio" class="selection-radio" name="selection-radio" id="selection-radio-operator">' +
			'</div>' +
			'<div class="available-selections" available="false">' +
				'<span class="i18n">Operator:</span><br>' +
				'<div class="selection-options">' +
					'<div class="form-group-selection">' +
						'<label><input type="radio" id="operator-equals"> Equals</label>' +
					'</div>' +
					'<div class="form-group-selection">' +
						'<label><input type="radio" id="operator-after"> After</label>' +
					'</div>' +
					'<div class="form-group-selection">' +
						'<label><input type="radio" id="operator-before"> Before</label>' +
					'</div>' +
					'<div class="form-group-selection">' +
						'<label><input type="radio" id="operator-between"> Between</label><br>' +
					'</div>' +
					'<div class="form-group-selection">' +
						'<label><input type="radio" id="operator-different"> Different</label>' +
					'</div>' +
					'<div class="form-group-selection">' +
						'<label><input type="radio" id="operator-after-equals"> After&Equals</label>' +
					'</div>' +
					'<div class="form-group-selection">' +
						'<label><input type="radio" id="operator-before-equals"> Before&Equals</label>' +
					'</div>' +
					'<div class="form-group-selection">' +
						'<label><input type="radio" id="operator-notbetween"> Not Between</label><br>' +
					'</div>' +
					'<div class="inline-form-group">' +
						'<div class="form-group">' +
							'<label>Select a date:</label>' +
							'<input type="text" id="selection-date" placeholder="Choose a date">' +
						'</div>' +
						'<div class="form-group">' +
							'<fieldset id="selected-date">' +
								'<legend>Selected date:</legend>' +
							'</fieldset>' +
						'</div>' +
					'</div>' +
					// '<div class="form-group">' +
					// 	'<label>Select a start date:</label>' +
					// 	'<input type="text" placeholder="Choose a date">' +
					// '</div>' +
					// '<div class="form-group">' +
					// 	'<label>Select an end date:</label>' +
					// 	'<input type="text" placeholder="Choose a date">' +
					// '</div>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="box-selections">' +
			'<div class="selection-option">' +
				'<input type="radio" class="selection-radio" name="selection-radio" id="selection-radio-fixed-date">' +
			'</div>' +			
			'<div class="available-selections" available="false">' +
				'<span class="i18n">Fixed Date:</span><br>' +
				'<div class="selection-options">' +
					'<label><input type="radio" name="fixed-radio" id="fd-today" date-format="">Today</label>' +
					'<label><input type="radio" name="fixed-radio" id="fd-yesterday" date-format="">Yesterday</label>' +
					'<label><input type="radio" name="fixed-radio" id="fd-current-week" date-format="">Current Week</label>' +
					'<label><input type="radio" name="fixed-radio" id="fd-current-month" value="[yyyy]\\.[Qq]\\.[m]" date-format="[yyyy].[Qq].[m]">Current Month</label><br>' +
					'<label><input type="radio" name="fixed-radio" id="fd-current-year" value="[yyyy]" date-format="[yyyy]">Current Year</label>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="box-selections">' +
			'<div class="selection-option">' +
				'<input type="radio" class="selection-radio" name="selection-radio" id="selection-radio-available">' +
			'</div>' +
			'<div class="available-selections" available="false">' +
				'<span class="i18n">Rolling Date:</span><br>' +
				'<div class="selection-options">' +
					'<div class="form-group-selection">' +
						'<select id="">' +
							'<option value="last">Last</option>' +
							'<option value="next">Next</option>' +
						'</select>' +
					'</div>' +
					'<div class="form-group-selection">' +
						'<select id="">' +
							'<option value="days">Day(s)</option>' +
							'<option value="weeks">Week(s)</option>' +
							'<option value="months">Month(s)</option>' +
							'<option value="years">Year(s)</option>' +
						'</select>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>'
		// '<div class="box-selections">' +
		// 	'<div class="available-selections">' +
		// 		'<span class="i18n">Available member:</span><br>' +
		// 		'<div class="selection-options"></div>' +
		// 	'</div>' +
		// '</div>' +
		// '<div class="box-selections">' +
		// 	'<div class="selection_buttons">' +
	 //            '<a class="form_button">&nbsp;&gt;&nbsp;</a><br><br>' +
	 //            '<a class="form_button">&gt;&gt;</a><br><br>' +
	 //            '<a class="form_button">&lt;&lt;</a><br><br>' +
	 //            '<a class="form_button">&nbsp;&lt;&nbsp;</a>' +
	 //        '</div>' +
  //       '</div>' +
		// '<div class="box-selections">' +
		// 	'<div class="available-selections">' +
		// 		'<span class="i18n">Used members:</span><br>' +
		// 		'<div class="selection-options"></div>' +
		// 	'</div>' +
		// '</div>'
	),

	initialize: function(args) {
		// Initialize properties
		_.extend(this, args);
		this.options.title = 'Selections for Year';
		this.message = 'Loading...';
		this.query = args.workspace.query;

		// _.bind(this);

		// Resize when rendered
		this.bind('open', this.post_render);
		this.render();
        
        this.$el.parent().find('.ui-dialog-titlebar-close').bind('click', this.finished);

        // Fetch available members
        this.member = new Member({}, {
            cube: this.workspace.selected_cube,
            dimension: this.key
        });

		// Load template
        this.$el.find('.dialog_body')
        	.html(this.template_selection);

        this.$el.find('.available-selections *').prop('disabled', true).off('click');
	},

    post_render: function(args) {
        var left = ($(window).width() - 600) / 2,
        	width = $(window).width() < 600 ? $(window).width() : 600;
        $(args.modal.el).parents('.ui-dialog')
            .css({ width: width, left: 'inherit', margin: '0', height: 490 })
            .offset({ left: left});
    },

    selection_date: function(event) {
    	var $currentTarget = $(event.currentTarget);
    	$currentTarget.datepicker();
    },

    disable_divselections: function(event) {
    	var $currentTarget = $(event.currentTarget);
    	this.$el.find('.available-selections').attr('available', false);
    	this.$el.find('.available-selections *').prop('disabled', true).off('click');
    	$currentTarget.closest('.box-selections').find('.available-selections').attr('available', true);
    	$currentTarget.closest('.box-selections').find('.available-selections *')
    		.prop('disabled', false).on('click');
    },

    populate_mdx: function(logExp) {
    	return this.template_mdx = this.template_mdx.replace(/{(\w+)}/g, function(m, p) {
			return logExp[p];
		});
    },

    save: function(event) {
    	event.preventDefault();
        // Notify user that updates are in progress
        var $loading = $('<div>Saving...</div>');
        $(this.el).find('.dialog_body').children().hide();
        $(this.el).find('.dialog_body').prepend($loading);

		var self = this,
			mdx;

		this.$el.find('.available-selections').each(function(key, selection) {
			var analyzerDateFormat;

			if ($(selection).attr('available') === 'true') {
				$(selection).find('input:radio').each(function(key, radio) {
					if ($(radio).is(":checked") === true) {
						analyzerDateFormat = $(radio).val();
					}
				});

				var logExp = {
					dimension: self.dimension,
					hierarchy: self.hierarchy,
					hierarchy2: 'Ti\\me',
					AnalyzerDateFormat: analyzerDateFormat
				};

				mdx = self.populate_mdx(logExp);
			}
		});

        var hName = decodeURIComponent(this.member.hierarchy),
        	lName = decodeURIComponent(this.member.level),
        	hierarchy = this.workspace.query.helper.getHierarchy(hName);

       	var updates = [];

       	updates.push({ mdx: mdx });

       	if (hierarchy && hierarchy.levels.hasOwnProperty(lName)) {
       		hierarchy.levels[lName] = { mdx: mdx, name: lName };
       	}

        this.finished();
    },

    finished: function() {
    	this.$el.dialog('destroy');
    	this.$el.remove();
    	this.query.run();
    }
});
