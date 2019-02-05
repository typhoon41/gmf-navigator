module GmfMenu {
    @Gmf.IoC.Injectable()
    export class VerticalMenuComponents {
        private readonly menuElement: string = "<nav>";
        private readonly menuChildElement: string = "<ul>";
        private readonly name: string = "gmf-vertical-menu";
        private readonly iconMenu: string = "gmf-icon-menu";

        private readonly dottedName: string = this.name.withDottedPrefix();
        readonly children: string = "gmf-vertical-list";

        constructor(private readonly components: Components,
            private readonly behaviour: Behaviour) {
        }

        getMenu(): JQuery {
            return $(this.dottedName);
        }

        getHamburger(): JQuery {
            const selector = `${this.dottedName}, ${this.components.dottedHamburger}`;
            return $(selector);
        }

        create(): void {
            const initials = this.getClasses();
            const $root = $(this.components.dottedMenu);

            var verticalRoot = $(this.menuElement).addClass(initials);
            $(this.menuChildElement).addClass(this.children).appendTo(verticalRoot);
            verticalRoot.appendTo($root);
        }

        private getClasses(): string {
            const visibilityClass = this.behaviour.visible;
            const $visibleHamburger = $(this.components.dottedHamburger +
                visibilityClass.withDottedPrefix());

            let classes = this.name;
            if ($visibleHamburger.exists()) {
                classes += ` ${visibilityClass}`;
            }

            return classes;
        }
    }
}