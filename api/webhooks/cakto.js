const SUPABASE_URL = "https://yizccvmpfuwccvxcbgwa.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpemNjdm1wZnV3Y2N2eGNiZ3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2MTQxMjUsImV4cCI6MjEwMTE5MDEyNX0.3NB4O7UYuEnTmCnCVRuuauADYRPN8Fc6aSFsS3p4efs";

export default async function handler(req, res) {
    // Permitir apenas requisições POST enviadas pela Cakto
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método não permitido. Use POST.' });
    }

    try {
        const body = req.body || {};

        // Extrair e-mail da Cakto (suporta diferentes formatos de payload)
        const email = (
            body.customer?.email ||
            body.email ||
            body.buyer_email ||
            body.data?.customer?.email ||
            ""
        ).trim().toLowerCase();

        if (!email) {
            return res.status(400).json({ error: 'Nenhum e-mail encontrado no payload do webhook.' });
        }

        // Identificar se é Aprovação de Compra ou Reembolso/Chargeback
        const eventOrStatus = (body.status || body.event || body.type || "").toLowerCase();

        let statusAluno = 'ativo';
        if (
            eventOrStatus.includes('refund') ||
            eventOrStatus.includes('reembolso') ||
            eventOrStatus.includes('chargeback') ||
            eventOrStatus.includes('cancel')
        ) {
            statusAluno = 'reembolsado';
        }

        // Fazer o Upsert diretamente na API REST do Supabase (sem depender de npm install)
        const supabaseEndpoint = `${SUPABASE_URL}/rest/v1/treino_alunos`;
        const response = await fetch(supabaseEndpoint, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'resolution=merge-duplicates' // Insere ou atualiza o status se o e-mail já existir
            },
            body: JSON.stringify({
                email: email,
                status: statusAluno
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Erro ao salvar no Supabase:', errorText);
            return res.status(500).json({ error: 'Erro ao registrar no Supabase', details: errorText });
        }

        return res.status(200).json({
            success: true,
            message: `Aluno ${email} atualizado para status '${statusAluno}' com sucesso!`,
            email: email,
            status: statusAluno
        });

    } catch (err) {
        console.error('Erro no processamento do Webhook da Cakto:', err);
        return res.status(500).json({ error: 'Erro interno ao processar webhook.', details: err.message });
    }
}
