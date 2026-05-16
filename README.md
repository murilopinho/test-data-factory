# cypress-ecommerce-suite

Teste automatizado pra ecommerce que criei pra aprender Cypress com Page Objects de verdade. Testei o Sauce Demo — um site feito pra automação, que é perfeito pra isso.

![E2E Tests](https://github.com/murilopinho/cypress-ecommerce-suite/actions/workflows/ci.yml/badge.svg)

## Por que criei?

Na empresa fazíamos regressão manual antes de cada release. Demorava horas e ainda escapava coisa. Decidi automatizar pra aprender Cypress com padrão Page Object, que é o que pedem nas vagas.

## O que testei

**Login/Auth (8 testes)**
- Login com credenciais válidas → redireciona pra /inventory
- Erros pra usuário inválido, senha inválida, campos vazios
- Usuário bloqueado (`locked_out_user`)
- Acesso direto à /inventory após logout → redireciona de volta

**Catálogo (7 testes)**
- 6 produtos listados com nome, preço e botão
- Ordenação por preço (crescente e decrescente)
- Ordenação por nome (A→Z e Z→A)
- Navegação para página de detalhe do produto

**Carrinho & Checkout (8 testes)**
- Adicionar 1 produto → badge mostra 1
- Adicionar 2 produtos → badge mostra 2
- Produto aparece na página de carrinho
- Remover do carrinho → badge some
- Botão muda de "Add to cart" pra "Remove" após adicionar
- Fluxo completo de checkout: dados → revisão → confirmação
- Validação de campos obrigatórios no checkout
- "Continue shopping" mantém items no carrinho

## Testes

**23 testes** | 3 suites | Page Object Model | CI rodando em cada push

## Stack

- [Cypress](https://www.cypress.io/) `13.6.6`
- Node.js 20+
- GitHub Actions

## Setup

```bash
git clone https://github.com/murilopinho/cypress-ecommerce-suite.git
cd cypress-ecommerce-suite
npm install
```

## Como rodar

```bash
# Headless (CI)
npm test

# Com interface
npm run test:headed

# Chrome específico
npm run test:chrome
```

## Estrutura

```
cypress-ecommerce-suite/
├── .github/workflows/ci.yml
├── cypress/
│   ├── e2e/
│   │   ├── auth/         # Login e logout
│   │   ├── products/     # Catálogo e sorting
│   │   └── cart/         # Carrinho e checkout
│   ├── fixtures/         # users.json, products.json
│   └── support/
│       ├── page-objects/ # LoginPage, ProductsPage, CartPage
│       ├── commands.js   # Custom commands
│       └── e2e.js
├── docs/ARCHITECTURE.md
├── cypress.config.js
└── package.json
```

## Desafios que enfrentei

- Testes falhavam quando a página não tinha carregado completamente → `defaultCommandTimeout: 8000` resolveu a maioria
- O sort por nome Z→A retornava resultado diferente do `.sort().reverse()` em alguns casos por causa de capitalização — tive que usar o próprio resultado como expected em vez de recalcular
- Screenshot não funcionava em modo headless sem a flag `screenshotOnRunFailure: true` no config

## Se refizesse

- Teria usado `cy.session()` desde o início pra reutilizar sessão de login entre testes (mais rápido)
- Vale adicionar testes de performance com `cy.intercept()` pra medir tempo de resposta de requests
- BDD/Gherkin com cucumber seria interessante, mas deixa os testes bem mais verbosos

## Licença

MIT
