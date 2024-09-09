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
        if (!this.animaisValidos[animal]) {
            return { erro: "Animal inválido" };
        }

        // Validação de quantidade.
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const { tamanho, biomas } = this.animaisValidos[animal];
        const recintosViaveis = [];

        // Verificação de recintos.
        for (const recinto of this.recintos) {
            if (!biomas.some(bioma => recinto.bioma.includes(bioma))) {
                continue;
            }

            // Calcular o espaço ocupado pelos animais existentes no recinto.
             let espacoOcupado = recinto.animais.reduce((acc, animal) => acc + animal.espacoOcupado, 0);

            // Regras para animais carnívoros.
            if (['LEAO', 'LEOPARDO', 'CROCODILO'].includes(animal)) {
                if (recinto.animais.length > 0 && recinto.animais[0].especie !== animal) {
                    continue;
                }
            }

            // Regra para Hipopótamos.
            if (animal === 'HIPOPOTAMO') {
                if (recinto.bioma !== 'savana e rio' && recinto.animais.length > 0 && recinto.animais[0].especie !== 'HIPOPOTAMO') {
                    continue;
                }
            }

            // Regra para Macacos.
            if ((animal === 'MACACO') && (recinto.animais.length > 0) && ['LEAO', 'LEOPARDO', 'CROCODILO'].includes(recinto.animais[0].especie)) {
                continue;
            }

            // Se houver mais de uma espécie, é necessário contar espaço extra.
            if (recinto.animais.length > 0 && !recinto.animais.every(a => a.especie === animal)) {
                espacoOcupado += 1;
            }

            const espacoNecessario = tamanho * quantidade;
            const espacoLivre = recinto.tamanho - espacoOcupado;

            // Verifica se há espaço suficiente no recinto.
            if (espacoLivre >= espacoNecessario) {
                recintosViaveis.push({
                    numero: recinto.numero,
                    espacoLivre: espacoLivre - espacoNecessario,
                    tamanhoTotal: recinto.tamanho
                });
            }
        }

        // Retorna mensagem de erro, se não houver recintos viáveis.
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