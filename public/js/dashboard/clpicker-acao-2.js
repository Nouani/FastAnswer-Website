$('.clockpicker').clockpicker({
    donetext: 'Pronto',
    twelvehour: false,
    autoclose: false,
    leadingZeroHours: true,
    upperCaseAmPm: true,
    leadingSpaceAmPm: true,
    afterHourSelect: function() {
       $('.clockpicker').clockpicker('realtimeDone');
    },
    afterMinuteSelect: function() {
       $('.clockpicker').clockpicker('realtimeDone');
    },
    afterAmPmSelect: function() {
       $('.clockpicker').clockpicker('realtimeDone');
    }
 });