import { TemplateStateType } from "../../components/component.base";

export function getMainPageHtml(state: TemplateStateType): string {
    return `
        <header class="layout__header"></header>
        <main class="layout__router-outlet"></main>
        <footer class="footer layout__footer">
            <div class="footer__about">
                <div class="footer__title">SPA</div>
                <div>TypeScript + RxJS + SASS + BEM + Webpack</div>
            </div>
            <div class="author-logo">
                <div class="author-logo__title">
                    Made by Arseniy Sokolov
                </div>
                <div class="author-logo__contacts">
                    <a href="https://github.com/arseniyasokolov">GitHub</a>
                    <div>arseniy.a.sokolov@gmail.com</div>
                </div>
            </div>
        </footer>
    `;
}