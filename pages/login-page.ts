import { Page, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page
    constructor(page: Page) {
        this.page = page
    }

    async go() {

        //Vai para a página de login
        if (!process.env.BASE_URL) throw new Error('BASE_URL não definida');

        const response = await this.page.goto(process.env.BASE_URL, {
            waitUntil: 'domcontentloaded',
            timeout: 20000
        });

        if (!response || !response.ok()) {
            throw new Error(`Erro ao acessar ${process.env.BASE_URL}: status ${response?.status()}`);
        }
        const title = this.page.locator('.text-center h1');
        await expect(title).toHaveText('Iniciar Sessão');
    }

    async sigIn(user: string, passwor: string) {
        //Submeter o formulário
        await this.page.fill('input[id=user_login]', process.env.user_login!)
        await this.page.fill('input[id="user_password"]', process.env.user_password!)
        await this.page.click('button >>text=Entrar')

    }

    async userLoggedIn() {

        const modalMessage = this.page.locator('.toast-message');
        await modalMessage.waitFor({ state: 'visible', timeout: 10000 }); // espera até 10s se necessário
        await expect(this.page.getByText('Login efetuado com sucesso.')).toBeVisible({ timeout: 100000 });
    }
    async errorMessage() {
        // Tenta capturar qualquer mensagem de erro esperada
        const errorMessage = this.page.locator('.alert, .toast-error, text=/senha|conta|tentativa/i');

        await errorMessage.waitFor({ state: 'visible', timeout: 10000 });
        await expect(errorMessage).toBeVisible({ timeout: 10000 });

        // (Opcional) Confirma que não foi redirecionado para dashboard
        await expect(this.page.locator('h1')).not.toHaveText('Tipos de acesso');
    }



}