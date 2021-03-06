rgb = require('../../image').rgb;

module.exports = {

	setFeedbacks: function(i) {

		var feedbacks = {
			playhead_bg: {
				label: 'Playhead Color for Background',
				description: 'Use the QLab color for the Playhead (next) cue as background',
				callback: function(feedback, bank) {
					var nc = i.wsCues[i.nextCue] ? i.wsCues[i.nextCue].qColor : 0;
					return { bgcolor: nc };
				}
			},
			run_bg: {
				label: 'Running Que color for Background',
				description: 'Use the QLab color of the running cue as background',
				callback: function(feedback, bank) {
					return { bgcolor: i.runningCue.qColor };
				}
			},
			q_bg: {
				label: 'Cue Number color for background',
				description: 'Use the QLab color of the specified cue number as background',
				options: [{
					type: 'textinput',
					label: 'Cue Number',
					id: 'cue',
					default: ""
				}],
				callback: function(feedback, bank) {
					return { bgcolor: i.cueColors[ (feedback.options.cue).replace(/[^\w\.]/gi,'_') ] };
				}
			},
			ws_mode: {
				label: 'Color for Workspace Mode',
				description: 'Set Button colors for Show/Edit/Audition Mode',
				options: [{
					type: 'colorpicker',
					label: 'Foreground color',
					id: 'fg',
					default: '16777215'
				},
				{
					type: 'colorpicker',
					label: 'Background color',
					id: 'bg',
					default: rgb(0, 128, 0)
				},
				{
					type: 'dropdown',
					label: 'Which Mode?',
					id: 'showMode',
					default: '1',
					choices: [
						{ id: '0', label: 'Edit' },
						{ id: '1', label: 'Show' },
						{ id: '2', label: 'Audition'}
					]
				}],
				callback: function(feedback, bank) {
					var ret = {};
					var options = feedback.options;

					if (i.auditMode && (options.showMode == '2')) {
						ret = { color: options.fg, bgcolor: options.bg };
					} else if (i.showMode && (options.showMode == '1')) {
						ret = { color: options.fg, bgcolor: options.bg };
					} else if (!i.showMode && (options.showMode == '0')) {
						ret = { color: options.fg, bgcolor: options.bg };
					}
					return ret;
				}
			},
		};
		return(feedbacks);
	}
};
