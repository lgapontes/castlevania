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

const RENDER_ARMA = 'arma';
const RENDER_ESCUDO = 'escudo';
const RENDER_ARMADURA = 'armadura';
const RENDER_RELIQUIA = 'reliquia';
const RENDER_POCAO = 'pocao';

function render(json) {

  if (json.inventario == false) {
    if (document.getElementById('menu_rolagens').style.display == 'none') {
      return;
    }
  } else {
    if (document.getElementById('menu_inventario').style.display == 'none') {
      return;
    }
  }

  if (json.tipo_objeto == RENDER_POCAO) {
    renderPocao(json);
  } else if (json.tipo_objeto == RENDER_RELIQUIA) {
    renderReliquia(json);
  } else if (json.tipo_objeto == RENDER_ARMADURA) {
    renderArmadura(json);
  } else if (json.tipo_objeto == RENDER_ESCUDO) {
    renderEscudo(json);
  } else if (json.tipo_objeto == RENDER_ARMA) {
    renderArma(json);
  }
}

function renderPocao(json) {
  let dados = json.dados;

  let divExterna =  document.createElement("div");
  divExterna.className = 'arma';

  let divImagem =  document.createElement("div");
  divImagem.className = 'background-imagem';
  let spanImg = document.createElement("span");
  spanImg.className = 'img';
  spanImg.style.backgroundImage = "url('img/" + dados.imagem + "')";
  divImagem.appendChild(spanImg);

  divExterna.appendChild(divImagem);

  let divTexto =  document.createElement("div");
  divTexto.className = 'texto';

  let spanNome =  document.createElement("span");
  spanNome.className = 'nome';
  spanNome.innerText = dados.nome;
  divTexto.appendChild(spanNome);

  divTexto.appendChild(renderAtributo('Nível:'));
  divTexto.appendChild(renderValor(dados.nivel));
  divTexto.appendChild(renderQuebraLinha());

  divTexto.appendChild(renderAtributo('Detalhe:'));
  divTexto.appendChild(renderValor(dados.detalhe));
  divTexto.appendChild(renderQuebraLinha());

  if (dados.maldicao != '') {
    divTexto.appendChild(renderAtributo('Maldição:'));
    divTexto.appendChild(renderValor(dados.maldicao));
    divTexto.appendChild(renderQuebraLinha());
  }

  divTexto.appendChild(renderAtributo('Preço:'));
  divTexto.appendChild(renderValor(' ' + dados.gold + ' golds'));
  divExterna.appendChild(divTexto);

  renderBackpack('pocoes',divExterna,json);
}

function renderReliquia(json) {
  let dados = json.dados;

  let divExterna =  document.createElement("div");
  divExterna.className = 'arma';

  let divImagem =  document.createElement("div");
  divImagem.className = 'background-imagem';
  let spanImg = document.createElement("span");
  spanImg.className = 'img';
  spanImg.style.backgroundImage = "url('img/" + dados.imagem + "')";
  divImagem.appendChild(spanImg);

  divExterna.appendChild(divImagem);

  let divTexto =  document.createElement("div");
  divTexto.className = 'texto';

  let spanNome =  document.createElement("span");
  spanNome.className = 'nome';
  spanNome.innerText = dados.nome;
  divTexto.appendChild(spanNome);

  divTexto.appendChild(renderAtributo('Nível:'));
  divTexto.appendChild(renderValor(dados.nivel));
  divTexto.appendChild(renderQuebraLinha());

  divTexto.appendChild(renderAtributo('Detalhe:'));
  divTexto.appendChild(renderValor(dados.detalhe));
  divTexto.appendChild(renderQuebraLinha());

  divTexto.appendChild(renderAtributo('Preço:'));
  divTexto.appendChild(renderValor(' ' + dados.gold + ' golds'));
  divExterna.appendChild(divTexto);

  renderBackpack('reliquias',divExterna,json);
}

