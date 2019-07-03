import { TemplateStateType } from "../../components/component.base";

export function getListItemInfoNewsPageTemplate(state: TemplateStateType): string {
    return `
        <div class="item-info">
            <div class="item-info__header">
                <div class="item-info__btn item-info__btn_back"><i class="fas fa-long-arrow-alt-left"></i></div>
                <div class="item-info__btn item-info__btn_accept"><i class="fas fa-check"></i></div>
                <div class="item-info__title"></div>
            </div>
            <div class="item-info__body"></div>
        </div>
`;
}