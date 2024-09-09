class RecintosZoo {
    constructor() {
        // Definir os recintos e animais.
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3, espacoOcupado: 3 }] },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1, espacoOcupado: 2 }] },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1, espacoOcupado: 3 }] }
        ];
        
        this.animaisValidos = {
            'LEAO': { tamanho: 3, biomas: ['savana'] },
            'LEOPARDO': { tamanho: 2, biomas: ['savana'] },
            'CROCODILO': { tamanho: 3, biomas: ['rio'] },
            'MACACO': { tamanho: 1, biomas: ['savana', 'floresta'] },
            'GAZELA': { tamanho: 2, biomas: ['savana'] },
            'HIPOPOTAMO': { tamanho: 4, biomas: ['savana', 'rio'] },
        };    
    }

    analisaRecintos(animal, quantidade) {
        // Validação de espécies.
        const animalUpper = animal.toUpperCase();
        if (!this.animaisValidos[animalUpper]) {
            return { erro: "Animal inválido" }; // Retorna erro se o animal não for válido.
        }

        // Validação de quantidade.
        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida" }; // Retorna erro se a quantidade for inválida.
        }

        const { tamanho, biomas } = this.animaisValidos[animalUpper];
        const recintosViaveis = [];

        // Verificação de recintos.
        for (const recinto of this.recintos) {
            if (!biomas.includes(recinto.bioma)) {
                continue; // Ignora recintos que não possuem o bioma adequado.
            }

            // Calcula o espaço ocupado pelos animais existentes no recinto.
            let espacoOcupado = recinto.animais.reduce((acc, animal) => acc + (animal.espacoOcupado * animal.quantidade), 0);

            // Regras específicas para alguns animais.
            if (['LEAO', 'LEOPARDO', 'CROCODILO'].includes(animalUpper)) {
                if (recinto.animais.length > 0 && recinto.animais[0].especie !== animalUpper) {
                    continue; // Ignora recintos se já há um animal diferente presente.
                }
            }

            if (animalUpper === 'HIPOPOTAMO') {
                if (recinto.bioma !== 'savana e rio' || (recinto.animais.length > 0 && recinto.animais.some(a => a.especie !== 'HIPOPOTAMO'))) {
                    continue;
                }
            }

            if (animalUpper === 'MACACO') {
                if (recinto.animais.length > 0 && !(recinto.animais.length === 1 && recinto.animais[0].especie === 'MACACO')) {
                    continue;
                }
          }

            // Calcula o espaço necessário para os novos animais.
            const espacoNecessario = tamanho * quantidade;
            const espacoLivre = recinto.tamanho - espacoOcupado;

            // Verifica se há espaço suficiente no recinto para os novos animais.
            if (espacoLivre >= espacoNecessario) {
                recintosViaveis.push({
                    numero: recinto.numero,
                    espacoLivre: espacoLivre - espacoNecessario,
                    tamanhoTotal: recinto.tamanho
                });
            }
        }

        // Retorna mensagem de erro se não houver recintos viáveis.
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        // Ordena os recintos pelo número e formata a saída.
        recintosViaveis.sort((a, b) => a.numero - b.numero);

        return {
            recintosViaveis: recintosViaveis.map(r => `Recinto ${r.numero} (espaço livre: ${r.espacoLivre} total: ${r.tamanhoTotal})`)
        };
    }
}

export { RecintosZoo as RecintosZoo };