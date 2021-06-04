function sortearDeZeroAh(debug,in_maximo_incluso, callback) {
  let maximo_incluso = parseInt(in_maximo_incluso);
  if (debug) {
    console.log('teste');
    console.log(LEVEL);
    console.log(maximo_incluso);
  }
  if (maximo_incluso == 0) {
    callback(0);
  } else {
    let valor = Math.floor(Math.random() * (maximo_incluso + 1));
    if (debug) {
      console.log(valor);
    }
    callback(valor);
  }
}

function sortearNotas(lista,callback) {
  let notas = [];
  sortearDeZeroAh(false,LEVEL,level_sorteado => {
    if (level_sorteado == 0) {
      callback(notas);
    } else {
      for(let j=0; j<level_sorteado; j++) {
        sortearNota(lista,nota => {
          notas.push(nota);
          if (j == (level_sorteado - 1)) {
            callback(notas);
          }
        });
      }
    }
  });
}

function sortearNota(lista,callback) {
  let notas_para_sortear = [];
  for (let i=0; i<LEVEL; i++) {
    notas_para_sortear = notas_para_sortear.concat(lista[i]);
    if (i == (LEVEL - 1)) {
      sortearDeZeroAh(false,(notas_para_sortear.length - 1),valor_sorteado => {
        callback(notas_para_sortear[valor_sorteado]);
      });
    }
  }
}

function sortearNome(callback) {
  sortearDeZeroAh(false,(NOMES.length - 1), callback);
}

function sortearGold(tipo,callback) {
  let base = 10;
  if (LEVEL == 2) base = 100;
  if (LEVEL == 3) base = 300;
  if (LEVEL == 4) base = 600;
  if (LEVEL == 5) base = 1000;
  if (LEVEL == 6) base = 5000;

  sortearDeZeroAh(false,(LEVEL * 100),valor_sorteado => {
    if (tipo == 'cajado') {
      sortearDeZeroAh(false,( (Math.floor(LEVEL/2)+1) * 20),valor_cajado => {
        callback(base + valor_sorteado + valor_cajado);
      });
    } else {
      if (tipo == 'chicote') {
        sortearDeZeroAh(false,(LEVEL*5),valor_chicote => {
          callback(base + valor_sorteado + valor_chicote);
        });
      } else {
        if (tipo == 'espada') {
          sortearDeZeroAh(false,(LEVEL*10),valor_espada => {
            callback(base + valor_sorteado + valor_espada);
          });
        } else {
          if (tipo == 'armadura_leve') {
            sortearDeZeroAh(false,( (Math.floor(LEVEL/2)+1) * 30),valor_armadura_leve => {
              callback(base + valor_sorteado + valor_armadura_leve);
            });
          } else {
            if (tipo == 'armadura_média') {
              sortearDeZeroAh(false,( (Math.floor(LEVEL/2)+2) * 30),valor_armadura_media => {
                callback(base + valor_sorteado + valor_armadura_media);
              });
            } else {
              if (tipo == 'armadura_pesada') {
                sortearDeZeroAh(false,( (Math.floor(LEVEL/2)+3) * 30),valor_armadura_pesada => {
                  callback(base + valor_sorteado + valor_armadura_pesada);
                });
              } else {
                if (tipo == 'reliquia') {
                  sortearDeZeroAh(false,( (Math.floor(LEVEL/2)+3) * 20),valor_reliquia => {
                    callback(base + valor_sorteado + valor_reliquia + 100);
                  });
                } else {
                  if (tipo == 'pocoes') {
                    sortearDeZeroAh(false,( (Math.floor(LEVEL/2)+1) * 10),valor_reliquia => {
                      callback(base + valor_sorteado + valor_reliquia);
                    });
                  } else {
                    callback(base + valor_sorteado);
                  }
                }
              }
            }
          }
        }
      }
    }
  });
}

