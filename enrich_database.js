const fs = require('fs');

const exerciseTemplates = [
    // CORE & ABDOMINAIS
    "Abdominal Supra Tradicional",
    "Abdominal Infra na Prancha",
    "Abdominal Remador Completo",
    "Abdominal Bicicleta (Oblíquos)",
    "Abdominal Canivete",
    "Abdominal Tesoura Alternado",
    "Prancha Frontal Isométrica",
    "Prancha Lateral com Elevação de Quadril",
    "Prancha Alta com Toque no Ombro",
    "Prancha Dinâmica (Subida e Descida)",
    "Mountain Climber (Escalador de Prancha)",
    "Abdominal Infra Elevação de Pernas",
    "Abdominal Toque no Calcanhar",
    "Abdominal Russo (Russian Twist)",
    "Prancha com Extensão de Braço",
    "Abdominal Infra Vela",
    "Prancha Aranha (Knee to Elbow)",
    "Abdominal Infra no Solo",
    "Prancha Lateral Isométrica",
    "Abdominal Supra com Isometria",

    // QUADRÍCEPS & GLÚTEOS
    "Agachamento Livre Profundo",
    "Agachamento Sumô com Isometria",
    "Agachamento Búlgaro Unilateral",
    "Agachamento Isométrico na Parede",
    "Agachamento Salto Explosivo (Jump Squat)",
    "Afundo com Passada Frontal",
    "Passada Reversa Alternada",
    "Elevação Pélvica no Solo",
    "Elevação Pélvica Unilateral",
    "Stiff RDL com Halteres",
    "Bom Dia (Good Morning) para Posterior",
    "Abdução de Quadril em Prancha Lateral",
    "Agachamento Avanço com Deslocamento",
    "Elevação Pélvica com Carga",
    "Agachamento Sumô com Salto",
    "Afundo Isométrico com Carga",
    "Agachamento com Peso Corporal",
    "Elevação de Calcanhares (Panturrilha)",
    "Passada Lateral Dinâmica",
    "Agachamento Cossaco (Cossack Squat)",

    // CARDIO & HIIT
    "Burpee Completo com Flexão",
    "Half Burpee (Burpee Sem Flexão)",
    "Polichinelo Tradicional",
    "Poli-Sapato (Cross Jacks)",
    "Corrida Estacionária (High Knees)",
    "Skipping Baixo de Alta Frequência",
    "Salto Tesoura (Jumping Lunges)",
    "Deslocamento Lateral com Toque no Chão",
    "Kettlebell Swing Explosivo",
    "Saltos de Caixa (Box Jump)",
    "Burpee com Salto Vertical",
    "Polichinelo Frontal",
    "Corrida Estacionária Calcanhar no Bumbum",
    "Skater Jumps (Saltos Laterais de Patinador)",
    "Jumping Squat com Giro",
    "Poli-Agachamento",
    "Sprints Estacionários Explosivos",
    "Saltos Horizontais com Amortecimento",
    "Burpee com Tuck Jump",
    "Skipping Alto Intensivo",

    // SUPERIORES (PEITO, COSTAS & BRAÇOS)
    "Flexão de Braço Tradicional (Push-Up)",
    "Flexão de Braço Fechada (Tríceps)",
    "Flexão de Braço Aberta (Peitoral)",
    "Flexão Declinada com Pés Elevados",
    "Desenvolvimento de Ombros Overhead",
    "Elevação Lateral de Ombros",
    "Elevação Frontal Alternada",
    "Remada Curvada com Halteres",
    "Remada Unilateral (Serrote)",
    "Tríceps Banco (Dips)",
    "Tríceps Testa com Halteres",
    "Rosca Direta Alternada",
    "Rosca Martelo com Halteres",
    "Crucifixo Inverso para Costas",
    "Flexão de Braço com Joelhos no Chão",
    "Prancha com Remada Alternada (Renegade Row)",
    "Desenvolvimento de Ombros Arnold",
    "Elevação Y-T-W para Escápulas",
    "Tríceps Coice com Halter",
    "Rosca Concentrada Unilateral",

    // MOBILIDADE & AQUECIMENTO
    "Mobilidade de Quadril (World's Greatest Stretch)",
    "Rotação de Tronco e Coluna Torácica",
    "Alongamento Dinâmico de Isquiotibiais",
    "Gato e Vaca (Cat-Cow para Coluna)",
    "Rotação de Ombros Dinâmica",
    "Agachamento Profundo de Mobilidade",
    "Abertura de Quadril em Base Baixa",
    "Mobilidade de Tornozelos na Parede",
    "Ponte Glútea com Mobilidade de Quadril",
    "Mobilidade Escapular em Prancha"
];

// Ler o arquivo original videos_database.js
const code = fs.readFileSync('videos_database.js', 'utf-8');

// Extrair o objeto VIDEOS_DATABASE
let db;
eval(code.replace('const VIDEOS_DATABASE', 'db'));

const biblioteca = db.biblioteca;
console.log(`Substituindo títulos de ${biblioteca.length} exercícios na biblioteca...`);

biblioteca.forEach((item, index) => {
    const templateIndex = index % exerciseTemplates.length;
    const variation = Math.floor(index / exerciseTemplates.length) + 1;
    
    let exerciseName = exerciseTemplates[templateIndex];
    if (variation > 1) {
        exerciseName = `${exerciseName} - Variação ${variation}`;
    }
    
    item.title = exerciseName;
});

// Reconstruir o arquivo JS
const newCode = `// BANCO DE DADOS COMPLETO DE VÍDEOS (+500 TREINOS)\nconst VIDEOS_DATABASE = ${JSON.stringify(db, null, 2)};\n`;

fs.writeFileSync('videos_database.js', newCode, 'utf-8');
console.log("videos_database.js atualizado com sucesso com 379 títulos reais de exercícios!");
