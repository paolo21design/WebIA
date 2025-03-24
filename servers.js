const express = require('express');
const stripe = require('stripe')('sk_test_51Jl1CqAbCpv9kl3Vh9M1jyF7U9OdIQzMk2cb8Mcp5Pt3bXOoG8Tn6jpn6ZhoExBftEHIfIToBpe8D11tKl3kDcvV00sjIEkqHi');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: 'Génération de site Web IA',
                    },
                    unit_amount: 30000, // Montant en centimes (300€)
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${req.protocol}://${req.get('host')}/success.html`,
        cancel_url: `${req.protocol}://${req.get('host')}/cancel.html`,
    });

    res.json({ id: session.id });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