// SORTEAR RELÍQUIA
function sortearReliquia() {
  sortearDeZeroAh(false,40,valor => {

    sortearNome(indexNome => {
      sortearGold('reliquia',gold => {
        sortearDeZeroAh(false,(LEVEL - 1),level_reliquia => {
          sortearDeZeroAh(false,(DETALHES_RELIQUIAS[level_reliquia].length - 1),detalhe_index => {
            sortearDeZeroAh(false,10,nivel_reliquia => {
              let imagem = 'reliquia_' + valor + '.png';
              let nome = NOMES[indexNome] + ' Jewel';
              let detalhe = DETALHES_RELIQUIAS[0][detalhe_index];

              json = {
                tipo_objeto: RENDER_RELIQUIA,
                dados: {
                  nome: nome,
                  imagem: imagem,
                  nivel: (nivel_reliquia + 1),
                  detalhe: detalhe,
                  gold: gold
                }
              };

              json.equipado = false;
              json.inventario = false;
              json.uuid = uuidv4();
              render(json);
            });
          });
        });
      });
    });

  });
}

// SORTEAR POÇÕES
function sortearPocao() {
  sortearDeZeroAh(false,23,valor => {
    sortearNome(indexNome => {
      sortearGold('pocoes',gold => {

        sortearDeZeroAh(false,(LEVEL - 1),level_pocao => {

          sortearDeZeroAh(false,(DETALHES_POCOES[level_pocao].length - 1),detalhe_index => {
            sortearDeZeroAh(false,LEVEL,valor_chance_maldicao => {
              sortearDeZeroAh(false,(MALDICOES_POCOES.length - 1),valor_maldicao => {
                sortearDeZeroAh(false,10,nivel_pocao => {
                  let detalhe = DETALHES_POCOES[level_pocao][detalhe_index];
                  let maldicao = '';
                  if (valor_chance_maldicao < 1) {
                    maldicao = MALDICOES_POCOES[valor_maldicao];
                  }
                  let imagem = 'pocao_' + valor + '.png';
                  let nome = NOMES[indexNome] + ' Potion';

                  json = {
                    tipo_objeto: RENDER_POCAO,
                    dados: {
                      nome: nome,
                      imagem: imagem,
                      detalhe: detalhe,
                      maldicao: maldicao,
                      nivel: (nivel_pocao + 1),
                      gold: gold
                    }
                  };

                  json.equipado = false;
                  json.inventario = false;
                  json.uuid = uuidv4();
                  render(json);
                });
              });
            });
          });

        });

      });
    });
  });
}

