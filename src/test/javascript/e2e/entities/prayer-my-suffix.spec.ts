import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Prayer e2e test', () => {

    let navBarPage: NavBarPage;
    let prayerDialogPage: PrayerDialogPage;
    let prayerComponentsPage: PrayerComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Prayers', () => {
        navBarPage.goToEntity('prayer-my-suffix');
        prayerComponentsPage = new PrayerComponentsPage();
        expect(prayerComponentsPage.getTitle()).toMatch(/siteCultuelApp.prayer.home.title/);

    });

    it('should load create Prayer dialog', () => {
        prayerComponentsPage.clickOnCreateButton();
        prayerDialogPage = new PrayerDialogPage();
        expect(prayerDialogPage.getModalTitle()).toMatch(/siteCultuelApp.prayer.home.createOrEditLabel/);
        prayerDialogPage.close();
    });

    it('should create and save Prayers', () => {
        prayerComponentsPage.clickOnCreateButton();
        prayerDialogPage.setSobhInput('sobh');
        expect(prayerDialogPage.getSobhInput()).toMatch('sobh');
        prayerDialogPage.setChorouqInput('chorouq');
        expect(prayerDialogPage.getChorouqInput()).toMatch('chorouq');
        prayerDialogPage.setDohrInput('dohr');
        expect(prayerDialogPage.getDohrInput()).toMatch('dohr');
        prayerDialogPage.setAsrInput('asr');
        expect(prayerDialogPage.getAsrInput()).toMatch('asr');
        prayerDialogPage.setMaghrebInput('maghreb');
        expect(prayerDialogPage.getMaghrebInput()).toMatch('maghreb');
        prayerDialogPage.setIchaInput('icha');
        expect(prayerDialogPage.getIchaInput()).toMatch('icha');
        prayerDialogPage.locationSelectLastOption();
        prayerDialogPage.methodSelectLastOption();
        prayerDialogPage.degreeSelectLastOption();
        prayerDialogPage.save();
        expect(prayerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PrayerComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-prayer-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PrayerDialogPage {
    modalTitle = element(by.css('h4#myPrayerLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    sobhInput = element(by.css('input#field_sobh'));
    chorouqInput = element(by.css('input#field_chorouq'));
    dohrInput = element(by.css('input#field_dohr'));
    asrInput = element(by.css('input#field_asr'));
    maghrebInput = element(by.css('input#field_maghreb'));
    ichaInput = element(by.css('input#field_icha'));
    locationSelect = element(by.css('select#field_location'));
    methodSelect = element(by.css('select#field_method'));
    degreeSelect = element(by.css('select#field_degree'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setSobhInput = function (sobh) {
        this.sobhInput.sendKeys(sobh);
    }

    getSobhInput = function () {
        return this.sobhInput.getAttribute('value');
    }

    setChorouqInput = function (chorouq) {
        this.chorouqInput.sendKeys(chorouq);
    }

    getChorouqInput = function () {
        return this.chorouqInput.getAttribute('value');
    }

    setDohrInput = function (dohr) {
        this.dohrInput.sendKeys(dohr);
    }

    getDohrInput = function () {
        return this.dohrInput.getAttribute('value');
    }

    setAsrInput = function (asr) {
        this.asrInput.sendKeys(asr);
    }

    getAsrInput = function () {
        return this.asrInput.getAttribute('value');
    }

    setMaghrebInput = function (maghreb) {
        this.maghrebInput.sendKeys(maghreb);
    }

    getMaghrebInput = function () {
        return this.maghrebInput.getAttribute('value');
    }

    setIchaInput = function (icha) {
        this.ichaInput.sendKeys(icha);
    }

    getIchaInput = function () {
        return this.ichaInput.getAttribute('value');
    }

    locationSelectLastOption = function () {
        this.locationSelect.all(by.tagName('option')).last().click();
    }

    locationSelectOption = function (option) {
        this.locationSelect.sendKeys(option);
    }

    getLocationSelect = function () {
        return this.locationSelect;
    }

    getLocationSelectedOption = function () {
        return this.locationSelect.element(by.css('option:checked')).getText();
    }

    methodSelectLastOption = function () {
        this.methodSelect.all(by.tagName('option')).last().click();
    }

    methodSelectOption = function (option) {
        this.methodSelect.sendKeys(option);
    }

    getMethodSelect = function () {
        return this.methodSelect;
    }

    getMethodSelectedOption = function () {
        return this.methodSelect.element(by.css('option:checked')).getText();
    }

    degreeSelectLastOption = function () {
        this.degreeSelect.all(by.tagName('option')).last().click();
    }

    degreeSelectOption = function (option) {
        this.degreeSelect.sendKeys(option);
    }

    getDegreeSelect = function () {
        return this.degreeSelect;
    }

    getDegreeSelectedOption = function () {
        return this.degreeSelect.element(by.css('option:checked')).getText();
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
