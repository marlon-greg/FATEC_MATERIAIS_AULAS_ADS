# 🎓 Portal de Matérias - FATEC Indaiatuba (ADS)

Repositório criado para organizar e disponibilizar o material de apoio, slides e roteiros das aulas do curso de Análise e Desenvolvimento de Sistemas (ADS).

## 📁 Estrutura do Projeto (Clean Architecture)
Para facilitar a manutenção, o projeto utiliza recursos compartilhados:
- `/assets/css/`: Folhas de estilo compartilhadas (o design de todas as aulas puxa daqui).
- `/assets/js/`: Scripts compartilhados (o motor que passa os slides fica aqui).

**Hierarquia Acadêmica:**
- `index.html`: Portal principal separado por semestres (1º ao 6º).
- `/[1-6]-semestre/[nome-da-materia]/`: Pasta de cada disciplina.
  - `index.html`: Lista de aulas daquela matéria.
  - `aula-*.html`: Apresentações interativas (Slides).

## 🛠️ Como adicionar novas aulas
1. Acesse a pasta do semestre e da matéria desejada.
2. Crie um novo arquivo HTML para a aula (copie a estrutura base de uma aula anterior).
3. Adicione o link dessa nova aula no arquivo `index.html` que fica dentro da pasta da matéria.
4. **Importante:** Sempre mantenha os links do `<head>` apontando corretamente para `../../assets/css/slides.css`.