// SORTEAR ARMADURA
function sortearArmadura() {
  sortearDeZeroAh(false,2,valor_sorteado => {
    if (valor_sorteado == 0) {
      // Armadura Leve
      sortearDeZeroAh(false,20,valor => {

        sortearNome(indexNome => {
          sortearGold('escudo',gold => {
            sortearNotas(NOTAS_ARMADURAS,notas => {
              sortearDeZeroAh(false,(NOMES_ARMADURAS.length - 1),valorNomeArmadura => {
                let tipo = 'armadura_leve';
                let imagem = 'robe_' + valor + '.png';
                let nome = NOMES[indexNome] + ' ' + NOMES_ARMADURAS[valorNomeArmadura];

                json = {
                  tipo_objeto: RENDER_ARMADURA,
                  dados: {
                    nome: nome,
                    imagem: imagem,
                    tipo: tipo,
                    notas: notas,
                    gold: gold
                  }
                };

                json.equipado = false;
                json.inventario = false;
                json.uuid = uuidv4();
                render(json);
              });
            });
          });
        });

      });
    } else if (valor_sorteado == 1) {
      // Armadura Média
      sortearDeZeroAh(false,1,valorImagemArmadura => {

        if (valorImagemArmadura == 0) {
          // Robe
          sortearDeZeroAh(false,20,valor => {
            sortearNome(indexNome => {
              sortearGold('armadura_leve',gold => {
                sortearNotas(NOTAS_ARMADURAS,notas => {
                  sortearDeZeroAh(false,(NOMES_ARMADURAS.length - 1),valorNomeArmadura => {
                    let tipo = 'armadura_média';
                    let imagem = 'robe_' + valor + '.png';
                    let nome = NOMES[indexNome] + ' ' + NOMES_ARMADURAS[valorNomeArmadura];

                    json = {
                      tipo_objeto: RENDER_ARMADURA,
                      dados: {
                        nome: nome,
                        imagem: imagem,
                        tipo: tipo,
                        notas: notas,
                        gold: gold
                      }
                    };

                    json.equipado = false;
                    json.inventario = false;
                    json.uuid = uuidv4();
                    render(json);
                  });
                });
              });
            });
          });
        } else {
          // Armadura
          sortearDeZeroAh(false,31,valor => {

            sortearNome(indexNome => {
              sortearGold('armadura_média',gold => {
                sortearNotas(NOTAS_ARMADURAS,notas => {
                  sortearDeZeroAh(false,(NOMES_ARMADURAS.length - 1),valorNomeArmadura => {
                    let tipo = 'armadura_média';
                    let imagem = 'armadura_' + valor + '.png';
                    let nome = NOMES[indexNome] + ' ' + NOMES_ARMADURAS[valorNomeArmadura];

                    json = {
                      tipo_objeto: RENDER_ARMADURA,
                      dados: {
                        nome: nome,
                        imagem: imagem,
                        tipo: tipo,
                        notas: notas,
                        gold: gold
                      }
                    };

                    json.equipado = false;
                    json.inventario = false;
                    json.uuid = uuidv4();
                    render(json);
                  });
                });
              });
            });

          });
        }

      });


    } else if (valor_sorteado == 2) {
      // Armadura Pesada
      sortearDeZeroAh(false,31,valor => {

        sortearNome(indexNome => {
          sortearGold('armadura_pesada',gold => {
            sortearNotas(NOTAS_ARMADURAS,notas => {
              sortearDeZeroAh(false,(NOMES_ARMADURAS.length - 1),valorNomeArmadura => {
                let tipo = 'armadura_pesada';
                let imagem = 'armadura_' + valor + '.png';
                let nome = NOMES[indexNome] + ' ' + NOMES_ARMADURAS[valorNomeArmadura];

                json = {
                  tipo_objeto: RENDER_ARMADURA,
                  dados: {
                    nome: nome,
                    imagem: imagem,
                    tipo: tipo,
                    notas: notas,
                    gold: gold
                  }
                };

                json.equipado = false;
                json.inventario = false;
                json.uuid = uuidv4();
                render(json);
              });
            });
          });
        });

      });
    }
  });
}


// SORTEAR ESCUDO
function sortearEscudo() {
  // Escudo
  sortearDeZeroAh(false,30,valor => {
    sortearNome(indexNome => {
      sortearGold('escudo',gold => {
        sortearNotas(NOTAS_ESCUDOS,notas => {
          let tipo = 'escudo';
          let imagem = 'escudo_' + valor + '.png';
          let nome = NOMES[indexNome] + ' Shield';

          json = {
            tipo_objeto: RENDER_ESCUDO,
            dados: {
              nome: nome,
              imagem: imagem,
              tipo: tipo,
              notas: notas,
              gold: gold
            }
          };

          json.equipado = false;
          json.inventario = false;
          json.uuid = uuidv4();
          render(json);
        });
      });
    });
  });
}

