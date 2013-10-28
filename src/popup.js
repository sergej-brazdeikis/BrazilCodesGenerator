var sergejJevsejevBrazilCodeGenerator = {

    cepArray: [
        '78994-000',
        '78994-800',
        '78956-000',
        '13500-110',
        '78931-000',
        '78967-800',
        '13092-150',
        '78968-000',
        '13537-000',
        '78993-000',
        '78973-000',
        '78990-000',
        '13500-000',
        '20521-110',
        '20530-350',
        '20260-160',
        '20511-170',
        '13500-313',
        '20511-330',
        '13506-555',
        '20530-350'],

    randomize: function (n) {
        return Math.round(Math.random() * n);
    },

    generateCEP: function () {
        return this.cepArray[this.randomize(this.cepArray.length)];
    },

    generateCPF: function (withDots) {
        withDots = withDots || true;

        var n = [];
        for (i = 1; i <= 9; i++) {
            n[i] = this.randomize(9);
        }

        d1 = 0;
        for (i = 1; i <= 9; i++) {
            d1 += n[10 - i] * (i + 1);
        }
        d1 = 11 - (d1 % 11);
        if (d1 >= 10) d1 = 0;

        var d2 = d1 * 2;
        for (i = 3; i <= 11; i++) {
            d2 += n[12 - i] * i;
        }
        d2 = 11 - (d2 % 11);
        if (d2 >= 10) d2 = 0;

        if (withDots) cpf = '' + n[1] + n[2] + n[3] + '.' + n[4] + n[5] + n[6] + '.' + n[7] + n[8] + n[9] + '-' + d1 + d2;
        else cpf = '' + n[1] + n[2] + n[3] + n[4] + n[5] + n[6] + n[7] + n[8] + n[9] + d1 + d2;

        return cpf;
    }
};

var sergejJevsejevCodeGeneratorFormModel = {
    copyInputValue: function (el) {
        $(el).select();
        document.execCommand("Copy");
        return this;
    },
    setStatus: function (text) {
        $("#status")
            .html(text)
            .show();
        return this;
    }
};

$().ready(function () {

    var cepValue = $("#cepValue");
    var cpfValue = $("#cpfValue");

    cepValue.val(sergejJevsejevBrazilCodeGenerator.generateCEP());
    cpfValue.val(sergejJevsejevBrazilCodeGenerator.generateCPF());

    cepValue.click(function () {
        sergejJevsejevCodeGeneratorFormModel.copyInputValue(this)
            .setStatus('Copied CEP!');
    });

    cpfValue.click(function () {
        sergejJevsejevCodeGeneratorFormModel.copyInputValue(this)
            .setStatus('Copied CPF!');
    });

    $("#cep").click(function () {
        cepValue.val(sergejJevsejevBrazilCodeGenerator.generateCEP());
    });

    $("#cpf").click(function () {
        cpfValue.val(sergejJevsejevBrazilCodeGenerator.generateCPF());
    });
});