var LEVEL = 1;

document.getElementById("rolar").addEventListener("submit", event => {
  event.preventDefault();
  LEVEL = event.target.grau.value;
  main(
    event.target.quantidade_armas.value,
    event.target.quantidade_escudos.value,
    event.target.quantidade_armaduras.value,
    event.target.quantidade_reliquias.value,
    event.target.quantidade_pocoes.value
  );
});

function renderPocao(nome,imagem,detalhe,maldicao,nivel,gold) {
  let divExterna =  document.createElement("div");
  divExterna.className = 'arma';

  let divImagem =  document.createElement("div");
  divImagem.className = 'background-imagem';
  let spanImg = document.createElement("span");
  spanImg.className = 'img';
  spanImg.style.backgroundImage = "url('img/" + imagem + "')";
  divImagem.appendChild(spanImg);

  divExterna.appendChild(divImagem);

  let divTexto =  document.createElement("div");
  divTexto.className = 'texto';

  let spanNome =  document.createElement("span");
  spanNome.className = 'nome';
  spanNome.innerText = nome;
  divTexto.appendChild(spanNome);

  divTexto.appendChild(renderAtributo('Nível:'));
  divTexto.appendChild(renderValor(nivel));
  divTexto.appendChild(renderQuebraLinha());

  divTexto.appendChild(renderAtributo('Detalhe:'));
  divTexto.appendChild(renderValor(detalhe));
  divTexto.appendChild(renderQuebraLinha());

  if (maldicao != '') {
    divTexto.appendChild(renderAtributo('Maldição:'));
    divTexto.appendChild(renderValor(maldicao));
    divTexto.appendChild(renderQuebraLinha());
  }

  divTexto.appendChild(renderAtributo('Preço:'));
  divTexto.appendChild(renderValor(' ' + gold + ' golds'));
  divExterna.appendChild(divTexto);
  document.getElementById('pocoes').appendChild(divExterna);
}

function renderReliquia(nome,imagem,nivel,detalhe,gold) {
  let divExterna =  document.createElement("div");
  divExterna.className = 'arma';

  let divImagem =  document.createElement("div");
  divImagem.className = 'background-imagem';
  let spanImg = document.createElement("span");
  spanImg.className = 'img';
  spanImg.style.backgroundImage = "url('img/" + imagem + "')";
  divImagem.appendChild(spanImg);

  divExterna.appendChild(divImagem);

  let divTexto =  document.createElement("div");
  divTexto.className = 'texto';

  let spanNome =  document.createElement("span");
  spanNome.className = 'nome';
  spanNome.innerText = nome;
  divTexto.appendChild(spanNome);

  divTexto.appendChild(renderAtributo('Nível:'));
  divTexto.appendChild(renderValor(nivel));
  divTexto.appendChild(renderQuebraLinha());

  divTexto.appendChild(renderAtributo('Detalhe:'));
  divTexto.appendChild(renderValor(detalhe));
  divTexto.appendChild(renderQuebraLinha());

  divTexto.appendChild(renderAtributo('Preço:'));
  divTexto.appendChild(renderValor(' ' + gold + ' golds'));
  divExterna.appendChild(divTexto);
  document.getElementById('reliquias').appendChild(divExterna);
}

