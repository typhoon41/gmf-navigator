module GmfMenu {
    @Gmf.IoC.Injectable()
    export class HorizontalMenu {
        readonly childrenWrapper: string = ".gmf-horizontal-list";
        readonly listSelector: string = "#horizontalMenuWrapper";

        constructor(private readonly components: Components) {
        }

        detach(): JQuery {
            return $(this.childrenWrapper).children().detach();
        }

        attach($children: JQuery): void {
            var $header = $(this.components.dottedMenu);
            var $parent = $header.find(this.childrenWrapper);

            $children.appendTo($parent);
        }
    }
}