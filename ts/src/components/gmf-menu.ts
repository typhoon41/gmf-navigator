/// <reference path="./vertical-nav/gmf-vertical-menu.ts"/>
module GmfMenu {
    @Gmf.IoC.Injectable()
    export class Menu {
        private resizing: boolean = false;

        constructor(private readonly horizontalMenu: HorizontalMenu,
            private readonly verticalMenu: VerticalMenu,
            private readonly device: Device,
            private readonly behaviour: Behaviour,
            private readonly components: Components) {
        }

        initialize(): void {
            $(this.components.dottedMenu).on("mousedown", this.onMouseDown);
            this.behaviour.setDefaultBehaviour();
            this.verticalMenu.create(true);
            $(window).on("resize", this.onResize);

            if (this.behaviour.isResponsive()) {
                this.triggerResize();
            }
        }

        private transformNavigation = () => {
            if (this.device.isMobile()) {
                var $horizontalMenuChildren = this.horizontalMenu.detach();
                this.verticalMenu.create(false);
                this.verticalMenu.attach($horizontalMenuChildren, this.horizontalMenu.listSelector);
            }
            else {
                var $horizontalMenuChildren = $(`[${this.verticalMenu.descriptionAttribute}='${this.horizontalMenu.listSelector}']`);
                var $detachedChildren = this.verticalMenu.detach($horizontalMenuChildren);
                this.horizontalMenu.attach($detachedChildren);
                this.verticalMenu.tryDestroy();
            }

            this.resizing = false;
        }

        private onResize = () => {
            if (!this.behaviour.isResponsive() || this.resizing) {
                return;
            }

            this.resizing = true;
            this.initiateNavigationTransformation();
        }

        private initiateNavigationTransformation = () => {
            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(this.transformNavigation)
                return;
            }

            const navigationTransformDelay: number = 300
            setTimeout(this.transformNavigation, navigationTransformDelay);
        }

        private onMouseDown = (event: JQuery.Event) => {
            var $linkWrapper = this.components.getLinkWrapper(event, this.behaviour.toggleMenu);

            if ($linkWrapper.exists() && this.behaviour.hasLink($linkWrapper, event)) {
                this.components.tryOpenLink($linkWrapper);
            }
        }

        private triggerResize(): void {
            const event = document.createEvent('HTMLEvents');
            event.initEvent('resize', true, false);
            document.dispatchEvent(event);
        }
    }
}

$(() => {
    var menu = Gmf.IoC.Injector.resolve(GmfMenu.Menu);
    menu.initialize();
});