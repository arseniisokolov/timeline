import { TemplateStateType } from "../component.base";

export function getHeaderTemplate(state: TemplateStateType) {
    return `
        <i class="fas fa-newspaper layout__logo"></i>
        <span class="layout__title">${state.Title}</span>
    `;
}