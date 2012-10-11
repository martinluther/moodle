// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * JavaScript required by the multianswer question type.
 *
 * @package    qtype
 * @subpackage multianswer
 * @copyright  2011 The Open University
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */


M.qtype_multianswer = M.qtype_multianswer || {};


M.qtype_multianswer.init = function (Y, questiondiv) {
    Y.one(questiondiv).all('label.subq').each(function(subqspan, i) {
        var feedbackspan = subqspan.next('label.subq, .feedbackspan');
        if (!feedbackspan) {
            return;
        }
        if (!feedbackspan.hasClass('feedbackspan')) {
            return;
        }
        var subqfor = subqspan.get('for').replace(':','\\:');
        var subqanswer = subqspan.next('#'+subqfor);

        var feedbacktext = feedbackspan.get('text');
        var match = feedbacktext.match(/(\d+.\d+).*(\d+.\d+)/);
        if (match && match[1]!==match[2]) {
            subqanswer.addClass('qtype_multianswer_incorrect_feedback');
        }

        var overlay = new Y.Overlay({
            srcNode: feedbackspan,
            visible: false,
            align: {
                node: subqanswer,
                points: [Y.WidgetPositionAlign.TC, Y.WidgetPositionAlign.BC]
            }
        });
        overlay.render();

        Y.on('mouseover', function() { overlay.show(); }, subqanswer);
        Y.on('mouseout', function() { overlay.hide(); }, subqanswer);

        feedbackspan.removeClass('accesshide');
    });
};
