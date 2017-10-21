﻿function CreateBarChart(ControlID, DeviceNameSet, ColorIdSet, InitialDataSet, IfVertical) {

    // Функция подготовки цветового шаблона линии
    function getBarGraphic() {
        var _data = {
            labels: [],
            datasets: [{
                label: '',
                fill: _Fill,
                backgroundColor: [],
                borderColor: [],
                borderWidth: _BorderWidth,
                data: []
            }]
        };
        for (i = 0; i < DeviceNameSet.length; i++) {
            _data.labels.push(DeviceNameSet[i]);
            _data.datasets[0].data.push(InitialDataSet[i]);
            _data.datasets[0].backgroundColor.push(_BackgroundColor[ColorIdSet[i]]);
            _data.datasets[0].borderColor.push(_BorderColor[ColorIdSet[i]]);
        };

        return _data;
    };

    var ctx = document.getElementById(ControlID);
    return new Chart(ctx, { type: (IfVertical) ? 'bar' : 'horizontalBar', data: getBarGraphic(), options: _maxoptions});
}

function AddPointToBar(_label, _value) {
    switch (_label)
    {
        case "01": _label = "ЭК 'Ветер'"; break;
        case "02": _label = "ЭК 'Солнце'"; break;
        case "03": _label = "ЭК 'Волна'"; break;
    }
    for (i = 0; i < EnergyBarChart.data.labels.length; i++) {
        if (EnergyBarChart.data.labels[i] === _label) {
            EnergyBarChart.data.datasets[0].data[i] = _value;
            EnergyBarChart.update();
        };
    };
}

function AddPointToHorizontalBar(_label, _value) {
    switch (_label) {
        case "01": _label = "ЭК 'Ветер'"; break;
        case "02": _label = "ЭК 'Солнце'"; break;
        case "03": _label = "ЭК 'Волна'"; break;
    }
    for (i = 0; i < HorizontalBarChart.data.labels.length; i++) {
        if (HorizontalBarChart.data.labels[i] === _label) {
            HorizontalBarChart.data.datasets[0].data[i] = _value;
            HorizontalBarChart.update();
        };
    };
}