function renderArmadura(nome,imagem,tipo,notas,gold) {
  let divExterna =  document.createElement("div");
  divExterna.className = 'arma';

  let divImagem =  document.createElement("div");
  divImagem.className = 'background-imagem';
  let spanImg = document.createElement("span");
  spanImg.className = 'img';
  spanImg.style.backgroundImage = "url('img/" + imagem + "')";
  divImagem.appendChild(spanImg);

  divExterna.appendChild(divImagem);

  let divTexto =  document.createElement("div");
  divTexto.className = 'texto';

  let spanNome =  document.createElement("span");
  spanNome.className = 'nome';
  spanNome.innerText = nome;
  divTexto.appendChild(spanNome);

  if (tipo == 'armadura_leve') {
    divTexto.appendChild(renderAtributo('Tipo:'));
    divTexto.appendChild(renderValor('Armadura Leve'));
    divTexto.appendChild(renderQuebraLinha());
    divTexto.appendChild(renderAtributo('Detalhe:'));
    divTexto.appendChild(renderValor('+1 Armadura. Aumenta 1 custo por nível de esforço em Velocidade'));
  } else if (tipo == 'armadura_média') {
    divTexto.appendChild(renderAtributo('Tipo:'));
    divTexto.appendChild(renderValor('Armadura Média'));
    divTexto.appendChild(renderQuebraLinha());
    divTexto.appendChild(renderAtributo('Detalhe:'));
    divTexto.appendChild(renderValor('+2 Armadura. Aumenta 2 custos por nível de esforço em Velocidade'));
  } else if (tipo == 'armadura_pesada') {
    divTexto.appendChild(renderAtributo('Tipo:'));
    divTexto.appendChild(renderValor('Armadura Pesada'));
    divTexto.appendChild(renderQuebraLinha());
    divTexto.appendChild(renderAtributo('Detalhe:'));
    divTexto.appendChild(renderValor('+3 Armadura. Aumenta 3 custos por nível de esforço em Velocidade'));
  }
  divTexto.appendChild(renderQuebraLinha());

  if (notas.length > 0) {
    divTexto.appendChild(renderAtributo('Extras:'));
    divTexto.appendChild(renderQuebraLinha());

    notas.forEach((nota, index) => {
      divTexto.appendChild(renderNota(nota));

      if (index == (notas.length - 1)) {
        divTexto.appendChild(renderAtributo('Preço:'));
        divTexto.appendChild(renderValor(' ' + gold + ' golds'));
        divExterna.appendChild(divTexto);
        document.getElementById('armaduras').appendChild(divExterna);
      }
    });

  } else {
    divTexto.appendChild(renderAtributo('Preço:'));
    divTexto.appendChild(renderValor(' ' + gold + ' golds'));
    divExterna.appendChild(divTexto);
    document.getElementById('armaduras').appendChild(divExterna);
  }
}

function renderEscudo(nome,imagem,tipo,notas,gold) {
  let divExterna =  document.createElement("div");
  divExterna.className = 'arma';

  let divImagem =  document.createElement("div");
  divImagem.className = 'background-imagem';
  let spanImg = document.createElement("span");
  spanImg.className = 'img';
  spanImg.style.backgroundImage = "url('img/" + imagem + "')";
  divImagem.appendChild(spanImg);

  divExterna.appendChild(divImagem);

  let divTexto =  document.createElement("div");
  divTexto.className = 'texto';

  let spanNome =  document.createElement("span");
  spanNome.className = 'nome';
  spanNome.innerText = nome;
  divTexto.appendChild(spanNome);

  divTexto.appendChild(renderAtributo('Detalhe:'));
  divTexto.appendChild(renderValor('Reduz a dificuldade em 1 passo para esquiva com Velocidade'));
  divTexto.appendChild(renderQuebraLinha());

  if (notas.length > 0) {
    divTexto.appendChild(renderAtributo('Extras:'));
    divTexto.appendChild(renderQuebraLinha());

    notas.forEach((nota, index) => {
      divTexto.appendChild(renderNota(nota));

      if (index == (notas.length - 1)) {
        divTexto.appendChild(renderAtributo('Preço:'));
        divTexto.appendChild(renderValor(' ' + gold + ' golds'));
        divExterna.appendChild(divTexto);
        document.getElementById('escudos').appendChild(divExterna);
      }
    });

  } else {
    divTexto.appendChild(renderAtributo('Preço:'));
    divTexto.appendChild(renderValor(' ' + gold + ' golds'));
    divExterna.appendChild(divTexto);
    document.getElementById('escudos').appendChild(divExterna);
  }
}

