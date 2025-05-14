let preco = tamanho === "380ML" ? 12 : 16;

const msg = `
🍧 *Pedido - Mexidinho Açaí* 🍧

📦 Tamanho: ${tamanho} - R$${preco},00
🥝 Adicionais: ${adicionaisSelecionados.join(", ") || "Nenhum"}
🍫 Extras: ${extrasSelecionados.join(", ") || "Nenhum"}
🎉 Cobertura: ${cobertura.value}
`;
