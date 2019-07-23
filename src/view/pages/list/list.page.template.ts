export function getListPageTemplate(state: any): string {
    return `
        <div class="list">
            <div class="list__filter-bar filter-bar"></div>
            <div class="list__body-wrapper">
                <div class="list__body">
                    <div class="list__loader"> Новостей пока нет. Скоро появятся!</div>
                </div>
            </div>
        </div>
    `;
}