$('#testmessage1').text('connection to SignalR-hub: offline');
$.connection.hub.url = "http://energyhubplus.azurewebsites.net/signalr";
var infoHub = $.connection.InfoHub;
var testHub = $.connection.DevImHub;

    infoHub.client.showTime = function (dateTimeFromServer) {
        $('#dateTime').html(dateTimeFromServer);
        $('#testmessage2').html("Connection Hub Id = " + $.connection.hub.id
            + "</br>" + "Message Id = " + $.connection.hub.messageId);
    };

    infoHub.client.announcement = function (msg) {
        $('#testmessage1').html(msg);
    };

    $.connection.hub.start().done(function () {
        $('#testmessage1').text('connection to SignalR-hub: online');
        infoHub.server.serverTimer();
        testHub.server.getAllDevicesOnDemand().done(function (stocks)
        {
            $stockTableBody.empty();
            $.each(stocks, function ()
            {
                var stock = formatStock(this);
                $stockTableBody.append(rowTemplate.supplant(stock));
            });
        });

    });