export function getHeaderTemplate(state: any) {
    return `
        <i class="fas fa-newspaper layout__logo"></i>
        <span class="layout__title">${state.Title}</span>
    `;
}