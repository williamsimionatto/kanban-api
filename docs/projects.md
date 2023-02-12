## Feature: Cadastro de projetos ✅

```
Como um gestor de projetos
Quero poder cadastrar projetos para a minha organização
Para que eu possa acompanhar e gerenciar o andamento dos projetos
```

### ✅ Caso de Sucesso 
* Dado que eu recebo uma requisição em **POST** para **/api/projects**
* Valida os campos obrigatórios **name**, **description**, **startDate**, **status**, **organizationId**
* Se informado o campo **endDate**, valida se é valido
* Validar se a organizationId informada existe
* Cria um projeto
* Retorna **204**, sem conteúdo

### ❌ Exceções
* Retorna erro **404** se a API não existir
* Retorna erro **400** se **name**, **description**, **startDate**, **status**, **organizationId** não forem válidos
* Retorna erro **500** se ocorrer um erro no servidor

## Feature: Adicionar membros a um projeto ✅

```
Como um gestor de projetos
Quero poder adicionar membros a um projeto
Para que o membro possa atuar no projeto
```

### ✅ Caso de Sucesso
* Dado que eu recebo uma requisição em **POST** para **/api/projects/{projectId}/members**
* Valida os campos obrigatórios **projectId**, **memberId**
* Valida se o **projectId** existe
* Valida se o **memberId** existe
* Não permite adicionar um membro que já esteja no projeto
* Adiciona o membro ao projeto
* Retorna **204**, sem conteúdo

### ❌ Exceções
* Retorna erro **404** se a API não existir
* Retorna erro **400** se **projectId**, **memberId** não forem válidos
* Retorna erro **500** se ocorrer um erro no servidor

## Feature: Listar projetos de uma organização ✅

```
Como um gestor de projetos
Quero poder listar os projetos de uma organização
Para que eu possa ver os projetos que estão sendo executados
```

### ✅ Caso de Sucesso
* Dado que eu recebo uma requisição em **GET** para **/api/organizations/{organizationId}/projects**
* Valida os campos obrigatórios **organizationId**
* Valida se o **organizationId** existe
* Retorna **200** com os dados dos projetos
* Retorna **204** se não existir projetos

### ❌ Exceções
* Retorna erro **404** se a API não existir
* Retorna erro **400** se **organizationId** não for válido
* Retorna erro **500** se ocorrer um erro no servidor

## Feature: Listar Detalhes de um projeto ✅
```
 Como um gestor de projetos
 Quero poder listar os detalhes de um projeto e seus respectivos membros
 Para que eu possa editar alguma informação
```

### ✅ Caso de Sucesso
* Dado que eu recebo uma requisição **GET** para **/api/project/{projectdId}**
* Verifica se o **projectId** existe
* Retorna **200** com os dados do projeto e seus respectivos membros
* Retorna **200** com os dados do projeto e um array vazio caso o projeto não tenha membros

### ❌ Exceções
* Retorna erro **404** se a API não existir
* Retorna erro **400** se **projectId** não for válido
* Retorna erro **500** se ocorrer um erro no servidor

## Feature: Editar um projeto ✅
```
 Como um gestor de projetos
 Quero poder editar um projeto
 Para que eu possa atualizar as informações do projeto
```

### ✅ Caso de Sucesso
* Dado que eu recebo uma requisição **PUT** para **/api/project/{projectId}**
* Valida os campos obrigatórios **projectId**, **name**, **description**, **startDate**, **status**, **organizationId**
* Valida se o **projectId** existe
* Valida se o **organizationId** existe
* Atualiza os dados do projeto
* Retorna **204** sem conteúdo

### ❌ Exceções
* Retorna erro **404** se a API não existir
* Retorna erro **400** se **projectId**, **name**, **description**, **startDate**, **status**, **organizationId** não forem válidos
* Retorna erro **400** se o **projectId** ou **organizationId** não existir
* Retorna erro **500** se ocorrer um erro no servidor

## Feature: Ativar/Inativar um membro de um projeto ✅
```
Como um gestor de projetos
Quero poder ativar/inativar um membro de um projeto
Para que ele visualize ou não as informações do projeto
```
### ✅ Caso de Sucesso
* Dado que eu recebo uma requisição **PUT** para **/api/project/{projectId}/member/{memberId}**
* Valida os campos obrigatórios **projectId**, **accountId** e **active** estão informados
* Atualiza os dados do membro do projeto projeto
* Retorna **204** sem conteúdo

### ❌ Exceções
* Retorna erro **404** se a API não existir
* Retorna erro **400** se **projectId**, **accountId** e **active** estão informados  não forem válidos
* Retorna erro **500** se ocorrer um erro no servidor

## Feature: Cadastrar as fases de um projeto 🔄
```
Como um gestor de projetos
Quero poder cadastrar as fases de um projeto
Para que eu possa acompanhar o andamento do projeto
```

### ✅ Caso de Sucesso
* Dado que eu recebo uma requisição **POST** para **/api/project/{projectId}/phases**
* Valida os campos obrigatórios **projectId**, **name**, **description**, **order**, **type**
* Valida se o **projectId** existe
* Valida se o **type** é válido, dentre os tipos **BACKLOG**, **TODO**, **DOING**, **BLOCKED**,**REVIEW**, **DONE**
* Cria a fase do projeto
* Retorna **204** sem conteúdo

### ❌ Exceções
* Retorna erro **404** se a API não existir
* Retorna erro **400** se **projectId**, **name**, **description**, **order** não forem válidos
* Retorna erro **500** se ocorrer um erro no servidor


