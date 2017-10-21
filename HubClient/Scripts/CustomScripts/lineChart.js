function CreateLineChart(ControlId, DeviceNameSet, ColorIdSet, XLabelSet, DataSetCollection) {

    // Функция подготовки цветового шаблона линии
    function getLineDatasetCanvas(_datalabel, _colorstyle, _datavalue) {
        var _dataset = {
            label: _datalabel,
            borderColor: _BorderColor[_colorstyle-1],
            backgroundColor: _BackgroundColor[_colorstyle-1],
            borderWidth: _BorderWidth,
            fill: _Fill,
            pointBorderColor: _PointBorderColor,
            pointBackgroundColor: _BorderColor[_colorstyle - 1],
            pointRadius: _PointRadius,
            pointHitRadius: _PointHitRadius,
            pointHoverBorderColor: _PointBorderColor,
            pointHoverBackgroundColor: _BorderColor[_colorstyle - 1],
            pointHoverRadius: _PointHoverRadius,
            pointHoverBorderWidth: _PointHoverBorderWidth,
            showLine: _ShowLine,
            spanGaps: _SpanGaps,
            data: _datavalue
        };
        return _dataset;
    }

    function getLineGraphic() {
        var data = {
            labels: XLabelSet,
            datasets: []
        };
        for (i = 0; i < DeviceNameSet.length; i++) {
            data.datasets[i] = getLineDatasetCanvas(DeviceNameSet[i], ColorIdSet[i], DataSetCollection[i]);
        };
        return data;
    }

    var ctx = document.getElementById(ControlId);
    var LineChart = new Chart(ctx, { type: 'line', data: getLineGraphic(), options: _maxoptions });

    return LineChart;
}

function AddPointToLine(_device, _label, _value, _condition) {
    switch (_device) {
        case "01": _device = "ЭК 'Ветер'"; $('#energy01').val(_value).trigger('change'); break;
        case "02": _device = "ЭК 'Солнце'"; $('#energy02').val(_value).trigger('change'); break;
        case "03": _device = "ЭК 'Волна'"; $('#energy03').val(_value).trigger('change'); break;
    }
    
    var _exists = false;
    for (i = 0; i < EnergyLineChart.data.datasets.length; i++) {
        if (EnergyLineChart.data.datasets[i].label == _device) _exists = true;
    }

    if (_exists) {
        EnergyLineChart.data.labels.push(_label);
        if (_condition) EnergyLineChart.data.labels.splice(0, 1);     // проверяем условие добавления данных (следует ли при этом удалять начальные значения)
        for (i = 0; i < EnergyLineChart.data.datasets.length; i++) {
            if (EnergyLineChart.data.datasets[i].label == _device) {
                EnergyLineChart.data.datasets[i].data.push(_value);
            } else {
                var _length = EnergyLineChart.data.datasets[i].data.length;
                var _lastvalue = EnergyLineChart.data.datasets[i].data[_length - 1];
                EnergyLineChart.data.datasets[i].data.push(_lastvalue);
            };
            if (_condition) EnergyLineChart.data.datasets[i].data.splice(0, 1);
        }
    }

    EnergyLineChart.update();
}