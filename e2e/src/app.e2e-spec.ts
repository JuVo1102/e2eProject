import { browser, ExpectedConditions, WebDriver } from 'protractor';
import { AppPage } from './app.po';
import { HomePage } from './home-page.po';
import { LoginPage } from './login-page.po';
import { newNotePage } from './new-note-page.po';
import { notesDetailPage } from './notes-detail-page.po';
import { RegistryPage } from './registry-page.po';

describe('e2eProject', () => {

  const app = new AppPage();
  const login = new LoginPage();
  const registry = new RegistryPage();
  const home = new HomePage();
  const newNote = new newNotePage();
  const noteDetail = new notesDetailPage();

  describe('app', () => {
    beforeEach(async () => {
      await app.load();
    });

    it('should display the mainscreen', () => {
      expect<any>(app.rootElement().isDisplayed()).toEqual(true);
    });
  });

  describe('login', () => {
    beforeEach(async () => {
      await login.load();
    });
    it('should have a title named Login', async () => {
      const loginPageTitle = await login.getTitle();
      expect(loginPageTitle).toEqual('Login');
    });

    it('should have an input for email and password', async () => {
      const emailContent = "testEmail"
      const passwordContent = "testPassword"

      await login.writeInput('email', emailContent);
      await login.writeInput('password', passwordContent);

      const emailInputContent = await login.getInputText('email');
      const passwordInputContent = await login.getInputText('password');

      expect(emailInputContent).toEqual(emailContent);
      expect(passwordInputContent).toEqual(passwordContent);
    });

    it('should have a disabled button Login', async () => {
      const buttonIdentifier = `ion-button[type="submit"]`;

      const clickable: boolean = await login.checkButtonClickable(buttonIdentifier);
      expect(clickable).toBeFalse;
    });

    it('should have a clickable button Registry', async () => {
      const buttonIdentifier = `ion-button[routerLink="/registry"]`;

      const clickable: boolean = await login.checkButtonClickable(buttonIdentifier);
      expect(clickable).toBeTrue;
    });

    it('should have a clickable button Login when inputs for email and password are given and valid', async () => {
      const emailContent = "test@Email.de";
      const passwordContent = "testPassword1";
      const buttonIdentifier = `ion-button[type="submit"]`;

      await login.writeInput('email', emailContent);
      await login.writeInput('password', passwordContent);
      const clickable: boolean = await login.checkButtonClickable(buttonIdentifier);
      expect(clickable).toBeTrue;
    });
  });

  describe('registry', () => {
    beforeEach(async () => {
      await login.load();
      const buttonIdentifier = `ion-button[routerLink="/registry"]`;
      const registryButton = await login.getElement(buttonIdentifier);     
      await registryButton.click();
      browser.manage().timeouts().implicitlyWait(1500);
    });

    it('should have a title named Registry', async () => {
      const registryPageTitle = await registry.getTitle();
      expect(registryPageTitle).toEqual('Registry');
    });

    it('should have an input for email, password and confirm-password', async () => {
      const emailContent = "test@Email.de";
      const passwordContent = "testPassword1";
      const confirmpasswordContent = "testPassword1";

      await registry.writeInput('email', emailContent);
      await registry.writeInput('password', passwordContent);
      await registry.writeInput('confirmPassword', confirmpasswordContent);

      const emailInput = await registry.getInputText('email');
      const passwordInput = await registry.getInputText('password');
      const confirmPasswordInput = await registry.getInputText('confirmPassword');

      expect(emailInput).toEqual(emailContent);
      expect(passwordInput).toEqual(passwordContent);
      expect(confirmpasswordContent).toEqual(confirmPasswordInput);
    });

    it('should have a disabled button Submit', async () => {
      const buttonIdentifier = `ion-button[type="submit"]`;

      const clickable: boolean = await login.checkButtonClickable(buttonIdentifier);
      expect(clickable).toBeFalse;
    });

    it('should have an alert notification for the input definition', async () => {
      const notification = "Password needs to contain: 1. A capital letter 2. A number 3. 8-32 characters";
      const id = '[id="generalNotification"]';

      const registryNotification = await registry.getRegistryNotification(id);
      expect(registryNotification).toEqual(notification);
    });

    it('should have an alert notification if password was not confirmed correctly', async () => {
      const notification = "Password not identical";
      const id = '[id="passwordNotification"]';
      const passwordContent = "testPassword1";
      const confirmPassword = "testPassword2";

      await registry.writeInput('password', passwordContent);
      await registry.writeInput('confirmPassword', confirmPassword);

      const registryNotification = await registry.getRegistryNotification(id);
      expect(registryNotification).toEqual(notification);
    });

    it('should have a clickable button Submit when inputs are given and valid', async () => {
      const emailContent = "test@Email.de";
      const passwordContent = "testPassword1";
      const confirmPassword = "testPassword1";
      const buttonIdentifier = `ion-button[type="submit"]`;

      await registry.writeInput('email', emailContent);
      await registry.writeInput('password', passwordContent);
      await registry.writeInput('confirmPassword', confirmPassword);
      const button = registry.getElement(buttonIdentifier);
      await registry.waitUntilVisible(button);
      const clickable: boolean = await registry.checkButtonClickable(buttonIdentifier);
      expect(clickable).toBeTrue;
    });
  });

  describe('homepage', () => {
    beforeEach(async () => {
      await login.load();
      const emailContent = "test@Email.de";
      const passwordContent = "testPassword1";
      const buttonIdentifier = `ion-button[type="submit"]`;
      const loginButton = await login.getElement(buttonIdentifier);
      
      await login.writeInput('email', emailContent);
      await login.writeInput('password', passwordContent);   

      await login.checkButtonClickable(buttonIdentifier);
      await loginButton.click();
    });

    it('should have a title named Notes', async () => {
      const homePageTitle = await home.getTitle();
      expect(homePageTitle).toEqual('Notes');
    });

    it('should have a button to navigate to the new-notes page', async () => {
      const buttonIdentifier = `ion-item[id="createNote"]`;

      const clickable: boolean = await home.checkButtonClickable(buttonIdentifier);
      expect(clickable).toBeTrue;
    });
  });

  describe('new-note', () => {
    beforeEach(async () => {
      await login.load();    
      const emailContent = "test@Email.de";
      const passwordContent = "testPassword1";
      const loginButtonIdentifier = `ion-button[type="submit"]`;
      const loginButton = await login.getElement(loginButtonIdentifier);

      await login.writeInput('email', emailContent);
      await login.writeInput('password', passwordContent);
      
      await browser.wait(ExpectedConditions.elementToBeClickable(loginButton), 3000);
      await loginButton.click();

      const newNoteButtonIdentifier = `ion-item[id="createNote"]`;
      const newNoteButton = await home.getElement(newNoteButtonIdentifier);

      await browser.wait(ExpectedConditions.elementToBeClickable(newNoteButton), 3000);
      await newNoteButton.click();
      browser.manage().timeouts().implicitlyWait(1000);
    });

    it('should have a title named Create New Note', async () => {
      const newNotePageTitle = await newNote.getTitle();
      expect(newNotePageTitle).toEqual('Create new Note');
    });

    it('should have an input for a note title and a text', async () => {
      const title = "title";
      const content = "content";
      const titleElement = newNote.getElement('ion-title');
      await browser.wait(ExpectedConditions.elementToBeClickable(titleElement), 4000);

      await newNote.writeInput('title', title);
      await newNote.writeTextfield('text', content);

      const titleInputContent = await newNote.getInputText('title');
      const textInputContent = await newNote.getTextfieldText('text');

      expect(titleInputContent).toEqual(title);
      expect(textInputContent).toEqual(content);
    });

    it('should have a button to create notes', async () => {
      const buttonIdentifier = `ion-item[id="newNote"]`;

      const clickable: boolean = await home.checkButtonClickable(buttonIdentifier);
      expect(clickable).toBeTrue;
    });

    it('should create a new note', async () => {
      const title = "title";
      const content = "content";
      const buttonIdentifier = `ion-button[id="Create"]`;
      const titleElement = newNote.getElement('ion-title');
      await browser.wait(ExpectedConditions.elementToBeClickable(titleElement), 4000);

      await newNote.writeInput('title', title);
      await newNote.writeTextfield('text', content);
               
      const newNoteButton = await newNote.getElement(buttonIdentifier);
      const textfieldContent = await newNote.getTextfieldText("text");
      browser.manage().timeouts().implicitlyWait(1000);
      if(textfieldContent.length > 0) {
        await titleElement.click()
      }

      await newNoteButton.click();
      const labelIdentifier = `ion-label[id="${title}"]`;
      
      const labelText = await home.getLabelText(labelIdentifier);

      expect(labelText).toEqual(title);
    });
  });

  describe('note-detail', () => {
    beforeEach(async () => {
      await login.load();
      const emailContent = "test@Email.de";
      const passwordContent = "testPassword1";
      const loginButtonIdentifier = `ion-button[type="submit"]`;
      const loginButton = await login.getElement(loginButtonIdentifier);

      await login.writeInput('email', emailContent);
      await login.writeInput('password', passwordContent);
      
      await browser.wait(ExpectedConditions.elementToBeClickable(loginButton), 3000);
      await loginButton.click();

      const detailLink = `ion-label[id="title"]`;
      const detailButton = await home.getElement(detailLink);

      await browser.wait(ExpectedConditions.elementToBeClickable(detailButton), 3000);
      await detailButton.click();
    });

    it('should have a title named title', async () => {
      const detailPageTitle = await noteDetail.getTitle();
      expect(detailPageTitle).toEqual('title');
    });

    it('should have a text with the content: content', async () => {
      const textFieldvalue = await noteDetail.getTextfieldContent();
      expect(textFieldvalue).toEqual(" content ");
    });
  });
});
