var Gmf;(function(n){var t;(function(o){o.Injector=new(function(){function n(){}n.prototype.resolve=function(n){var t=Reflect.getMetadata("design:paramtypes",n)||[];var e=t.map(function(n){return o.Injector.resolve(n)});return new(n.bind.apply(n,[void 0].concat(e)))};return n}());o.Injectable=function(){return function(n){}}})(t=n.IoC||(n.IoC={}))})(Gmf||(Gmf={}));
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
$.fn.extend({
    exists: function () {
        return this.length > 0;
    },
    notExists: function () {
        return this.length === 0;
    }
});
String.prototype.withDottedPrefix = function () {
    return "." + this;
};
String.prototype.removeWords = function (words) {
    if (!words || words.length == 0) {
        throw "Invalid word array!";
    }
    var result = this;
    for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
        var word = words_1[_i];
        var regex = new RegExp(word, "g");
        result = result.replace(regex, "");
    }
    return result;
};
var GmfMenu;
(function (GmfMenu) {
    var Components = /** @class */ (function () {
        function Components() {
            this.hamburger = "gmf-hamburger";
            this.link = "gmf-link";
            this.menu = "gmf-menu";
            this.linkWrapper = ".gmf-action-component";
            this.linkNavWrapper = ".gmf-link-component";
            this.childrenWrapper = "gmf-horizontal-children";
            this.dottedHamburger = this.hamburger.withDottedPrefix();
            this.dottedLink = this.link.withDottedPrefix();
            this.dottedMenu = this.menu.withDottedPrefix();
        }
        Components.prototype.linkWrapperSelector = function () {
            return this.linkWrapper + ", " + this.linkNavWrapper;
        };
        Components.prototype.getLinkWrapper = function (event, callback) {
            var $target = $(event.target);
            if ($target.closest(this.dottedHamburger).notExists()) {
                return $target.closest(this.linkWrapperSelector());
            }
            event.stopImmediatePropagation();
            callback();
            return $();
        };
        Components.prototype.tryOpenLink = function ($wrapper) {
            var link = $wrapper.children(this.dottedLink).attr("href");
            if (link !== "#") {
                window.open(link, "_self");
            }
        };
        Components = __decorate([
            Gmf.IoC.Injectable()
        ], Components);
        return Components;
    }());
    GmfMenu.Components = Components;
})(GmfMenu || (GmfMenu = {}));
/// <reference path="../Extensions/JQueryExtensions.ts"/>
/// <reference path="../Extensions/StringExtensions.ts"/>
/// <reference path="gmf-components.ts"/>
var GmfMenu;
/// <reference path="../Extensions/JQueryExtensions.ts"/>
/// <reference path="../Extensions/StringExtensions.ts"/>
/// <reference path="gmf-components.ts"/>
(function (GmfMenu) {
    var Behaviour = /** @class */ (function () {
        function Behaviour(components) {
            var _this = this;
            this.components = components;
            this.collapsed = "collapsed";
            this.dottedCollapsed = this.collapsed.withDottedPrefix();
            this.hasChildren = "has-children";
            this.dottedChildren = this.hasChildren.withDottedPrefix();
            this.responsive = "responsive";
            this.visible = "is-menu-expanded";
            this.toggleMenu = function () {
                $(_this.components.dottedMenu).toggleClass(_this.visible);
            };
            this.onBodyMouseDown = function () {
                var $collapsed = _this.collapsedWithChildren();
                if ($collapsed.exists()) {
                    $collapsed.removeClass(_this.collapsed);
                }
            };
        }
        Behaviour.prototype.isResponsive = function () {
            var $root = $(this.components.dottedMenu);
            return $root.hasClass(this.responsive);
        };
        Behaviour.prototype.setDefaultBehaviour = function () {
            $("body").on("mousedown", this.onBodyMouseDown);
        };
        Behaviour.prototype.clearCollapsed = function () {
            var $collapsed = this.collapsedWithChildren();
            $collapsed.removeClass(this.collapsed);
            return $collapsed;
        };
        Behaviour.prototype.collapsedWithChildren = function () {
            return $(this.dottedChildren + this.dottedCollapsed);
        };
        Behaviour.prototype.hasLink = function ($dropdown, event) {
            if (!$dropdown.is(this.dottedChildren)) {
                return true;
            }
            event.stopImmediatePropagation();
            var $collapsed = this.clearCollapsed();
            var notSameDropdown = $dropdown[0] !== $collapsed[0];
            var clickedDropdownExpanded = notSameDropdown && !$dropdown.is(this.dottedCollapsed);
            if (clickedDropdownExpanded) {
                $dropdown.addClass(this.collapsed);
            }
            return false;
        };
        Behaviour = __decorate([
            Gmf.IoC.Injectable(),
            __metadata("design:paramtypes", [GmfMenu.Components])
        ], Behaviour);
        return Behaviour;
    }());
    GmfMenu.Behaviour = Behaviour;
})(GmfMenu || (GmfMenu = {}));
var GmfMenu;
(function (GmfMenu) {
    var Device = /** @class */ (function () {
        function Device() {
            this.placeholder = ".gmf-body-container";
            this.placeholderPseudo = "::before";
            this.placeholderValue = "content";
            this.mobileDescription = "mobile";
            this.tabletDescription = "tablet";
            this.desktopDescription = "desktop";
        }
        Device.prototype.isMobile = function () {
            return this.descriptionEquals(this.mobileDescription);
        };
        Device.prototype.descriptionEquals = function (description) {
            return this.getDescription() === description;
        };
        Device.prototype.getDescription = function () {
            var placeholder = $(this.placeholder)[0];
            return this.getDisplaySize(placeholder).removeWords(["'", '"']);
        };
        Device.prototype.getDisplaySize = function (placeholder) {
            var placeholderStyle = window.getComputedStyle(placeholder, this.placeholderPseudo);
            return placeholderStyle.getPropertyValue(this.placeholderValue);
        };
        Device = __decorate([
            Gmf.IoC.Injectable()
        ], Device);
        return Device;
    }());
    GmfMenu.Device = Device;
})(GmfMenu || (GmfMenu = {}));
var GmfMenu;
(function (GmfMenu) {
    var HorizontalMenu = /** @class */ (function () {
        function HorizontalMenu(components) {
            this.components = components;
            this.childrenWrapper = ".gmf-horizontal-list";
            this.listSelector = "#horizontalMenuWrapper";
        }
        HorizontalMenu.prototype.detach = function () {
            return $(this.childrenWrapper).children().detach();
        };
        HorizontalMenu.prototype.attach = function ($children) {
            var $header = $(this.components.dottedMenu);
            var $parent = $header.find(this.childrenWrapper);
            $children.appendTo($parent);
        };
        HorizontalMenu = __decorate([
            Gmf.IoC.Injectable(),
            __metadata("design:paramtypes", [GmfMenu.Components])
        ], HorizontalMenu);
        return HorizontalMenu;
    }());
    GmfMenu.HorizontalMenu = HorizontalMenu;
})(GmfMenu || (GmfMenu = {}));
var GmfMenu;
(function (GmfMenu) {
    var VerticalMenuComponents = /** @class */ (function () {
        function VerticalMenuComponents(components, behaviour) {
            this.components = components;
            this.behaviour = behaviour;
            this.menuElement = "<nav>";
            this.menuChildElement = "<ul>";
            this.name = "gmf-vertical-menu";
            this.iconMenu = "gmf-icon-menu";
            this.dottedName = this.name.withDottedPrefix();
            this.children = "gmf-vertical-list";
        }
        VerticalMenuComponents.prototype.getMenu = function () {
            return $(this.dottedName);
        };
        VerticalMenuComponents.prototype.getHamburger = function () {
            var selector = this.dottedName + ", " + this.components.dottedHamburger;
            return $(selector);
        };
        VerticalMenuComponents.prototype.create = function () {
            var initials = this.getClasses();
            var $root = $(this.components.dottedMenu);
            var verticalRoot = $(this.menuElement).addClass(initials);
            $(this.menuChildElement).addClass(this.children).appendTo(verticalRoot);
            verticalRoot.appendTo($root);
        };
        VerticalMenuComponents.prototype.getClasses = function () {
            var visibilityClass = this.behaviour.visible;
            var $visibleHamburger = $(this.components.dottedHamburger +
                visibilityClass.withDottedPrefix());
            var classes = this.name;
            if ($visibleHamburger.exists()) {
                classes += " " + visibilityClass;
            }
            return classes;
        };
        VerticalMenuComponents = __decorate([
            Gmf.IoC.Injectable(),
            __metadata("design:paramtypes", [GmfMenu.Components,
                GmfMenu.Behaviour])
        ], VerticalMenuComponents);
        return VerticalMenuComponents;
    }());
    GmfMenu.VerticalMenuComponents = VerticalMenuComponents;
})(GmfMenu || (GmfMenu = {}));
var GmfMenu;
(function (GmfMenu) {
    var VerticalMenuBuilder = /** @class */ (function () {
        function VerticalMenuBuilder(components, menuComponents, behaviour) {
            var _this = this;
            this.components = components;
            this.menuComponents = menuComponents;
            this.behaviour = behaviour;
            this.onMouseDown = function (event) {
                if (_this.clickedScrollbar(event)) {
                    event.stopImmediatePropagation();
                    return;
                }
                var linkWrapper = _this.components.linkWrapperSelector();
                var $clickedLink = $(event.target).closest(linkWrapper);
                if ($clickedLink.notExists()) {
                    event.stopPropagation();
                    _this.behaviour.toggleMenu();
                }
            };
        }
        VerticalMenuBuilder.prototype.build = function (withEvents) {
            var $menu = this.menuComponents.getMenu();
            if ($menu.notExists() && this.behaviour.isResponsive()) {
                this.buildFromScratch();
                return;
            }
            if (withEvents) {
                this.onBuilt();
            }
        };
        VerticalMenuBuilder.prototype.getChildrenSelector = function () {
            return this.menuComponents.children.withDottedPrefix();
        };
        VerticalMenuBuilder.prototype.onBuilt = function () {
            var $hamburger = this.menuComponents.getHamburger();
            $hamburger.on("mousedown", this.onMouseDown);
        };
        VerticalMenuBuilder.prototype.buildFromScratch = function () {
            this.menuComponents.create();
            this.onBuilt();
        };
        VerticalMenuBuilder.prototype.clickedScrollbar = function (event) {
            var element = $(event.target)[0];
            return element.offsetWidth - element.clientWidth >= event.clientX;
        };
        VerticalMenuBuilder = __decorate([
            Gmf.IoC.Injectable(),
            __metadata("design:paramtypes", [GmfMenu.Components,
                GmfMenu.VerticalMenuComponents,
                GmfMenu.Behaviour])
        ], VerticalMenuBuilder);
        return VerticalMenuBuilder;
    }());
    GmfMenu.VerticalMenuBuilder = VerticalMenuBuilder;
})(GmfMenu || (GmfMenu = {}));
/// <reference path="gmf-vertical-menu-components.ts"/>
/// <reference path="gmf-vertical-menu-builder.ts"/>
var GmfMenu;
/// <reference path="gmf-vertical-menu-components.ts"/>
/// <reference path="gmf-vertical-menu-builder.ts"/>
(function (GmfMenu) {
    var VerticalMenu = /** @class */ (function () {
        function VerticalMenu(builder, menuComponents, components) {
            this.builder = builder;
            this.menuComponents = menuComponents;
            this.components = components;
            this.childrenWrapper = "gmf-vertical-children";
            this.descriptionAttribute = "aria-describedby";
        }
        VerticalMenu.prototype.create = function (withEvents) {
            this.builder.build(withEvents);
        };
        VerticalMenu.prototype.attach = function ($elements, description) {
            var $children = $(this.builder.getChildrenSelector());
            $elements.appendTo($children);
            this.convertToVertical($elements, description);
        };
        VerticalMenu.prototype.detach = function ($elements) {
            var $children = $elements.find(this.childrenWrapper.withDottedPrefix());
            $children.removeClass(this.childrenWrapper)
                .addClass(this.components.childrenWrapper);
            $children.removeAttr(this.descriptionAttribute);
            return $elements.exists() ? $elements.detach() : $();
        };
        VerticalMenu.prototype.tryDestroy = function () {
            var $menu = this.menuComponents.getMenu();
            var link = this.components.dottedLink;
            if (!$(link, $menu).exists()) {
                $menu.remove();
            }
        };
        VerticalMenu.prototype.convertToVertical = function ($elements, description) {
            var menuWrapper = this.components.childrenWrapper;
            $elements.attr(this.descriptionAttribute, description);
            $elements.find(menuWrapper.withDottedPrefix())
                .addClass(this.childrenWrapper)
                .removeClass(menuWrapper);
        };
        VerticalMenu = __decorate([
            Gmf.IoC.Injectable(),
            __metadata("design:paramtypes", [GmfMenu.VerticalMenuBuilder,
                GmfMenu.VerticalMenuComponents,
                GmfMenu.Components])
        ], VerticalMenu);
        return VerticalMenu;
    }());
    GmfMenu.VerticalMenu = VerticalMenu;
})(GmfMenu || (GmfMenu = {}));
/// <reference path="./vertical-nav/gmf-vertical-menu.ts"/>
var GmfMenu;
/// <reference path="./vertical-nav/gmf-vertical-menu.ts"/>
(function (GmfMenu) {
    var Menu = /** @class */ (function () {
        function Menu(horizontalMenu, verticalMenu, device, behaviour, components) {
            var _this = this;
            this.horizontalMenu = horizontalMenu;
            this.verticalMenu = verticalMenu;
            this.device = device;
            this.behaviour = behaviour;
            this.components = components;
            this.resizing = false;
            this.transformNavigation = function () {
                if (_this.device.isMobile()) {
                    var $horizontalMenuChildren = _this.horizontalMenu.detach();
                    _this.verticalMenu.create(false);
                    _this.verticalMenu.attach($horizontalMenuChildren, _this.horizontalMenu.listSelector);
                }
                else {
                    var $horizontalMenuChildren = $("[" + _this.verticalMenu.descriptionAttribute + "='" + _this.horizontalMenu.listSelector + "']");
                    var $detachedChildren = _this.verticalMenu.detach($horizontalMenuChildren);
                    _this.horizontalMenu.attach($detachedChildren);
                    _this.verticalMenu.tryDestroy();
                }
                _this.resizing = false;
            };
            this.onResize = function () {
                if (!_this.behaviour.isResponsive() || _this.resizing) {
                    return;
                }
                _this.resizing = true;
                _this.initiateNavigationTransformation();
            };
            this.initiateNavigationTransformation = function () {
                if (window.requestAnimationFrame) {
                    window.requestAnimationFrame(_this.transformNavigation);
                    return;
                }
                var navigationTransformDelay = 300;
                setTimeout(_this.transformNavigation, navigationTransformDelay);
            };
            this.onMouseDown = function (event) {
                var $linkWrapper = _this.components.getLinkWrapper(event, _this.behaviour.toggleMenu);
                if ($linkWrapper.exists() && _this.behaviour.hasLink($linkWrapper, event)) {
                    _this.components.tryOpenLink($linkWrapper);
                }
            };
        }
        Menu.prototype.initialize = function () {
            $(this.components.dottedMenu).on("mousedown", this.onMouseDown);
            this.behaviour.setDefaultBehaviour();
            this.verticalMenu.create(true);
            $(window).on("resize", this.onResize);
            if (this.behaviour.isResponsive()) {
                this.triggerResize();
            }
        };
        Menu.prototype.triggerResize = function () {
            var event = document.createEvent('HTMLEvents');
            event.initEvent('resize', true, false);
            document.dispatchEvent(event);
        };
        Menu = __decorate([
            Gmf.IoC.Injectable(),
            __metadata("design:paramtypes", [GmfMenu.HorizontalMenu,
                GmfMenu.VerticalMenu,
                GmfMenu.Device,
                GmfMenu.Behaviour,
                GmfMenu.Components])
        ], Menu);
        return Menu;
    }());
    GmfMenu.Menu = Menu;
})(GmfMenu || (GmfMenu = {}));
$(function () {
    var menu = Gmf.IoC.Injector.resolve(GmfMenu.Menu);
    menu.initialize();
});
//# sourceMappingURL=gmf-navigator.js.map