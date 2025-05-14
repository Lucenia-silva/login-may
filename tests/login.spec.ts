import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import 'dotenv/config';

test('Deve logar com sucesso .env', async ({ page }) => {
  const loginPage: LoginPage = new LoginPage(page)


 await loginPage.go()

  await loginPage.sigIn(process.env.user_login!, process.env.user_password!)

  await loginPage.userLoggedIn()
});



//Validando com Senha errada


test('Senha incorreta - deve exibir erro e permanecer na tela de login .env', async ({ page }) => {

  const loginPage: LoginPage = new LoginPage(page)
  await loginPage.go()
  await loginPage.sigIn(process.env.user_login!, '12345')

  //validar o toaster

await loginPage.errorMessage()


});