// SORTEAR ARMA
function sortearArma() {
  sortearDeZeroAh(false,10,valor_sorteado => {
    if (valor_sorteado == 0) {
      // Arma Leve (adaga)
      sortearDeZeroAh(false,41,valor => {

        sortearDeZeroAh(false,(NOMES_ADAGAS.length - 1),indexNomeArma => {
          sortearNome(indexNome => {
            sortearGold('adaga',gold => {
              sortearNotas(NOTAS_ARMAS,notas => {
                let tipo = 'leve';
                let imagem = 'adaga_' + valor + '.png';
                let sufixo_nome = NOMES_ADAGAS[indexNomeArma];
                let nome = NOMES[indexNome] + ' ' + sufixo_nome;
                let alcance = 'Imediato';
                notas.push('Pode ser arremessada até alcance curto');

                json = {
                  tipo_objeto: RENDER_ARMA,
                  dados: {
                    nome: nome,
                    imagem: imagem,
                    tipo: tipo,
                    alcance: alcance,
                    notas: notas,
                    gold: gold
                  }
                };

                json.equipado = false;
                json.inventario = false;
                json.uuid = uuidv4();
                render(json);
              });
            });
          });
        });

      });
    } else if (valor_sorteado == 1) {
      // Arma Leve (cajado)
      sortearDeZeroAh(false,34,valor => {

        sortearDeZeroAh(false,(NOMES_CAJADOS.length - 1),indexNomeArma => {
          sortearNome(indexNome => {
            sortearGold('cajado',gold => {
              sortearNotas(NOTAS_ARMAS,notas => {
                sortearDeZeroAh(false,1,valorAlcance => {

                  // 0 = Imediato, 1 = Curto
                  let max_sorteio_alcance = NOTAS_CAJADOS_IMEDIATO.length * 2;
                  if (valorAlcance == 1) {
                    max_sorteio_alcance = NOTAS_CAJADOS_CURTO.length - 1;
                  }

                  sortearDeZeroAh(false,max_sorteio_alcance,indexNotaCajado => {

                    let tipo = 'leve';
                    let imagem = 'cajado_' + valor + '.png';
                    let sufixo_nome = NOMES_CAJADOS[indexNomeArma];
                    let nome = NOMES[indexNome] + ' ' + sufixo_nome;

                    let alcance = 'Imediato';
                    if (valorAlcance == 0) {
                      if (indexNotaCajado < NOTAS_CAJADOS_IMEDIATO.length) {
                        notas.push(NOTAS_CAJADOS_IMEDIATO[indexNotaCajado]);
                      }
                    } else {
                      alcance = 'Curto';
                      notas.push(NOTAS_CAJADOS_CURTO[indexNotaCajado]);
                      notas.push('Os projéteis alcançam 15 metros');
                    }

                    json = {
                      tipo_objeto: RENDER_ARMA,
                      dados: {
                        nome: nome,
                        imagem: imagem,
                        tipo: tipo,
                        alcance: alcance,
                        notas: notas,
                        gold: gold
                      }
                    };

                    json.equipado = false;
                    json.inventario = false;
                    json.uuid = uuidv4();
                    render(json);

                  });
                });
              });
            });
          });
        });

      });
    } else if (valor_sorteado == 2) {
      // Arma Leve (chicote)
      sortearDeZeroAh(false,26,valor => {

        sortearDeZeroAh(false,(NOMES_CHICOTES.length - 1),indexNomeArma => {
          sortearNome(indexNome => {
            sortearGold('chicote',gold => {
              sortearNotas(NOTAS_ARMAS,notas => {
                sortearDeZeroAh(false,(NOTAS_CHICOTE.length * 2),indexNotaChicote => {
                  let tipo = 'leve';
                  let imagem = 'chicote_' + valor + '.png';
                  let sufixo_nome = NOMES_CHICOTES[indexNomeArma];
                  let nome = NOMES[indexNome] + ' ' + sufixo_nome;
                  let alcance = 'Imediato';
                  if (indexNotaChicote < NOTAS_CHICOTE.length) {
                    notas.push(NOTAS_CHICOTE[indexNotaChicote]);
                  }

                  json = {
                    tipo_objeto: RENDER_ARMA,
                    dados: {
                      nome: nome,
                      imagem: imagem,
                      tipo: tipo,
                      alcance: alcance,
                      notas: notas,
                      gold: gold
                    }
                  };

                  json.equipado = false;
                  json.inventario = false;
                  json.uuid = uuidv4();
                  render(json);
                });
              });
            });
          });
        });

      });
    } else if (valor_sorteado == 3) {
      // Arma Leve (arco)
      sortearDeZeroAh(false,32,valor => {

        sortearDeZeroAh(false,(NOMES_ARCOS.length - 1),indexNomeArma => {
          sortearNome(indexNome => {
            sortearGold('arco',gold => {
              sortearNotas(NOTAS_ARMAS,notas => {

                let tipo = 'leve';
                let imagem = 'arco_v' + valor + '.png';
                let sufixo_nome = NOMES_ARCOS[indexNomeArma];
                let nome = NOMES[indexNome] + ' ' + sufixo_nome;
                let alcance = 'Curto';
                notas.push('Se utilizado para distâncias longas, aumenta 2 níveis de dificuldade');
                notas.push('Deve ser utilizado com duas mãos');

                json = {
                  tipo_objeto: RENDER_ARMA,
                  dados: {
                    nome: nome,
                    imagem: imagem,
                    tipo: tipo,
                    alcance: alcance,
                    notas: notas,
                    gold: gold
                  }
                };

                json.equipado = false;
                json.inventario = false;
                json.uuid = uuidv4();
                render(json);

              });
            });
          });
        });

      });
    } else if (valor_sorteado == 4) {
      // Arma Média (espada)
      sortearDeZeroAh(false,49,valor => {

        sortearDeZeroAh(false,(NOMES_ESPADAS.length - 1),indexNomeArma => {
          sortearNome(indexNome => {
            sortearGold('espada',gold => {
              sortearNotas(NOTAS_ARMAS,notas => {
                sortearDeZeroAh(false,(NOTAS_ESPADA.length * 2),indexNotaEspada => {
                  let tipo = 'médio';
                  let imagem = 'espada_' + valor + '.png';
                  let sufixo_nome = NOMES_ESPADAS[indexNomeArma];
                  let nome = NOMES[indexNome] + ' ' + sufixo_nome;
                  let alcance = 'Imediato';
                  if (indexNotaEspada < NOTAS_ESPADA.length) {
                    notas.push(NOTAS_ESPADA[indexNotaEspada]);
                  }

                  json = {
                    tipo_objeto: RENDER_ARMA,
                    dados: {
                      nome: nome,
                      imagem: imagem,
                      tipo: tipo,
                      alcance: alcance,
                      notas: notas,
                      gold: gold
                    }
                  };

                  json.equipado = false;
                  json.inventario = false;
                  json.uuid = uuidv4();
                  render(json);
                });
              });
            });
          });
        });

      });
    } else if (valor_sorteado == 5) {
      // Arma Média (arco)
      sortearDeZeroAh(false,32,valor => {

        sortearDeZeroAh(false,(NOMES_ARCOS.length - 1),indexNomeArma => {
          sortearNome(indexNome => {
            sortearGold('arco',gold => {
              sortearNotas(NOTAS_ARMAS,notas => {

                let tipo = 'médio';
                let imagem = 'arco_v' + valor + '.png';
                let sufixo_nome = NOMES_ARCOS[indexNomeArma];
                let nome = NOMES[indexNome] + ' ' + sufixo_nome;
                let alcance = 'Longo';
                notas.push('Deve ser utilizado com duas mãos');

                json = {
                  tipo_objeto: RENDER_ARMA,
                  dados: {
                    nome: nome,
                    imagem: imagem,
                    tipo: tipo,
                    alcance: alcance,
                    notas: notas,
                    gold: gold
                  }
                };

                json.equipado = false;
                json.inventario = false;
                json.uuid = uuidv4();
                render(json);

              });
            });
          });
        });

      });
    } else if (valor_sorteado == 6) {
      // Arma Média (cajado)
      sortearDeZeroAh(false,34,valor => {

        sortearDeZeroAh(false,(NOMES_CAJADOS.length - 1),indexNomeArma => {
          sortearNome(indexNome => {
            sortearGold('cajado',gold => {
              sortearNotas(NOTAS_ARMAS,notas => {
                sortearDeZeroAh(false,1,valorAlcance => {

                  // 0 = Imediato, 1 = Curto
                  let max_sorteio_alcance = NOTAS_CAJADOS_IMEDIATO.length * 2;
                  if (valorAlcance == 1) {
                    max_sorteio_alcance = NOTAS_CAJADOS_CURTO.length - 1;
                  }

                  sortearDeZeroAh(false,max_sorteio_alcance,indexNotaCajado => {

                    let tipo = 'médio';
                    let imagem = 'cajado_' + valor + '.png';
                    let sufixo_nome = NOMES_CAJADOS[indexNomeArma];
                    let nome = NOMES[indexNome] + ' ' + sufixo_nome;

                    let alcance = 'Imediato';
                    if (valorAlcance == 0) {
                      if (indexNotaCajado < NOTAS_CAJADOS_IMEDIATO.length) {
                        notas.push(NOTAS_CAJADOS_IMEDIATO[indexNotaCajado]);
                      }
                    } else {
                      alcance = 'Curto';
                      notas.push(NOTAS_CAJADOS_CURTO[indexNotaCajado]);
                      notas.push('Os projéteis alcançam 15 metros');
                    }

                    notas.push('Deve ser utilizado com duas mãos');

                    json = {
                      tipo_objeto: RENDER_ARMA,
                      dados: {
                        nome: nome,
                        imagem: imagem,
                        tipo: tipo,
                        alcance: alcance,
                        notas: notas,
                        gold: gold
                      }
                    };

                    json.equipado = false;
                    json.inventario = false;
                    json.uuid = uuidv4();
                    render(json);

                  });
                });
              });
            });
          });
        });

      });
    } else if (valor_sorteado == 7) {
      // Arma Média (chicote)
      sortearDeZeroAh(false,26,valor => {

        sortearDeZeroAh(false,(NOMES_CHICOTES.length - 1),indexNomeArma => {
          sortearNome(indexNome => {
            sortearGold('chicote',gold => {
              sortearNotas(NOTAS_ARMAS,notas => {
                sortearDeZeroAh(false,(NOTAS_CHICOTE.length * 2),indexNotaChicote => {
                  let tipo = 'médio';
                  let imagem = 'chicote_' + valor + '.png';
                  let sufixo_nome = NOMES_CHICOTES[indexNomeArma];
                  let nome = NOMES[indexNome] + ' ' + sufixo_nome;
                  let alcance = 'Imediato';
                  if (indexNotaChicote < NOTAS_CHICOTE.length) {
                    notas.push(NOTAS_CHICOTE[indexNotaChicote]);
                  }

                  json = {
                    tipo_objeto: RENDER_ARMA,
                    dados: {
                      nome: nome,
                      imagem: imagem,
                      tipo: tipo,
                      alcance: alcance,
                      notas: notas,
                      gold: gold
                    }
                  };

                  json.equipado = false;
                  json.inventario = false;
                  json.uuid = uuidv4();
                  render(json);
                });
              });
            });
          });
        });

      });
    } else if (valor_sorteado == 8) {
      // Arma Pesada (cajado)
      sortearDeZeroAh(false,34,valor => {

        sortearDeZeroAh(false,(NOMES_CAJADOS.length - 1),indexNomeArma => {
          sortearNome(indexNome => {
            sortearGold('cajado',gold => {
              sortearNotas(NOTAS_ARMAS,notas => {
                sortearDeZeroAh(false,1,valorAlcance => {

                  // 0 = Imediato, 1 = Curto, 2 = Longo
                  let max_sorteio_alcance = NOTAS_CAJADOS_IMEDIATO.length * 2;
                  if (valorAlcance > 0) {
                    max_sorteio_alcance = NOTAS_CAJADOS_CURTO.length - 1;
                  }

                  sortearDeZeroAh(false,max_sorteio_alcance,indexNotaCajado => {

                    let tipo = 'pesado';
                    let imagem = 'cajado_' + valor + '.png';
                    let sufixo_nome = NOMES_CAJADOS[indexNomeArma];
                    let nome = NOMES[indexNome] + ' ' + sufixo_nome;

                    let alcance = 'Imediato';
                    if (valorAlcance == 0) {
                      if (indexNotaCajado < NOTAS_CAJADOS_IMEDIATO.length) {
                        notas.push(NOTAS_CAJADOS_IMEDIATO[indexNotaCajado]);
                      }
                    } else if (valorAlcance == 1) {
                      alcance = 'Curto';
                      notas.push(NOTAS_CAJADOS_CURTO[indexNotaCajado]);
                      notas.push('Os projéteis alcançam 15 metros');
                    } else {
                     alcance = 'Longo';
                     notas.push(NOTAS_CAJADOS_CURTO[indexNotaCajado]);
                   }

                    notas.push('Deve ser utilizado com duas mãos');

                    json = {
                      tipo_objeto: RENDER_ARMA,
                      dados: {
                        nome: nome,
                        imagem: imagem,
                        tipo: tipo,
                        alcance: alcance,
                        notas: notas,
                        gold: gold
                      }
                    };

                    json.equipado = false;
                    json.inventario = false;
                    json.uuid = uuidv4();
                    render(json);

                  });
                });
              });
            });
          });
        });

      });
    } else if (valor_sorteado == 9) {
      // Arma Pesada (chicote)
      sortearDeZeroAh(false,26,valor => {

        sortearDeZeroAh(false,(NOMES_CHICOTES.length - 1),indexNomeArma => {
          sortearNome(indexNome => {
            sortearGold('chicote',gold => {
              sortearNotas(NOTAS_ARMAS,notas => {
                sortearDeZeroAh(false,(NOTAS_CHICOTE.length * 2),indexNotaChicote => {
                  let tipo = 'pesado';
                  let imagem = 'chicote_' + valor + '.png';
                  let sufixo_nome = NOMES_CHICOTES[indexNomeArma];
                  let nome = NOMES[indexNome] + ' ' + sufixo_nome;
                  let alcance = 'Imediato';
                  if (indexNotaChicote < NOTAS_CHICOTE.length) {
                    notas.push(NOTAS_CHICOTE[indexNotaChicote]);
                  }
                  notas.push('Deve ser utilizado com duas mãos');

                  json = {
                    tipo_objeto: RENDER_ARMA,
                    dados: {
                      nome: nome,
                      imagem: imagem,
                      tipo: tipo,
                      alcance: alcance,
                      notas: notas,
                      gold: gold
                    }
                  };

                  json.equipado = false;
                  json.inventario = false;
                  json.uuid = uuidv4();
                  render(json);

                });
              });
            });
          });
        });

      });
    } else if (valor_sorteado == 10) {
      // Arma Pesada (espada)
      sortearDeZeroAh(false,49,valor => {

        sortearDeZeroAh(false,(NOMES_ESPADAS.length - 1),indexNomeArma => {
          sortearNome(indexNome => {
            sortearGold('espada',gold => {
              sortearNotas(NOTAS_ARMAS,notas => {
                sortearDeZeroAh(false,(NOTAS_ESPADA.length * 2),indexNotaEspada => {
                  let tipo = 'pesado';
                  let imagem = 'espada_' + valor + '.png';
                  let sufixo_nome = NOMES_ESPADAS[indexNomeArma];
                  let nome = NOMES[indexNome] + ' ' + sufixo_nome;
                  let alcance = 'Imediato';
                  if (indexNotaEspada < NOTAS_ESPADA.length) {
                    notas.push(NOTAS_ESPADA[indexNotaEspada]);
                  }
                  notas.push('Deve ser utilizado com duas mãos');

                  json = {
                    tipo_objeto: RENDER_ARMA,
                    dados: {
                      nome: nome,
                      imagem: imagem,
                      tipo: tipo,
                      alcance: alcance,
                      notas: notas,
                      gold: gold
                    }
                  };

                  json.equipado = false;
                  json.inventario = false;
                  json.uuid = uuidv4();
                  render(json);

                });
              });
            });
          });
        });

      });
    }
  });
}

function sortearItens(quantidade,funcaoSorteada,callback) {
  for(let i=0; i<quantidade; i++) {
    funcaoSorteada();
    if (i == (quantidade - 1)) {
      callback();
    }
  }
}
