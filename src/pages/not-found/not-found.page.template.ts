import { TemplateStateType } from "../../components/component.base";

export function getNotFoundPageTemplate(state: TemplateStateType): string {
	return `
		<div class="not-found">
		<div class="not-found__title">Такой страницы нет. Но ее можно запрограммировать :)</div>  
		</div>
	`;
} 
