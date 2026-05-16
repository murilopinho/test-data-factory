# Architecture & Technical Decisions

## Site Testado: Sauce Demo

Escolhi o [Sauce Demo](https://www.saucedemo.com) porque:
- Site público feito especificamente para praticar automação
- Tem fluxo completo: login → catálogo → carrinho → checkout
- Vários tipos de usuários (normal, bloqueado, com glitch de performance)
- Atributos `data-test` nos elementos (boa prática de testabilidade)

## Padrão: Page Object Model

Cada página tem seu próprio arquivo em `cypress/support/page-objects/`:
- **LoginPage** — encapsula seletores e ações de login/logout
- **ProductsPage** — encapsula catálogo, sorting, add-to-cart
- **CartPage** — encapsula visualização e remoção de itens

**Por que POM?** Seletores ficam em um lugar só. Se o Sauce Demo mudar `data-test="username"` pra `data-test="user-input"`, eu atualizo só no `LoginPage.js`, não em 8 arquivos de teste.

## Custom Commands

Comandos reutilizáveis em `cypress/support/commands.js`:
- `cy.login(user, pass)` — login genérico
- `cy.loginAsStandardUser()` — atalho para o usuário padrão
- `cy.addProductToCart(name)` — adiciona produto pelo nome

## Estrutura de Testes

```
cypress/e2e/
├── auth/       # Login e logout
├── products/   # Catálogo e ordenação
└── cart/       # Carrinho e checkout
```

## Fixtures

Dados de teste em `cypress/fixtures/`:
- `users.json` — credenciais dos usuários de teste
- `products.json` — nomes dos produtos

## CI/CD

GitHub Actions usa a action oficial do Cypress (`cypress-io/github-action@v6`) que gerencia cache do Cypress automaticamente. Só faz upload de screenshots quando há falha.
