<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pedido de Açaí</title>
  <style>
    .hidden {
      display: none;
    }
    .checkbox-wrapper-12 {
      display: flex;
      align-items: center;
    }
  </style>
</head>
<body>
  <form id="pedido-form">
    <label for="tamanho">Escolha o tamanho:</label>
    <select id="tamanho" required>
      <option value="">Selecione</option>
      <option value="380ML">380ML</option>
      <option value="500ML">500ML</option>
    </select>

    <div id="adicionais-container" class="hidden"></div>

    <div id="cobertura-container" class="hidden">
      <h3>Escolha uma cobertura</h3>
      <label><input type="radio" name="cobertura" value="Leite Condensado" /> Leite Condensado</label><br>
      <label><input type="radio" name="cobertura" value="Mel" /> Mel</label><br>
      <label><input type="radio" name="cobertura" value="Calda de Chocolate" /> Calda de Chocolate</label><br>
    </div>

    <button type="submit">Fazer Pedido</button>
  </form>

  <script>
    const adicionais = ["Banana", "Morango", "Leite Ninho", "Paçoca", "Granola", "Chocolate", "Coco", "Nutella", "Oreo"];

    const tamanhoSelect = document.getElementById('tamanho');
    const adicionaisContainer = document.getElementById('adicionais-container');
    const coberturaContainer = document.getElementById('cobertura-container');
    const form = document.getElementById('pedido-form');

    tamanhoSelect.addEventListener('change', () => {
      adicionaisContainer.classList.remove('hidden');
      coberturaContainer.classList.remove('hidden');

      const maxAdicionais = tamanhoSelect.value === "380ML" ? 3 : 5;

      // Limpa e gera os checkboxes estilizados
      adicionaisContainer.innerHTML = `<h3>Escolha até ${maxAdicionais} adicionais</h3>`;
      adicionais.forEach((item, index) => {
        const id = `adicional-${index}`;
        adicionaisContainer.innerHTML += `
          <div class="checkbox-wrapper-12">
            <div class="cbx">
              <input id="${id}" type="checkbox" value="${item}" onchange="limitarAdicionais(${maxAdicionais})">
              <label for="${id}"></label>
              <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                <path d="M2 8.36364L6.23077 12L13 2"></path>
              </svg>
            </div>
            <label for="${id}">${item}</label>
          </div>
        `;
      });
    });

    window.limitarAdicionais = function (limite) {
      const checkboxes = document.querySelectorAll('#adicionais-container input[type="checkbox"]');
      const selecionados = Array.from(checkboxes).filter(c => c.checked);
      if (selecionados.length > limite) {
        selecionados[selecionados.length - 1].checked = false;
        alert(`Você pode escolher até ${limite} adicionais.`);
      }
    };

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
  </script>
</body>
</html>
