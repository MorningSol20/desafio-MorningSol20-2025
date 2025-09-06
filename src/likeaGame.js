// Olá, esse foi um desafio para uma vaga de trabalho, o arquivo original é abrigo-animais.js. Esse foi feito pensando em interagir com o usuario.
// Usuario deve baixar e pode rodar com o node.js ou no terminal do SO(cmd ou powerShell para windows)

const prompt = require('prompt-sync')({ sigint: true });

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

// funções de erro
function erroA() {
    console.log('ERRO: Animal inválido');
}
function erroB() {
    console.log('ERRO: Brinquedo inválido');
}

// vitrine
function vitrine() {
    console.log(`
        Bem-vindo(a) ao abrigo de animais!
Estamos a procura de pessoas aptas a levar esses animais para casa.

ANIMAIS

Nome   | Espécie | Brinquedos
--------------------------------------
Rex    | cão     | RATO, BOLA
Mimi   | gato    | BOLA, LASER
Fofo   | gato    | BOLA, RATO, LASER
Zero   | gato    | RATO, BOLA
Bola   | cão     | CAIXA, NOVELO
Bebe   | cão     | LASER, RATO, BOLA
Loco   | jabuti  | SKATE, RATO

Pronto para começar?
    `);
}

// verifica se brinquedos atendem os requisitos do animal
function atendeRequisitos(animal, brinquedosPessoa) {
    if (animal.nome === "Loco") {
        // Loco não liga pra ordem
        return animal.favoritos.every(fav => brinquedosPessoa.includes(fav));
    }
    let idx = 0;
    for (let brinquedo of brinquedosPessoa) {
        if (brinquedo === animal.favoritos[idx]) {
            idx++;
        }
        if (idx === animal.favoritos.length) return true;
    }
    return false;
}

// lógica de adoção
function adocao(p1, p2, ordem) {
    const resultado = {};
    const adotadosPorPessoa = { 1: 0, 2: 0 };

    for (let nome of ordem) {
        const animal = especies.find(a => a.nome.toLowerCase() === nome);
        if (!animal) return "Animal inválido";

        const p1ok = atendeRequisitos(animal, p1);
        const p2ok = atendeRequisitos(animal, p2);

        if (p1ok && p2ok) {
            resultado[animal.nome] = "abrigo";
        } else if (p1ok && adotadosPorPessoa[1] < 3) {
            resultado[animal.nome] = "pessoa 1";
            adotadosPorPessoa[1]++;
        } else if (p2ok && adotadosPorPessoa[2] < 3) {
            resultado[animal.nome] = "pessoa 2";
            adotadosPorPessoa[2]++;
        } else {
            resultado[animal.nome] = "abrigo";
        }
    }

    return Object.entries(resultado)
        .sort(([a], [b]) => a.localeCompare(b)) // ordem alfabética
        .map(([animal, dono]) => `${animal} - ${dono}`)
        .join("\n");
}

// execução
vitrine();
prompt('Aperte ENTER para iniciar...');

let parar = "no";

do {
    const p1 = prompt("Brinquedos da pessoa 1 (separados por vírgula): ").toUpperCase().split(',');
    const p2 = prompt("Brinquedos da pessoa 2 (separados por vírgula): ").toUpperCase().split(',');
    const ordem = prompt("Qual a ordem dos animais? (separados por vírgula): ").toLowerCase().split(',');

    // validações de brinquedos
    if ([...new Set(p1)].length !== p1.length || [...new Set(p2)].length !== p2.length) {
        console.clear(); parar = "no"; 
        erroB(); vitrine(); continue;
    } else if (!p1.every(item => brinquedos.includes(item)) || !p2.every(item => brinquedos.includes(item))) {
        console.clear(); parar = "no"; 
        erroB();erroA(); vitrine(); continue;

    // validações de animais    
    } else if ([...new Set(ordem)].length !== ordem.length) {
        console.clear(); parar = "no"; 
        erroA(); vitrine(); continue;
    } else if (!ordem.every(a => animais.includes(a))) {
        console.clear(); parar = "no"; 
        erroA(); vitrine(); continue;
    } else {

        // resultado final
    console.log("Resultado:");
    console.log(adocao(p1, p2, ordem));

    parar = "sim";
    }

    
} while (parar == "no");


// abrigo.js fim