function renderArmadura(json) {
  let dados = json.dados;

  let divExterna =  document.createElement("div");
  divExterna.className = 'arma';

  let divImagem =  document.createElement("div");
  divImagem.className = 'background-imagem';
  let spanImg = document.createElement("span");
  spanImg.className = 'img';
  spanImg.style.backgroundImage = "url('img/" + dados.imagem + "')";
  divImagem.appendChild(spanImg);

  divExterna.appendChild(divImagem);

  let divTexto =  document.createElement("div");
  divTexto.className = 'texto';

  let spanNome =  document.createElement("span");
  spanNome.className = 'nome';
  spanNome.innerText = dados.nome;
  divTexto.appendChild(spanNome);

  if (dados.tipo == 'armadura_leve') {
    divTexto.appendChild(renderAtributo('Tipo:'));
    divTexto.appendChild(renderValor('Armadura Leve'));
    divTexto.appendChild(renderQuebraLinha());
    divTexto.appendChild(renderAtributo('Detalhe:'));
    divTexto.appendChild(renderValor('+1 Armadura. Aumenta 1 custo por nível de esforço em Velocidade'));
  } else if (dados.tipo == 'armadura_média') {
    divTexto.appendChild(renderAtributo('Tipo:'));
    divTexto.appendChild(renderValor('Armadura Média'));
    divTexto.appendChild(renderQuebraLinha());
    divTexto.appendChild(renderAtributo('Detalhe:'));
    divTexto.appendChild(renderValor('+2 Armadura. Aumenta 2 custos por nível de esforço em Velocidade'));
  } else if (dados.tipo == 'armadura_pesada') {
    divTexto.appendChild(renderAtributo('Tipo:'));
    divTexto.appendChild(renderValor('Armadura Pesada'));
    divTexto.appendChild(renderQuebraLinha());
    divTexto.appendChild(renderAtributo('Detalhe:'));
    divTexto.appendChild(renderValor('+3 Armadura. Aumenta 3 custos por nível de esforço em Velocidade'));
  }
  divTexto.appendChild(renderQuebraLinha());

  if (dados.notas.length > 0) {
    divTexto.appendChild(renderAtributo('Extras:'));
    divTexto.appendChild(renderQuebraLinha());

    dados.notas.forEach((nota, index) => {
      divTexto.appendChild(renderNota(nota));

      if (index == (dados.notas.length - 1)) {
        divTexto.appendChild(renderAtributo('Preço:'));
        divTexto.appendChild(renderValor(' ' + dados.gold + ' golds'));
        divExterna.appendChild(divTexto);

        renderBackpack('armaduras',divExterna,json);
      }
    });

  } else {
    divTexto.appendChild(renderAtributo('Preço:'));
    divTexto.appendChild(renderValor(' ' + dados.gold + ' golds'));
    divExterna.appendChild(divTexto);

    renderBackpack('armaduras',divExterna,json);
  }
}

function renderEscudo(json) {
  let dados = json.dados;

  let divExterna =  document.createElement("div");
  divExterna.className = 'arma';

  let divImagem =  document.createElement("div");
  divImagem.className = 'background-imagem';
  let spanImg = document.createElement("span");
  spanImg.className = 'img';
  spanImg.style.backgroundImage = "url('img/" + dados.imagem + "')";
  divImagem.appendChild(spanImg);

  divExterna.appendChild(divImagem);

  let divTexto =  document.createElement("div");
  divTexto.className = 'texto';

  let spanNome =  document.createElement("span");
  spanNome.className = 'nome';
  spanNome.innerText = dados.nome;
  divTexto.appendChild(spanNome);

  divTexto.appendChild(renderAtributo('Detalhe:'));
  divTexto.appendChild(renderValor('Reduz a dificuldade em 1 passo para esquiva com Velocidade'));
  divTexto.appendChild(renderQuebraLinha());

  if (dados.notas.length > 0) {
    divTexto.appendChild(renderAtributo('Extras:'));
    divTexto.appendChild(renderQuebraLinha());

    dados.notas.forEach((nota, index) => {
      divTexto.appendChild(renderNota(nota));

      if (index == (dados.notas.length - 1)) {
        divTexto.appendChild(renderAtributo('Preço:'));
        divTexto.appendChild(renderValor(' ' + dados.gold + ' golds'));
        divExterna.appendChild(divTexto);

        renderBackpack('escudos',divExterna,json);
      }
    });

  } else {
    divTexto.appendChild(renderAtributo('Preço:'));
    divTexto.appendChild(renderValor(' ' + dados.gold + ' golds'));
    divExterna.appendChild(divTexto);

    renderBackpack('escudos',divExterna,json);
  }
}

