module GmfMenu {
    @Gmf.IoC.Injectable()
    export class VerticalMenuBuilder {
        constructor(private readonly components: Components,
            private readonly menuComponents: VerticalMenuComponents,
            private readonly behaviour: Behaviour) {
        }

        build(withEvents: boolean): void {
            var $menu = this.menuComponents.getMenu();

            if ($menu.notExists() && this.behaviour.isResponsive()) {
                this.buildFromScratch();
                return;
            }

            if (withEvents) {
                this.onBuilt();
            }
        }

        getChildrenSelector(): string {
            return this.menuComponents.children.withDottedPrefix();
        }

        private onBuilt(): void {
            const $hamburger = this.menuComponents.getHamburger();
            $hamburger.on("mousedown", this.onMouseDown);
        }

        private buildFromScratch(): void {
            this.menuComponents.create();
            this.onBuilt();
        }

        private onMouseDown = (event: JQuery.Event) => {
            if (this.clickedScrollbar(event)) {
                event.stopImmediatePropagation();
                return;
            }

            const linkWrapper = this.components.linkWrapperSelector();
            const $clickedLink = $(event.target).closest(linkWrapper);

            if ($clickedLink.notExists()) {
                event.stopPropagation();
                this.behaviour.toggleMenu();
            }
        }

        private clickedScrollbar(event: JQuery.Event) {
            var element = $(event.target)[0] as HTMLElement;

            return element.offsetWidth - element.clientWidth >= event.clientX;
        }
    }
}