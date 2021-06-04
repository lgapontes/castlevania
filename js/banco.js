
const NOME_BANCO = 'castlevania';

function __carregarDoBanco(callback) {
  let retrievedObject = localStorage.getItem(NOME_BANCO);
  if ( (retrievedObject == undefined) || (retrievedObject == null) || (retrievedObject == '') ) {
    json = {
      cifras: 1,
      itens: []
    };
  } else {
    json = JSON.parse(retrievedObject);
  }
  callback(json);
}

function __buscarItemNoBanco(item_para_encontrar,callback) {
  __carregarDoBanco(json => {
    let itemEncontrado = false;
    if (json.itens.length == 0) {
      callback(false,item_para_encontrar);
    } else {
      json.itens.forEach((item, index) => {
        if (item.uuid == item_para_encontrar.uuid) {
          itemEncontrado = true;
        }

        if (index == (json.itens.length - 1)) {
          callback(itemEncontrado,item_para_encontrar);
        }
      });
    }
  });
}

function __salvarNoBanco(item_salvo,callback) {
  __carregarDoBanco(json => {
    __buscarItemNoBanco(item_salvo, (itemEncontrado,itemParaSalvar) => {
      if (itemEncontrado) {

        let itens = [];

        if (json.itens.length == 0) {

          json.itens.push(itemParaSalvar);
          localStorage.setItem(NOME_BANCO, JSON.stringify(json));
          callback(json);

        } else {

          json.itens.forEach((item, index) => {

            let itemFinal = item;
            if (item.uuid == itemParaSalvar.uuid) {
              itemFinal = itemParaSalvar;
            }
            itens.push(itemFinal);

            if (index == (json.itens.length - 1)) {
              json.itens = itens;
              localStorage.setItem(NOME_BANCO, JSON.stringify(json));
              callback(json);
            }
          });

        }

      } else {
        json.itens.push(itemParaSalvar);
        localStorage.setItem(NOME_BANCO, JSON.stringify(json));
        callback(json);
      }
    });

  });
}

function __removerDoBanco(item_removido,callback) {
  __carregarDoBanco(json => {
    let itens = [];

    if (json.itens.length == 0) {
      callback(json);
    } else {
      json.itens.forEach((item, index) => {
        if (item.uuid != item_removido.uuid) {
          itens.push(item);
        }

        if (index == (json.itens.length - 1)) {
          json.itens = itens;
          localStorage.setItem(NOME_BANCO, JSON.stringify(json));
          callback(json);
        }
      });
    }

  });
}

function __atualizarMaximoCifras(cifras,callback) {
  __carregarDoBanco(json => {
    json.cifras = cifras;
    localStorage.setItem(NOME_BANCO, JSON.stringify(json));
    callback(json);
  });
}

const BANCO = {
  salvar: __salvarNoBanco,
  carregar: __carregarDoBanco,
  remover: __removerDoBanco,
  cifras: __atualizarMaximoCifras
};
