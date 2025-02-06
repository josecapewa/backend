# IPIL-BACK

## Descrição do Projeto
O projeto **IPIL-BACK** é uma plataforma de backend desenvolvida para gerenciar informações relacionadas a um sistema educacional. Ele utiliza o **Prisma** como ORM para interagir com o banco de dados, **Fastify** como framework web e **Zod** para validação de dados. O sistema é projetado para ser escalável e modular, permitindo fácil manutenção e adição de novas funcionalidades.

---

## Funcionalidades
- **Gerenciamento de Usuários:** Criação, atualização, exclusão e autenticação de usuários.
- **Gerenciamento de Alunos:** Cadastro e gerenciamento de informações dos alunos, incluindo dados pessoais e turmas.
- **Gerenciamento de Turmas:** Criação e gerenciamento de turmas, incluindo a associação de alunos e professores.
- **Gerenciamento de Cursos:** Cadastro e gerenciamento de cursos e suas respectivas disciplinas.
- **Importação de Dados:** Funcionalidade para importar dados de alunos e professores a partir de arquivos Excel e CSV.
- **Relatórios:** Geração de relatórios sobre o desempenho e status dos alunos e turmas.
- **Autenticação e Autorização:** Sistema de autenticação e autorização para garantir que apenas usuários autorizados tenham acesso às funcionalidades do sistema.

- (**Ainda há funcionalidades que não foram descritas aqui**)

---

## Tecnologias Utilizadas
- **Node.js:** Ambiente de execução para JavaScript no lado do servidor.
- **Fastify:** Framework web para construir APIs de alta performance.
- **Prisma:** ORM para interagir com o banco de dados.
- **Zod:** Biblioteca para validação de esquemas de dados.
- **XLSX:** Biblioteca para manipulação de arquivos Excel.
- **CSV-Parser:** Biblioteca para leitura de arquivos CSV.

---

## Estrutura do Projeto
```plaintext
prisma/                        # Configuração do Prisma
src/
├── modules/
│   ├── errors/                # Tratamento de erros
|   ├── lib/                   # Bibliotecas auxiliares
│   ├── models/                # Modelos de dados
│   ├── services/              # Lógica de negócios
│   ├── templates/             # Templates para mensagens
│   ├── types/                 # Tipos TypeScript
│   └── validations/           # Validações de dados
└── server/                    # Configuração do servidor
    └── routes/                # Rotas da API
        ├── private/           # Rotas privadas
        └── public/            # Rotas públicas
uploads/                       # Arquivos de upload

```
## Como executar o projeto
Clone o repositório:

1. Copiar código

    ``` bash
    git clone https://github.com/seu_usuario/IPIL-BACK.git
    cd IPIL-BACK
    ```

2. Instale as dependências:
    ``` bash
    npm install
    ```

3. Configure as variáveis de ambiente:

    Crie um arquivo ``.env`` na raiz do projeto e adicione as variáveis necessárias, como ``DATABASE_URL``, ``JWT_SECRET``, ``COOKIE_SECRET``, etc.

4. Execute as migrações do Prisma:
    ```bash
    Copiar código
    npx prisma migrate dev
    ```

5. Inicie o servidor:

    ```bash
    npm run dev
    ```