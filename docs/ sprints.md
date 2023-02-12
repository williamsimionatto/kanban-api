# Feature: Gerenciamento de Sprints 🔄

```
Como Gerente de Projeto
Eu quero gerenciar meus sprints de maneira eficiente 
Para acompanhar o progresso do meu time.
```

## Cadastro de Sprints 🔄
### ✅ Caso de Sucesso
* Dado que eu recebo uma requisição em **POST** para **/api/sprints**
* Valida os campos obrigatórios **name**, **objective**, **startDate**, **endDate**, **projectId**
* Valida se o **projectId** existe
* Valida se a **startDate** é menor que a **endDate**
* Cria um sprint
* Retorna **204**, sem conteúdo

### ❌ Exceções
* Retorna erro **404** se a API não existir
* Retorna erro **400** se **name**, **objective**, **startDate**, **endDate**, **projectId** não forem válidos
* Retorna erro **500** se ocorrer um erro no servidor

## Listar Sprints de um projeto 🔄
### ✅ Caso de Sucesso
* Dado que eu recebo uma requisição em **GET** para **/api/projects/{projectId}/sprints**
* Valida os campos obrigatórios **projectId**
* Valida se o **projectId** existe
* Retorna **200** com os dados dos sprints e um percentual de progresso

### ❌ Exceções
* Retorna erro **404** se a API não existir
* Retorna erro **400** se **projectId** não for válido
* Retorna erro **500** se ocorrer um erro no servidor

## Listar Detalhes de um sprint 🔄
### ✅ Caso de Sucesso
* Dado que eu recebo uma requisição **GET** para **/api/sprints/{sprintId}**
* Verifica se o **sprintId** existe
* Retorna **200** com os dados do sprint

### ❌ Exceções
* Retorna erro **404** se a API não existir 
* Retorna erro **400** se **sprintId** não for válido
* Retorna erro **500** se ocorrer um erro no servidor

## Adicionar tarefas a um sprint 🔄
### ✅ Caso de Sucesso
* Dado que eu recebo uma requisição **POST** para **/api/sprints/{sprintId}/task**
* Valida os campos obrigatórios **sprintId**, **phaseId**,  **description**, **estimatedTime**, **priority**, **status**
* Valida os campos opcionais **assigneeId**
* Valida se o **sprintId** existe
* Valida se o **assigneeId** existe, se existir
* Valida se o **status** é válido
* Cria uma tarefa
* Retorna **204**, sem conteúdo

### ❌ Exceções
* Retorna erro **404** se a API não existir
* Retorna erro **400** se **sprintId**, **description**, **estimatedTime**, **priority**, **status** não forem válidos
* Retorna erro **500** se ocorrer um erro no servidor

## Listar tarefas de um sprint 🔄
### ✅ Caso de Sucesso
* Dado que eu recebo uma requisição **GET** para **/api/sprints/{sprintId}/task**
* Valida os campos obrigatórios **sprintId**
* Valida se o **sprintId** existe
* Retorna **200** com os dados das tarefas agrupados por fase e ordenados por prioridade

### ❌ Exceções
* Retorna erro **404** se a API não existir
* Retorna erro **400** se **sprintId** não for válido
* Retorna erro **500** se ocorrer um erro no servidor

## Listar detalhes de uma tarefa 🔄
### ✅ Caso de Sucesso
* Dado que eu recebo uma requisição **GET** para **/api/sprints/{sprintId}/task/{taskId}**
* Valida os campos obrigatórios **taskId**
* Valida se o **taskId** existe
* Retorna **200** com os dados da tarefa

### ❌ Exceções
* Retorna erro **404** se a API não existir
* Retorna erro **400** se **taskId** não for válido
* Retorna erro **500** se ocorrer um erro no servidor

## Editar dependências de uma tarefa 🔄
### ✅ Caso de Sucesso
* Dado que eu recebo uma requisição **PUT** para **/api/sprints/{sprintId}/task/{taskId}/dependencies**
* Valida os campos obrigatórios **taskId**, **dependecyTask**, **dependencyType**
* Valida se o **taskId** existe
* Valida se as **dependecyTask** existem
* Valida se o **dependencyType** é válido, entre os valores **before**, **after**
* Edita as dependências da tarefa
* Retorna **204**, sem conteúdo

### ❌ Exceções
* Retorna erro **404** se a API não existir
* Retorna erro **400** se **taskId**, **dependecyTask**, **dependencyType** não forem válidos
* Retorna erro **500** se ocorrer um erro no servidor

## Mover uma tarefa para outra fase 🔄
### ✅ Caso de Sucesso
* Dado que eu recebo uma requisição **PUT** para **/api/sprints/{sprintId}/task/{taskId}/phase/{nextPhaseId}**
* Valida os campos obrigatórios **taskId**, **phaseId**
* Valida se o **taskId** existe
* Valida se o **phaseId** existe
* Verifica se a tarefa antecessora esta pelo menos na fase de **REVIEW**
* Move a tarefa para a fase
* Retorna **204**, sem conteúdo

### ❌ Exceções
* Retorna erro **404** se a API não existir
* Retorna erro **400** se **taskId**, **phaseId** não forem válidos
* Retorna erro **500** se ocorrer um erro no servidor

## Editar uma tarefa 🔄
### ✅ Caso de Sucesso
* Dado que eu recebo uma requisição **PUT** para **/api/sprints/{sprintId}/task/{taskId}**
* Valida os campos obrigatórios **taskId**, **phaseId**,  **description**, **estimatedTime**, **priority**, **status**
* Valida os campos opcionais **assigneeId**
* Valida se o **taskId** existe
* Valida se o **assigneeId** existe, se existir
* Valida se o **status** é válido
* Edita uma tarefa
* Retorna **204**, sem conteúdo

### ❌ Exceções
* Retorna erro **404** se a API não existir
* Retorna erro **400** se **taskId**, **description**, **estimatedTime**, **priority**, **status** não forem válidos
* Retorna erro **500** se ocorrer um erro no servidor

## Atribuir uma tarefa a um membro 🔄
### ✅ Caso de Sucesso
* Dado que eu recebo uma requisição **PUT** para **/api/sprints/{sprintId}/task/{taskId}/assignee/{assigneeId}**
* Valida os campos obrigatórios **taskId**, **assigneeId**
* Valida se o **taskId** existe
* Valida se o **assigneeId** existe
* Atribui a tarefa ao membro
* Retorna **204**, sem conteúdo

### ❌ Exceções
* Retorna erro **404** se a API não existir
* Retorna erro **400** se **taskId**, **assigneeId** não forem válidos
* Retorna erro **500** se ocorrer um erro no servidor

