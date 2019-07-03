import { TemplateStateType } from "../../components/component.base";

export function getMainPageHtml(state: TemplateStateType): string {
    return `
        <header class="layout__header"></header>
        <main class="layout__router-outlet"></main>
        <footer class="footer layout__footer"></footer>
    `;
}