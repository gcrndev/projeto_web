// ==========================================================================================================
// Ficheiro: js/main.js
// Objetivo: dar interatividade ao site estático, explicando cada passo para quem está a começar a programar.
// Linguagem simples: pense que este ficheiro é o “motorzinho” que move pequenas partes do site.
// ==========================================================================================================

// Esta linha diz: “espera todo o HTML carregar antes de começar a brincar com os elementos”.
document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------------------------------------------
  // 1) Guardamos atalhos (variáveis) para elementos que vamos usar.
  //    Assim não precisamos procurá-los várias vezes.
  // ------------------------------------------------------------------
  const mobileToggle = document.querySelector("[data-nav-toggle]"); // Botão hambúrguer (abre/fecha menu no mobile)
  const mobileToggleText = mobileToggle?.querySelector("[data-toggle-text]"); // Texto escondido dentro do botão
  const mobileMenu = document.getElementById("mobile-menu"); // A lista do menu que aparece no mobile
  const backToTop = document.getElementById("scrollTopBtn"); // Botão flutuante de “voltar ao topo”
  const currentPage = document.body.dataset.page; // Nome da página atual (vem do atributo data-page do <body>)

  // ------------------------------------------------------------------
  // 2) Destacar no menu qual página está ativa.
  //    Imagine um marcador que diz: “Você está aqui”.
  // ------------------------------------------------------------------
  const navLinks = document.querySelectorAll("[data-nav-link]"); // Todos os links do menu
  navLinks.forEach((link) => {
    // Se o identificador do link for igual ao identificador da página atual...
    if (link.dataset.page === currentPage) {
      link.classList.add("active"); // ... adicionamos a classe que realça o link
      link.setAttribute("aria-current", "page"); // ... e avisamos leitores de ecrã qual é a página corrente
    }
    // Quando clicamos em qualquer link do menu no mobile, fechamos o menu para liberar a visão.
    link.addEventListener("click", () => {
      if (mobileMenu) {
        mobileMenu.classList.remove("is-open"); // esconde o menu
        if (mobileToggle) {
          mobileToggle.setAttribute("aria-expanded", "false"); // diz que o menu está fechado
          // Troca o ícone de “X” de volta para o ícone de “três linhas”
          mobileToggle.querySelector("i")?.classList.add("bi-list");
          mobileToggle.querySelector("i")?.classList.remove("bi-x-lg");
        }
      }
    });
  });

  // ------------------------------------------------------------------
  // 3) Controlar o botão hambúrguer (abrir/fechar menu no telemóvel).
  //    Pense numa porta de armário: um clique abre, outro fecha.
  // ------------------------------------------------------------------
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("is-open"); // alterna mostrar/esconder
      mobileToggle.setAttribute("aria-expanded", String(isOpen)); // atualiza estado para acessibilidade
      mobileToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu"); // texto falado por leitores de ecrã
      if (mobileToggleText) {
        mobileToggleText.textContent = isOpen ? "Fechar menu" : "Abrir menu"; // texto visível apenas para acessibilidade
      }
      // Troca o ícone entre “três linhas” (menu fechado) e “X” (menu aberto)
      mobileToggle.querySelector("i")?.classList.toggle("bi-list", !isOpen);
      mobileToggle.querySelector("i")?.classList.toggle("bi-x-lg", isOpen);
    });
    // Estado inicial: menu fechado e texto “Abrir menu”
    mobileToggle.setAttribute("aria-label", "Abrir menu");
    if (mobileToggleText) {
      mobileToggleText.textContent = "Abrir menu";
    }
  }

  // ------------------------------------------------------------------
  // 4) Botão “voltar ao topo”.
  //    Só aparece depois de rolarmos 400px; um clique sobe a página suavemente.
  // ------------------------------------------------------------------
  const toggleBackToTop = () => {
    if (!backToTop) return; // se não há botão no HTML, saímos
    if (window.scrollY > 400) {
      backToTop.classList.add("show"); // mostra o botão
    } else {
      backToTop.classList.remove("show"); // esconde o botão
    }
  };

  window.addEventListener("scroll", toggleBackToTop); // sempre que rolamos, verificamos se devemos mostrar/esconder
  toggleBackToTop(); // chamamos uma vez ao carregar a página, para estado inicial correto

  backToTop?.addEventListener("click", () => {
    // Rola suavemente até o topo; behavior: "smooth" faz a animação
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ------------------------------------------------------------------
  // 4.1) Ano corrente e aviso de privacidade (JS separado do HTML).
  // ------------------------------------------------------------------
  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  const privacyMessage = "Política de Privacidade - Este é um projeto ficcional para fins académicos.";
  document.querySelectorAll("[data-privacy-trigger]").forEach((button) => {
    button.addEventListener("click", () => {
      alert(privacyMessage);
    });
  });

  // ------------------------------------------------------------------
  // 5) Validação do formulário de contacto.
  //    Só corre na página de contactos, onde o formulário existe.
  // ------------------------------------------------------------------
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    // Guardamos cada campo para usar facilmente
    const fields = {
      nome: contactForm.querySelector("#nome"),
      email: contactForm.querySelector("#email"),
      assunto: contactForm.querySelector("#assunto"),
      mensagem: contactForm.querySelector("#mensagem"),
    };
    const submitBtn = contactForm.querySelector("[data-submit]"); // botão “Enviar mensagem”
    const spinner = contactForm.querySelector("[data-spinner]"); // ícone de carregamento
    const successAlert = document.getElementById("form-success"); // mensagem verde de sucesso
    const errorContainers = contactForm.querySelectorAll("[data-error]"); // blocos onde as mensagens de erro aparecem

    // Função que mostra um erro num campo específico
    const setError = (field, message) => {
      const input = fields[field];
      const errorEl = contactForm.querySelector(`[data-error="${field}"]`);
      if (input) {
        input.classList.add("is-invalid"); // pinta a borda de vermelho
      }
      if (errorEl) {
        errorEl.classList.remove("d-none"); // revela a mensagem de erro
        errorEl.querySelector("[data-error-text]").textContent = message; // coloca o texto do erro
      }
    };

    // Função que limpa o erro quando o utilizador começa a corrigir
    const clearError = (field) => {
      const input = fields[field];
      const errorEl = contactForm.querySelector(`[data-error="${field}"]`);
      if (input) {
        input.classList.remove("is-invalid"); // remove borda vermelha
      }
      if (errorEl) {
        errorEl.classList.add("d-none"); // esconde a mensagem
        errorEl.querySelector("[data-error-text]").textContent = ""; // limpa o texto
      }
    };

    // Sempre que o utilizador digita em qualquer campo, limpamos o erro desse campo
    Object.values(fields).forEach((input) => {
      if (!input) return;
      input.addEventListener("input", () => clearError(input.name));
    });

    // Verifica se um email tem o formato “texto@texto.dominio”
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Faz todas as verificações e devolve true (tudo ok) ou false (tem erros)
    const validate = () => {
      // Esconde todos os erros antes de validar de novo
      errorContainers.forEach((error) => {
        error.classList.add("d-none");
      });

      let valid = true; // começamos assumindo que está tudo certo

      // Nome não pode ficar vazio
      if (!fields.nome.value.trim()) {
        valid = false;
        setError("nome", "Por favor, introduza o seu nome.");
      }
      // Email não pode ficar vazio e precisa ser válido
      if (!fields.email.value.trim()) {
        valid = false;
        setError("email", "Por favor, introduza o seu email.");
      } else if (!validateEmail(fields.email.value.trim())) {
        valid = false;
        setError("email", "Por favor, introduza um email válido.");
      }
      // Assunto não pode ficar vazio
      if (!fields.assunto.value.trim()) {
        valid = false;
        setError("assunto", "Por favor, introduza um assunto.");
      }
      // Mensagem não pode ficar vazia
      if (!fields.mensagem.value.trim()) {
        valid = false;
        setError("mensagem", "Por favor, escreva a sua mensagem.");
      }

      return valid; // devolve o resultado final
    };

    // Quando clicamos em “Enviar”
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault(); // impede o envio real (não há backend)
      if (!validate()) return; // se falhar validação, paramos aqui

      submitBtn.disabled = true; // desativa o botão para evitar cliques repetidos
      spinner?.classList.remove("d-none"); // mostra ícone de carregamento

      // Simulamos um atraso de envio (1,5 segundos) para dar feedback ao utilizador
      setTimeout(() => {
        submitBtn.disabled = false; // reativa o botão
        spinner?.classList.add("d-none"); // esconde o ícone
        contactForm.reset(); // limpa todos os campos
        if (successAlert) {
          successAlert.classList.remove("d-none"); // mostra a mensagem de sucesso
          successAlert.focus(); // move o foco para acessibilidade
          // esconde a mensagem depois de 5 segundos
          setTimeout(() => successAlert.classList.add("d-none"), 5000);
        }
      }, 1500);
    });
  }
});
