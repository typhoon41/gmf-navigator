module GmfMenu {
    @Gmf.IoC.Injectable()
    export class Device {
        private readonly placeholder: string = ".gmf-body-container";
        private readonly placeholderPseudo: string = "::before";
        private readonly placeholderValue: string = "content";

        private readonly mobileDescription: string = "mobile";
        private readonly tabletDescription: string = "tablet";
        private readonly desktopDescription: string = "desktop";

        isMobile(): boolean {
            return this.descriptionEquals(this.mobileDescription);
        }

        private descriptionEquals(description: string) {
            return this.getDescription() === description;
        }

        private getDescription(): string {
            const placeholder = $(this.placeholder)[0];
            return this.getDisplaySize(placeholder).removeWords(["'", '"']);
        }

        private getDisplaySize(placeholder: Element): string {
            const placeholderStyle = window.getComputedStyle(placeholder, this.placeholderPseudo);
            return placeholderStyle.getPropertyValue(this.placeholderValue)
        }
    }
}