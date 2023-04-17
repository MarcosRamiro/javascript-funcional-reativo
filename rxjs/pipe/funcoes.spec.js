const { from, of } = require("rxjs");

const { terminadoCom, primeiro, ultimo } = require("./funcoes");

const { expect, describe } = require("@jest/globals");

describe("Teste do filtro terminadoCom", () => {
  const fixtureArray = [
    [["dados1.txt", "dados2.txt", "dados3.md"], ".txt", 2],
    [["dados1.txt", "dados2.txt", "dados3.md"], ".Xpto", 0],
  ];
  const fixtureString = [
    ["dados1.txt", ".txt", 1],
    ["dados1.txt", ".Xpto", 0],
  ];

  test.each(fixtureArray)(
    "teste se pipe está filtrando corretamente quando é um array",
    (array, padrao, expected) => {
      let elementosEncontrados = 0;
      from(array)
        .pipe(terminadoCom(padrao))
        .subscribe((nome) => {
          elementosEncontrados++;
          expect(nome).toMatch(padrao);
        });

      expect(elementosEncontrados).toBe(expected);
    }
  );

  test.each(fixtureString)(
    "teste se pipe está filtrando corretamente quando é um array",
    (texto, padrao, expected) => {
      let elementosEncontrados = 0;

      of(texto)
        .pipe(terminadoCom(padrao))
        .subscribe((_) => {
          elementosEncontrados++;
        });

      expect(elementosEncontrados).toBe(expected);
    }
  );
});

describe("Teste do operador primeiro", () => {
  test("teste se pipe está retornando apenas o primeiro elemento", () => {
    let primeiroElemento = "dados1.txt";
    let elementoRetornado = "";
    let elementosEncontrados = 0;

    from([primeiroElemento, "dados2.txt", "dados3.md"])
      .pipe(primeiro())
      .subscribe((nome) => {
        elementosEncontrados++;
        elementoRetornado = nome;
      });
    expect(elementoRetornado).toBe(primeiroElemento);
    expect(elementosEncontrados).toBe(1);
  });
});

describe("Teste do operador ultimo", () => {
  test("teste se pipe está retornando apenas o ultimo elemento", () => {
    let ultimoElemento = "dados3.md";
    let elementoRetornado = "";
    let elementosEncontrados = 0;

    from(["dados1.txt", "dados2.txt", ultimoElemento])
      .pipe(ultimo())
      .subscribe((nome) => {
        elementosEncontrados++;
        elementoRetornado = nome;
      });
    expect(elementoRetornado).toBe(ultimoElemento);
    expect(elementosEncontrados).toBe(1);
  });
});
