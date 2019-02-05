module GmfMenu {
    @Gmf.IoC.Injectable()
    export class Components {
        private readonly hamburger: string = "gmf-hamburger";
        private readonly link: string = "gmf-link";
        private readonly menu: string = "gmf-menu";

        private readonly linkWrapper = ".gmf-action-component";
        private readonly linkNavWrapper = ".gmf-link-component";

        readonly childrenWrapper: string = "gmf-horizontal-children";
        readonly dottedHamburger: string = this.hamburger.withDottedPrefix();
        readonly dottedLink: string = this.link.withDottedPrefix();
        readonly dottedMenu: string = this.menu.withDottedPrefix();

        linkWrapperSelector() {
            return `${this.linkWrapper}, ${this.linkNavWrapper}`;
        }

        getLinkWrapper(event: JQuery.Event, callback: () => void): JQuery<EventTarget> {
            var $target = $(event.target);
            if ($target.closest(this.dottedHamburger).notExists()) {
                return $target.closest(this.linkWrapperSelector());
            }

            event.stopImmediatePropagation();
            callback();
            return $();
        }

        tryOpenLink($wrapper: JQuery<EventTarget>) {
            var link = $wrapper.children(this.dottedLink).attr("href");

            if (link !== "#") {
                window.open(link, "_self");
            }
        }
    }
}