import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Methods e2e test', () => {

    let navBarPage: NavBarPage;
    let methodsDialogPage: MethodsDialogPage;
    let methodsComponentsPage: MethodsComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Methods', () => {
        navBarPage.goToEntity('methods-my-suffix');
        methodsComponentsPage = new MethodsComponentsPage();
        expect(methodsComponentsPage.getTitle()).toMatch(/siteCultuelApp.methods.home.title/);

    });

    it('should load create Methods dialog', () => {
        methodsComponentsPage.clickOnCreateButton();
        methodsDialogPage = new MethodsDialogPage();
        expect(methodsDialogPage.getModalTitle()).toMatch(/siteCultuelApp.methods.home.createOrEditLabel/);
        methodsDialogPage.close();
    });

    it('should create and save Methods', () => {
        methodsComponentsPage.clickOnCreateButton();
        methodsDialogPage.setMethodInput('method');
        expect(methodsDialogPage.getMethodInput()).toMatch('method');
        methodsDialogPage.save();
        expect(methodsDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class MethodsComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-methods-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class MethodsDialogPage {
    modalTitle = element(by.css('h4#myMethodsLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    methodInput = element(by.css('input#field_method'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setMethodInput = function (method) {
        this.methodInput.sendKeys(method);
    }

    getMethodInput = function () {
        return this.methodInput.getAttribute('value');
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
