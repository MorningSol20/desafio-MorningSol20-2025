class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    // abrigo
    const animais = ["rex", "mimi", "fofo", "zero", "bola", "bebe", "loco"];

    const especies = [
      { nome: "Rex", tipo: "cão", favoritos: ["RATO", "BOLA"] },
      { nome: "Mimi", tipo: "gato", favoritos: ["BOLA", "LASER"] },
      { nome: "Fofo", tipo: "gato", favoritos: ["BOLA", "RATO", "LASER"] },
      { nome: "Zero", tipo: "gato", favoritos: ["RATO", "BOLA"] },
      { nome: "Bola", tipo: "cão", favoritos: ["CAIXA", "NOVELO"] },
      { nome: "Bebe", tipo: "cão", favoritos: ["LASER", "RATO", "BOLA"] },
      { nome: "Loco", tipo: "jabuti", favoritos: ["SKATE", "RATO"] }
    ];

    const brinquedos = ["RATO", "LASER", "BOLA", "CAIXA", "NOVELO", "SKATE"];

    const listaOrdem = ordemAnimais.toLowerCase().split(',');
    const listaP1 = brinquedosPessoa1.toUpperCase().split(',');
    const listaP2 = brinquedosPessoa2.toUpperCase().split(',');

    // validações
    if (!listaOrdem.every(a => animais.includes(a))) {
      return { erro: 'Animal inválido', lista: null };
    }
    if (!listaP1.every(b => brinquedos.includes(b)) ||
      !listaP2.every(b => brinquedos.includes(b))) {
      return { erro: 'Brinquedo inválido', lista: null };
    }

    // função auxiliar
    function contemSubsequencia(listaPessoa, listaFavoritos) {
      let i = 0;
      for (let item of listaPessoa) {
        if (item === listaFavoritos[i]) {
          i++;
          if (i === listaFavoritos.length) return true;
        }
      }
      return false;
    }

    // lógica
    const resultado = [];

    for (let nomeAnimal of listaOrdem) {
      const animal = especies.find(e => e.nome.toLowerCase() === nomeAnimal);
      if (!animal) continue;

      const podeP1 = contemSubsequencia(listaP1, animal.favoritos);
      const podeP2 = contemSubsequencia(listaP2, animal.favoritos);

      if (podeP1 && !podeP2) {
        resultado.push(`${animal.nome} - pessoa 1`);
      } else if (!podeP1 && podeP2) {
        resultado.push(`${animal.nome} - pessoa 2`);
      } else {
        // se ambos podem, ou nenhum pode → abrigo
        resultado.push(`${animal.nome} - abrigo`);
      }
    }

    return { erro: null, lista: resultado.sort() };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