function renderArma(json) {
  let dados = json.dados;

  let divExterna =  document.createElement("div");
  divExterna.className = 'arma';

  let divImagem =  document.createElement("div");
  divImagem.className = 'background-imagem';
  let spanImg = document.createElement("span");
  spanImg.className = 'img';
  spanImg.style.backgroundImage = "url('img/" + dados.imagem + "')";
  divImagem.appendChild(spanImg);

  divExterna.appendChild(divImagem);

  let divTexto =  document.createElement("div");
  divTexto.className = 'texto';

  let spanNome =  document.createElement("span");
  spanNome.className = 'nome';
  spanNome.innerText = dados.nome;
  divTexto.appendChild(spanNome);

  divTexto.appendChild(renderAtributo('Tipo:'));
  if (dados.tipo == 'leve') {
    divTexto.appendChild(renderTipoLeve());
    divTexto.appendChild(renderQuebraLinha());
    divTexto.appendChild(renderAtributo('Dano:'));
    divTexto.appendChild(renderValor('2'));
  }
  if (dados.tipo == 'médio') {
    divTexto.appendChild(renderTipoMedio());
    divTexto.appendChild(renderQuebraLinha());
    divTexto.appendChild(renderAtributo('Dano:'));
    divTexto.appendChild(renderValor('4'));
  }
  if (dados.tipo == 'pesado') {
    divTexto.appendChild(renderTipoPesado());
    divTexto.appendChild(renderQuebraLinha());
    divTexto.appendChild(renderAtributo('Dano:'));
    divTexto.appendChild(renderValor('6'));
  }
  divTexto.appendChild(renderQuebraLinha());

  divTexto.appendChild(renderAtributo('Alcance:'));
  divTexto.appendChild(renderValor(' ' + dados.alcance));
  divTexto.appendChild(renderQuebraLinha());

  if (dados.notas.length > 0) {
    divTexto.appendChild(renderAtributo('Extras:'));
    divTexto.appendChild(renderQuebraLinha());

    dados.notas.forEach((nota, index) => {
      divTexto.appendChild(renderNota(nota));

      if (index == (dados.notas.length - 1)) {
        divTexto.appendChild(renderAtributo('Preço:'));
        divTexto.appendChild(renderValor(' ' + dados.gold + ' golds'));
        divExterna.appendChild(divTexto);

        renderBackpack('armas',divExterna,json);
      }
    });

  } else {
    divTexto.appendChild(renderAtributo('Preço:'));
    divTexto.appendChild(renderValor(' ' + dados.gold + ' golds'));
    divExterna.appendChild(divTexto);

    renderBackpack('armas',divExterna,json);
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
function renderBackpack(divName,divExterna,json) {
  if (json.inventario == false) {
    divExterna.appendChild(renderBackpackSalvar(divExterna,json));
    document.getElementById(divName).appendChild(divExterna);
  } else {
    divExterna.appendChild(renderBackpackRemover(divExterna,json));
    if (json.equipado == true) {
      divExterna.appendChild(renderBackpackHandRemove(divExterna,json));
      document.getElementById('itens_equipados').appendChild(divExterna);
    } else {
      divExterna.appendChild(renderBackpackHandAdd(divExterna,json));
      document.getElementById('itens_iventario').appendChild(divExterna);
    }
  }
}

function renderBackpackSalvar(divExterna,json) {
  let div =  document.createElement("div");
  div.className = 'backpack backpack-salvar';
  div.addEventListener('click',event => {
    event.preventDefault();
    json.inventario = true;
    BANCO.salvar(json,itens => {
      divExterna.remove();
    });
  });
  return div;
}

function renderBackpackRemover(divExterna,json) {
  let div =  document.createElement("div");
  div.className = 'backpack backpack-remover';
  div.addEventListener('click',event => {
    event.preventDefault();
    json.inventario = false;
    BANCO.remover(json,itens => {
      divExterna.remove();
    });
  });
  return div;
}

function renderBackpackHandAdd(divExterna,json) {
  let div =  document.createElement("div");
  div.className = 'backpack hand-add';
  div.addEventListener('click',event => {
    event.preventDefault();
    json.equipado = true;
    BANCO.salvar(json,itens => {
      inventario();
    });
  });
  return div;
}

function renderBackpackHandRemove(divExterna,json) {
  let div =  document.createElement("div");
  div.className = 'backpack hand-remove';
  div.addEventListener('click',event => {
    event.preventDefault();
    json.equipado = false;
    BANCO.salvar(json,itens => {
      inventario();
    });
  });
  return div;
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

function inventario() {
  BANCO.carregar(json => {
    document.getElementById('itens_equipados').innerHTML = '';
    document.getElementById('itens_iventario').innerHTML = '';
    json.itens.forEach((item, index) => {
      render(item);
    });
  });
}

document.getElementById('botao_menu_inventario').addEventListener('click',event => {
  event.preventDefault();
  document.getElementById('menu_inventario').style.display = 'block';
  document.getElementById('menu_rolagens').style.display = 'none';
  inventario();
});
document.getElementById('botao_menu_rolagens').addEventListener('click',event => {
  event.preventDefault();
  document.getElementById('menu_inventario').style.display = 'none';
  document.getElementById('menu_rolagens').style.display = 'block';
});

document.getElementById('menu_inventario').style.display = 'none';
main(1,1,1,1,1);
