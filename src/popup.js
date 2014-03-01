var sergejJevsejevBrazilCodeGenerator = {

  cepArray: [
    '13092-150',
    '13500-110',
    '13500-313',
    '13506-555',
    '13537-000',
    '20260-160',
    '20511-170',
    '20511-330',
    '20521-110',
    '20530-350',
    '76862-000',
    '76880-000',
    '76916-000',
    '76934-000',
    '76935-000',
    '76950-000',
    '76952-000',
    '76954-000'
  ],

  randomize: function (n) {
    return Math.round(Math.random() * n);
  },

  generateCEP: function () {
    return this.cepArray[this.randomize(this.cepArray.length)];
  },

  generateCPF: function (withDots) {
    var n = [], d1 = 0, d2;

    withDots = withDots || true;

    for (i = 1; i <= 9; i++) {
      n[i] = this.randomize(9);
    }

    for (i = 1; i <= 9; i++) {
      d1 += n[10 - i] * (i + 1);
    }
    d1 = 11 - (d1 % 11);
    if (d1 >= 10) d1 = 0;

    d2 = d1 * 2;
    for (i = 3; i <= 11; i++) {
      d2 += n[12 - i] * i;
    }
    d2 = 11 - (d2 % 11);
    if (d2 >= 10) d2 = 0;

    if (withDots) return '' + n[1] + n[2] + n[3] + '.' + n[4] + n[5] + n[6] + '.' + n[7] + n[8] + n[9] + '-' + d1 + d2;
    else return '' + n[1] + n[2] + n[3] + n[4] + n[5] + n[6] + n[7] + n[8] + n[9] + d1 + d2;
  },

  generateCNPJ: function (withMask) {
    withMask = withMask || true;
    var n = [], i, d1, d2;

    for (i = 1; i <= 12; i++) {
      n[i] = this.randomize(9);
    }

    d1 = 0;
    for(i = 1; i<=8; i++){
      d1 += n[13 - i] * (i + 1);
    }
    for(i = 9; i<=12; i++){
      d1 += n[13 - i] * (i - 7);
    }
    d1 = 11 - (d1 % 11);
    if (d1 >= 10) d1 = 0;

    d2 = d1 * 2;
    for(i = 3; i<=9; i++){
      d2 += n[15 - i] * i;
    }
    for(i = 2; i<=6; i++){
      d2 += n[7 - i] * i;
    }
    d2 = 11 - (d2 % 11);
    if (d2 >= 10) d2 = 0;

    if (withMask) {
      return '' + n[1] + n[2] + '.' + n[3] + n[4] + n[5] + '.' + n[6] + n[7] + n[8] + '/' + n[9] + n[10] + n[11] + n[12] + '-' + d1 + d2;
    } else {
      return '' + n[1] + n[2] + n[3] + n[4] + n[5] + n[6] + n[7] + n[8] + n[9] + n[10] + n[11] + n[12] + d1 + d2;
    }
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
  var cnpjValue = $("#cnpjValue");

  cepValue.val(sergejJevsejevBrazilCodeGenerator.generateCEP());
  cpfValue.val(sergejJevsejevBrazilCodeGenerator.generateCPF());
  cnpjValue.val(sergejJevsejevBrazilCodeGenerator.generateCNPJ());

  cepValue.click(function () {
    sergejJevsejevCodeGeneratorFormModel.copyInputValue(this)
      .setStatus('Copied CEP!');
  });

  cpfValue.click(function () {
    sergejJevsejevCodeGeneratorFormModel.copyInputValue(this)
      .setStatus('Copied CPF!');
  });

  cnpjValue.click(function () {
    sergejJevsejevCodeGeneratorFormModel.copyInputValue(this)
      .setStatus('Copied CNPJ!');
  });

  $("#cep").click(function () {
    cepValue.val(sergejJevsejevBrazilCodeGenerator.generateCEP());
  });

  $("#cpf").click(function () {
    cpfValue.val(sergejJevsejevBrazilCodeGenerator.generateCPF());
  });

  $("#cnpj").click(function () {
    cnpjValue.val(sergejJevsejevBrazilCodeGenerator.generateCNPJ());
  });
});