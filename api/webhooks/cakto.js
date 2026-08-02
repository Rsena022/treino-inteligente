const SUPABASE_URL = "https://yizccvmpfuwccvxcbgwa.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpemNjdm1wZnV3Y2N2eGNiZ3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2MTQxMjUsImV4cCI6MjEwMTE5MDEyNX0.3NB4O7UYuEnTmCnCVRuuauADYRPN8Fc6aSFsS3p4efs";

export default async function handler(req, res) {
    // Configurar cabeçalhos CORS para aceitar requisições de qualquer origem da Cakto
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Responder 200 OK para requisições de teste e preflight OPTIONS
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        let body = req.body || {};

        // Tratar caso o body venha como string JSON
        if (typeof body === 'string') {
            try {
                body = JSON.parse(body);
            } catch (e) {
                console.log("Aviso ao fazer parse do JSON do body:", e);
            }
        }

        // 1. Tenta extrair o e-mail pelos caminhos conhecidos do payload da Cakto
        let email = (
            body.customer?.email ||
            body.buyer?.email ||
            body.payer?.email ||
            body.client?.email ||
            body.data?.customer?.email ||
            body.data?.buyer?.email ||
            body.data?.payer?.email ||
            body.data?.client?.email ||
            body.email ||
            body.buyer_email ||
            body.customer_email ||
            body.data?.email ||
            body.payload?.email ||
            body.payload?.customer?.email ||
            ""
        ).trim().toLowerCase();

        // 2. Se não encontrou nos campos padrões, varre o JSON completo via Regex
        if (!email) {
            const bodyStr = JSON.stringify(body);
            const emailMatch = bodyStr.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
            if (emailMatch && emailMatch[0]) {
                email = emailMatch[0].toLowerCase();
            }
        }

        // 3. Se for um teste de conexão da Cakto sem e-mail, atribui o e-mail de teste padrão
        if (!email) {
            email = "alunoteste_cakto@gmail.com";
        }

        // Identificar se é Aprovação de Compra ou Reembolso/Chargeback
        const eventOrStatus = (
            body.status ||
            body.event ||
            body.type ||
            body.data?.status ||
            body.data?.event ||
            ""
        ).toLowerCase();

        let statusAluno = 'ativo';
        if (
            eventOrStatus.includes('refund') ||
            eventOrStatus.includes('reembolso') ||
            eventOrStatus.includes('chargeback') ||
            eventOrStatus.includes('cancel') ||
            eventOrStatus.includes('recusad')
        ) {
            statusAluno = 'reembolsado';
        }

        // Fazer o Upsert diretamente na API REST do Supabase
        const supabaseEndpoint = `${SUPABASE_URL}/rest/v1/treino_alunos`;
        const response = await fetch(supabaseEndpoint, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'resolution=merge-duplicates'
            },
            body: JSON.stringify({
                email: email,
                status: statusAluno
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Erro ao salvar no Supabase:', errorText);
            return res.status(200).json({
                success: true,
                warning: 'Webhook recebido com sucesso. Aviso no banco.',
                details: errorText
            });
        }

        return res.status(200).json({
            success: true,
            message: `Aluno ${email} atualizado para status '${statusAluno}' com sucesso!`,
            email: email,
            status: statusAluno
        });

    } catch (err) {
        console.error('Erro no processamento do Webhook da Cakto:', err);
        return res.status(200).json({
            success: true,
            warning: 'Webhook processado.',
            error: err.message
        });
    }
}
