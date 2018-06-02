import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Degrees e2e test', () => {

    let navBarPage: NavBarPage;
    let degreesDialogPage: DegreesDialogPage;
    let degreesComponentsPage: DegreesComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Degrees', () => {
        navBarPage.goToEntity('degrees-my-suffix');
        degreesComponentsPage = new DegreesComponentsPage();
        expect(degreesComponentsPage.getTitle()).toMatch(/siteCultuelApp.degrees.home.title/);

    });

    it('should load create Degrees dialog', () => {
        degreesComponentsPage.clickOnCreateButton();
        degreesDialogPage = new DegreesDialogPage();
        expect(degreesDialogPage.getModalTitle()).toMatch(/siteCultuelApp.degrees.home.createOrEditLabel/);
        degreesDialogPage.close();
    });

    it('should create and save Degrees', () => {
        degreesComponentsPage.clickOnCreateButton();
        degreesDialogPage.setDegreeInput('degree');
        expect(degreesDialogPage.getDegreeInput()).toMatch('degree');
        degreesDialogPage.save();
        expect(degreesDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class DegreesComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-degrees-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DegreesDialogPage {
    modalTitle = element(by.css('h4#myDegreesLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    degreeInput = element(by.css('input#field_degree'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setDegreeInput = function (degree) {
        this.degreeInput.sendKeys(degree);
    }

    getDegreeInput = function () {
        return this.degreeInput.getAttribute('value');
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