function renderArma(nome,imagem,tipo,alcance,notas,gold) {
  let divExterna =  document.createElement("div");
  divExterna.className = 'arma';

  let divImagem =  document.createElement("div");
  divImagem.className = 'background-imagem';
  let spanImg = document.createElement("span");
  spanImg.className = 'img';
  spanImg.style.backgroundImage = "url('img/" + imagem + "')";
  divImagem.appendChild(spanImg);

  divExterna.appendChild(divImagem);

  let divTexto =  document.createElement("div");
  divTexto.className = 'texto';

  let spanNome =  document.createElement("span");
  spanNome.className = 'nome';
  spanNome.innerText = nome;
  divTexto.appendChild(spanNome);

  divTexto.appendChild(renderAtributo('Tipo:'));
  if (tipo == 'leve') {
    divTexto.appendChild(renderTipoLeve());
    divTexto.appendChild(renderQuebraLinha());
    divTexto.appendChild(renderAtributo('Dano:'));
    divTexto.appendChild(renderValor('2'));
  }
  if (tipo == 'médio') {
    divTexto.appendChild(renderTipoMedio());
    divTexto.appendChild(renderQuebraLinha());
    divTexto.appendChild(renderAtributo('Dano:'));
    divTexto.appendChild(renderValor('4'));
  }
  if (tipo == 'pesado') {
    divTexto.appendChild(renderTipoPesado());
    divTexto.appendChild(renderQuebraLinha());
    divTexto.appendChild(renderAtributo('Dano:'));
    divTexto.appendChild(renderValor('6'));
  }
  divTexto.appendChild(renderQuebraLinha());

  divTexto.appendChild(renderAtributo('Alcance:'));
  divTexto.appendChild(renderValor(' ' + alcance));
  divTexto.appendChild(renderQuebraLinha());

  if (notas.length > 0) {
    divTexto.appendChild(renderAtributo('Extras:'));
    divTexto.appendChild(renderQuebraLinha());

    notas.forEach((nota, index) => {
      divTexto.appendChild(renderNota(nota));

      if (index == (notas.length - 1)) {
        divTexto.appendChild(renderAtributo('Preço:'));
        divTexto.appendChild(renderValor(' ' + gold + ' golds'));
        divExterna.appendChild(divTexto);
        document.getElementById('armas').appendChild(divExterna);
      }
    });

  } else {
    divTexto.appendChild(renderAtributo('Preço:'));
    divTexto.appendChild(renderValor(' ' + gold + ' golds'));
    divExterna.appendChild(divTexto);
    document.getElementById('armas').appendChild(divExterna);
  }
}

function renderNota(nota) {
  let spanNota = document.createElement("span");
  spanNota.className = 'notas';
  spanNota.innerText = '♣️ ' + nota;
  return spanNota;
}
function renderAtributo(atributo) {
  let span =  document.createElement("span");
  span.className = 'atributo';
  span.innerText = atributo;
  return span;
}
function renderTipoLeve() {
  let span =  document.createElement("span");
  span.className = 'valor';
  span.innerText = ' Leve (ataque reduzido em 1 passo)';
  return span;
}
function renderTipoMedio() {
  let span =  document.createElement("span");
  span.className = 'valor';
  span.innerText = ' Médio';
  return span;
}
function renderTipoPesado() {
  let span =  document.createElement("span");
  span.className = 'valor';
  span.innerText = ' Pesado';
  return span;
}
function renderValor(valor) {
  let span =  document.createElement("span");
  span.className = 'valor';
  span.innerText = ' ' + valor;
  return span;
}
function renderQuebraLinha() {
  let br =  document.createElement("br");
  return br;
}

function main(quantidade_armas,quantidade_escudos,quantidade_armaduras,quantidade_reliquias,quantidade_pocoes) {
  document.getElementById("armas").innerHTML = '';
  document.getElementById("escudos").innerHTML = '';
  document.getElementById("armaduras").innerHTML = '';
  document.getElementById("reliquias").innerHTML = '';
  document.getElementById("pocoes").innerHTML = '';

  sortearItens(quantidade_armas,sortearArma,() => {
    sortearItens(quantidade_escudos,sortearEscudo,() => {
      sortearItens(quantidade_armaduras,sortearArmadura,() => {
        sortearItens(quantidade_reliquias,sortearReliquia,() => {
          sortearItens(quantidade_pocoes,sortearPocao,() => {
            console.log('Itens sorteados!');
          });
        });
      });
    });
  });
}

main(1,1,1,1,1);
