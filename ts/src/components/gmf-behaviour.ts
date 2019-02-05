/// <reference path="../Extensions/JQueryExtensions.ts"/>
/// <reference path="../Extensions/StringExtensions.ts"/>
/// <reference path="gmf-components.ts"/>

module GmfMenu {
    @Gmf.IoC.Injectable()
    export class Behaviour {
        private readonly collapsed: string = "collapsed";
        private readonly dottedCollapsed: string = this.collapsed.withDottedPrefix();
        private readonly hasChildren: string = "has-children";
        private readonly dottedChildren: string = this.hasChildren.withDottedPrefix();
        private readonly responsive: string = "responsive";

        readonly visible: string = "is-menu-expanded";

        constructor(private readonly components: Components) {
        }

        isResponsive(): boolean {
            var $root = $(this.components.dottedMenu);
            return $root.hasClass(this.responsive);
        }

        setDefaultBehaviour(): void {
            $("body").on("mousedown", this.onBodyMouseDown);
        }

        toggleMenu = () => {
            $(this.components.dottedMenu).toggleClass(this.visible);
        }

        private clearCollapsed(): JQuery {
            const $collapsed = this.collapsedWithChildren();
            $collapsed.removeClass(this.collapsed);
            return $collapsed;
        }

        private collapsedWithChildren(): JQuery {
            return $(this.dottedChildren + this.dottedCollapsed);
        }

        private onBodyMouseDown = () => {
            var $collapsed = this.collapsedWithChildren();

            if ($collapsed.exists()) {
                $collapsed.removeClass(this.collapsed);
            }
        }

        hasLink($dropdown: JQuery<EventTarget>, event: JQuery.Event) {
            if (!$dropdown.is(this.dottedChildren)) {
                return true;
            }

            event.stopImmediatePropagation();
            var $collapsed = this.clearCollapsed();

            const notSameDropdown = $dropdown[0] !== $collapsed[0];
            const clickedDropdownExpanded = notSameDropdown && !$dropdown.is(this.dottedCollapsed);
            if (clickedDropdownExpanded) {
                $dropdown.addClass(this.collapsed);
            }

            return false;
        }
    }
}