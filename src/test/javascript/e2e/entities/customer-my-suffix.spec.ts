import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Customer e2e test', () => {

    let navBarPage: NavBarPage;
    let customerDialogPage: CustomerDialogPage;
    let customerComponentsPage: CustomerComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Customers', () => {
        navBarPage.goToEntity('customer-my-suffix');
        customerComponentsPage = new CustomerComponentsPage();
        expect(customerComponentsPage.getTitle()).toMatch(/siteCultuelApp.customer.home.title/);

    });

    it('should load create Customer dialog', () => {
        customerComponentsPage.clickOnCreateButton();
        customerDialogPage = new CustomerDialogPage();
        expect(customerDialogPage.getModalTitle()).toMatch(/siteCultuelApp.customer.home.createOrEditLabel/);
        customerDialogPage.close();
    });

    it('should create and save Customers', () => {
        customerComponentsPage.clickOnCreateButton();
        customerDialogPage.setFirstNameInput('firstName');
        expect(customerDialogPage.getFirstNameInput()).toMatch('firstName');
        customerDialogPage.setLastNameInput('lastName');
        expect(customerDialogPage.getLastNameInput()).toMatch('lastName');
        customerDialogPage.rolesSelectLastOption();
        customerDialogPage.setEmailInput('email');
        expect(customerDialogPage.getEmailInput()).toMatch('email');
        customerDialogPage.setPhoneNumberInput('phoneNumber');
        expect(customerDialogPage.getPhoneNumberInput()).toMatch('phoneNumber');
        customerDialogPage.departmentSelectLastOption();
        customerDialogPage.managerSelectLastOption();
        customerDialogPage.save();
        expect(customerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CustomerComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-customer-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CustomerDialogPage {
    modalTitle = element(by.css('h4#myCustomerLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    firstNameInput = element(by.css('input#field_firstName'));
    lastNameInput = element(by.css('input#field_lastName'));
    rolesSelect = element(by.css('select#field_roles'));
    emailInput = element(by.css('input#field_email'));
    phoneNumberInput = element(by.css('input#field_phoneNumber'));
    departmentSelect = element(by.css('select#field_department'));
    managerSelect = element(by.css('select#field_manager'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setFirstNameInput = function (firstName) {
        this.firstNameInput.sendKeys(firstName);
    }

    getFirstNameInput = function () {
        return this.firstNameInput.getAttribute('value');
    }

    setLastNameInput = function (lastName) {
        this.lastNameInput.sendKeys(lastName);
    }

    getLastNameInput = function () {
        return this.lastNameInput.getAttribute('value');
    }

    setRolesSelect = function (roles) {
        this.rolesSelect.sendKeys(roles);
    }

    getRolesSelect = function () {
        return this.rolesSelect.element(by.css('option:checked')).getText();
    }

    rolesSelectLastOption = function () {
        this.rolesSelect.all(by.tagName('option')).last().click();
    }
    setEmailInput = function (email) {
        this.emailInput.sendKeys(email);
    }

    getEmailInput = function () {
        return this.emailInput.getAttribute('value');
    }

    setPhoneNumberInput = function (phoneNumber) {
        this.phoneNumberInput.sendKeys(phoneNumber);
    }

    getPhoneNumberInput = function () {
        return this.phoneNumberInput.getAttribute('value');
    }

    departmentSelectLastOption = function () {
        this.departmentSelect.all(by.tagName('option')).last().click();
    }

    departmentSelectOption = function (option) {
        this.departmentSelect.sendKeys(option);
    }

    getDepartmentSelect = function () {
        return this.departmentSelect;
    }

    getDepartmentSelectedOption = function () {
        return this.departmentSelect.element(by.css('option:checked')).getText();
    }

    managerSelectLastOption = function () {
        this.managerSelect.all(by.tagName('option')).last().click();
    }

    managerSelectOption = function (option) {
        this.managerSelect.sendKeys(option);
    }

    getManagerSelect = function () {
        return this.managerSelect;
    }

    getManagerSelectedOption = function () {
        return this.managerSelect.element(by.css('option:checked')).getText();
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
