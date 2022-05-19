export const bodyNovaConta = (nome: string, email: string): string => {
  return `
           <body>
                <h1>Conta criada com sucesso.</h1>
                <label>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate corporis facere laboriosam fuga sit tempora nobis perspiciatis, fugit sint error omnis, aliquid ex, aliquam quisquam neque esse quam. At, voluptatem.
                </label>
                <p>${nome}</p>
                <label>Sua conta foi criada com sucesso.</label>
                <label>${email}</label>
          </body>
          `;
};
