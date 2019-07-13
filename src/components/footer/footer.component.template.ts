export function getFooterTemplate(state: any) {
    return `
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
    `;
}