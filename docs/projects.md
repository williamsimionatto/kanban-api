## Feature: Cadastro de projetos

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

## Feature: Adicionar membros a um projeto

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

## Feature: Listar projetos de uma organização

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