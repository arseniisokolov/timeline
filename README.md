# timeline
Лента оповещений

## Как запустить:
- npm i
- npm run dev
- для сборки npm run build

## Как добавить еще один тип оповещений (на примере Запроса перевода):
для этого нужно объявить новый тип оповещения, унаследовать модель от базовой модели оповещения, добавить разметку и стили для вывода в HTML.
- в файле <a href="https://github.com/arseniyasokolov/timeline/blob/master/src/app/data/base/timeline-doc-types.enum.ts">timeline-doc-types.enum</a> дополнить енам, дописав в него новый тип оповещения - запрос перевода;
- создать модель для запроса перевода в папке <a href="https://github.com/arseniyasokolov/timeline/tree/master/src/app/data/models">models</a>. Ее необходимо унаследовать от базовой <a href="https://github.com/arseniyasokolov/timeline/blob/master/src/app/data/base/timeline-event.model.ts">TimelineEventModel</a>. Вместе с моделью создать и интерфейс данных, его также нужно унаследовать от базового <a href="https://github.com/arseniyasokolov/timeline/blob/master/src/app/data/base/timeline-event.model.ts">ITimelineEvent</a>;
- в файле <a href="https://github.com/arseniyasokolov/timeline/blob/master/src/app/data/base/timeline-model-fabric.ts">timeline-model-fabric</a> добавить кейс: связать новый тип c новой моделью оповещения;
- в файле <a href="https://github.com/arseniyasokolov/timeline/blob/master/src/app/pages/list/list.page.ts">list.page</a> добавить HTML-разметку оповещения о запросе перевода, которую нужно вывести на главной странице. Добавить нужно в метод getItemTemplate();
- в папке <a href="https://github.com/arseniyasokolov/timeline/tree/master/src/app/pages/list-item-info">list-item-info</a> создать новый ts-файл и поместить в него HTML-разметку нового оповещения, которую нужно вывести на странице подробной информации. Разметку обернуть в строку и экспортировать как константу. Импортировать константу нужно в файле <a href="https://github.com/arseniyasokolov/timeline/blob/master/src/app/pages/list-item-info/list-item-info.page.ts">list-item-info.page</a>, и добавить в метод getTemplate(). Для примера можно взять аналогичные файлы разметки в этой папке;
- если потребуется запрограммировать пользовательские действия, то можно добавить listeners в метод initializeAfterRender() - он есть классе любой страницы;
- стили для нового оповещения должны быть описаны в формате .scss, по БЭМ-методологии. Каждый БЭМ-блок помещается в отдельный файл с нижнем подчеркиванием в начале. Все файлы блоков импортируется в master-файл страницы, и уже он импортируется в страницу.
