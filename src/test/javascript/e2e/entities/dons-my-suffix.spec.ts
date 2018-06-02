import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Dons e2e test', () => {

    let navBarPage: NavBarPage;
    let donsDialogPage: DonsDialogPage;
    let donsComponentsPage: DonsComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Dons', () => {
        navBarPage.goToEntity('dons-my-suffix');
        donsComponentsPage = new DonsComponentsPage();
        expect(donsComponentsPage.getTitle()).toMatch(/siteCultuelApp.dons.home.title/);

    });

    it('should load create Dons dialog', () => {
        donsComponentsPage.clickOnCreateButton();
        donsDialogPage = new DonsDialogPage();
        expect(donsDialogPage.getModalTitle()).toMatch(/siteCultuelApp.dons.home.createOrEditLabel/);
        donsDialogPage.close();
    });

    it('should create and save Dons', () => {
        donsComponentsPage.clickOnCreateButton();
        donsDialogPage.setUuidInput('uuid');
        expect(donsDialogPage.getUuidInput()).toMatch('uuid');
        donsDialogPage.setDonInput('5');
        expect(donsDialogPage.getDonInput()).toMatch('5');
        donsDialogPage.customerSelectLastOption();
        donsDialogPage.save();
        expect(donsDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class DonsComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-dons-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DonsDialogPage {
    modalTitle = element(by.css('h4#myDonsLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    uuidInput = element(by.css('input#field_uuid'));
    donInput = element(by.css('input#field_don'));
    customerSelect = element(by.css('select#field_customer'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setUuidInput = function (uuid) {
        this.uuidInput.sendKeys(uuid);
    }

    getUuidInput = function () {
        return this.uuidInput.getAttribute('value');
    }

    setDonInput = function (don) {
        this.donInput.sendKeys(don);
    }

    getDonInput = function () {
        return this.donInput.getAttribute('value');
    }

    customerSelectLastOption = function () {
        this.customerSelect.all(by.tagName('option')).last().click();
    }

    customerSelectOption = function (option) {
        this.customerSelect.sendKeys(option);
    }

    getCustomerSelect = function () {
        return this.customerSelect;
    }

    getCustomerSelectedOption = function () {
        return this.customerSelect.element(by.css('option:checked')).getText();
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
