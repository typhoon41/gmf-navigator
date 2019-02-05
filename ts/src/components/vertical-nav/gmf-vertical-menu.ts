/// <reference path="gmf-vertical-menu-components.ts"/>
/// <reference path="gmf-vertical-menu-builder.ts"/>

module GmfMenu {
    @Gmf.IoC.Injectable()
    export class VerticalMenu {
        private readonly childrenWrapper: string = "gmf-vertical-children";
        readonly descriptionAttribute = "aria-describedby";

        constructor(private readonly builder: VerticalMenuBuilder,
            private readonly menuComponents: VerticalMenuComponents,
            private readonly components: Components) {
        }

        create(withEvents: boolean): void {
            this.builder.build(withEvents);
        }

        attach($elements: JQuery, description: string): void {
            const $children = $(this.builder.getChildrenSelector());

            $elements.appendTo($children);
            this.convertToVertical($elements, description);
        }

        detach($elements: JQuery): JQuery {
            var $children = $elements.find(this.childrenWrapper.withDottedPrefix());

            $children.removeClass(this.childrenWrapper)
                .addClass(this.components.childrenWrapper);

            $children.removeAttr(this.descriptionAttribute);
            return $elements.exists() ? $elements.detach() : $();
        }

        tryDestroy(): void {
            var $menu = this.menuComponents.getMenu();
            var link = this.components.dottedLink;

            if (!$(link, $menu).exists()) {
                $menu.remove();
            }
        }

        private convertToVertical($elements: JQuery, description: string): void {
            const menuWrapper = this.components.childrenWrapper;
            $elements.attr(this.descriptionAttribute, description);
            $elements.find(menuWrapper.withDottedPrefix())
                .addClass(this.childrenWrapper)
                .removeClass(menuWrapper);
        }
    }
}