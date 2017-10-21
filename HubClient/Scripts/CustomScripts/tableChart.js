// A simple templating method for replacing placeholders enclosed in curly braces.
if (!String.prototype.supplant) {
    String.prototype.supplant = function (o) {
        return this.replace(/{([^{}]*)}/g,
            function (a, b) {
                var r = o[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            }
        );
    };
}

var liveConnection = testHub, // the generated client-side hub proxy
    rises = '▲',
    falls = '▼',
    alarm = '!!',
    UpDown = '',
    $stockTable = $('#energyStockTable'),
    $stockTableBody = $stockTable.find('tbody'),
    rowTemplate = '<tr data-symbol="{DeviceID}">' +
        '<td>{DeviceID}</td>' +
        '<td>{DeviceName}</td>' +
        '<td>{DeviceSensorType}</td>' +
        '<td>{MgrUnit}</td>' +
        '<td>{UpDown}</td>' +
        '<td>{ReadoutStamp}</td>' +
        '<td>{DatatimeStamp}</td>' +
        '<td>{DeviationPrc}</td>' +
        '</tr>';

    function formatStock(stock) {
        return $.extend(stock, {
            ReadoutStamp: stock.ReadoutStamp.toFixed(4),
            DeviationAbs: stock.DeviationAbs.toFixed(4),
            DeviationPrc: (stock.DeviationPrc * 100).toFixed(4) + '%',
            UpDown: stock.DeviationAbs === 0 ? '' : stock.DeviationAbs >= 0 ? rises : falls
        });
    }

    function init() {
        liveConnection.server.getAllDevicesOnDemand().done(function (stocks) {
            $stockTableBody.empty();
            $.each(stocks, function () {
                var stock = formatStock(this);
                $stockTableBody.append(rowTemplate.supplant(stock));
            });
        });
    }

    // Add a client-side hub method that the server will call
    liveConnection.client.updateDeviceDataOnClient = function (stock) {
        var displayStock = formatStock(stock),
            $row = $(rowTemplate.supplant(displayStock));

        $stockTableBody.find('tr[data-symbol=' + stock.DeviceID + ']').replaceWith($row);

        AddPointToLine(stock.DeviceID, stock.DatatimeStamp, stock.ReadoutStamp, true);
        AddPointToBar(stock.DeviceID, stock.ReadoutStamp);
/*        AddPointToHorizontalBar(stock.DeviceID, stock.ReadoutStamp);
        AddPointToRadar(stock.DeviceID, stock.DatatimeStamp, stock.ReadoutStamp, true);
        AddPointToPie(stock.DeviceID, stock.ReadoutStamp);
        AddPointToDoughnut(stock.DeviceID, stock.ReadoutStamp);
 */   };
