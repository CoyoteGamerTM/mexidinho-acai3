const tamanhoSelect = document.getElementById('tamanho');
const adicionaisContainer = document.getElementById('adicionais-container');
const form = document.getElementById('pedido-form');

tamanhoSelect.addEventListener('change', () => {
  adicionaisContainer.classList.remove('hidden');
});

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const tamanho = tamanhoSelect.value;
  const checkboxes = document.querySelectorAll('#adicionais-container input[type="checkbox"]');
  const cobertura = document.querySelector('input[name="cobertura"]:checked');

  const adicionaisSelecionados = [];
  const extrasSelecionados = [];

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const valor = checkbox.value;
      if (["Nutella", "Oreo"].includes(valor)) {
        extrasSelecionados.push(valor);
      } else {
        adicionaisSelecionados.push(valor);
      }
    }
  });

  // Limites
  const limiteAdicionais = tamanho === "380ML" ? 3 : 5;

  if (adicionaisSelecionados.length > limiteAdicionais) {
    alert(`Você pode escolher até ${limiteAdicionais} adicionais para o tamanho ${tamanho}.`);
    return;
  }

  if (!cobertura) {
    alert("Por favor, escolha uma cobertura.");
    return;
  }

  const msg = `
🍧 *Pedido - Mexidinho Açaí* 🍧

📦 Tamanho: ${tamanho}
🥝 Adicionais: ${adicionaisSelecionados.join(", ") || "Nenhum"}
🍫 Extras: ${extrasSelecionados.join(", ") || "Nenhum"}
🎉 Cobertura: ${cobertura.value}
  `;

  const link = `https://wa.me/5527992847308?text=${encodeURIComponent(msg)}`;
  window.open(link, "_blank");
});
