
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Download, Copy, FileCode } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface JavaCodePreviewProps {
  onBack: () => void;
}

const JavaCodePreview = ({ onBack }: JavaCodePreviewProps) => {
  const [activeTab, setActiveTab] = useState("structure");
  const { toast } = useToast();

  const handleDownload = (fileName: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Archivo descargado",
      description: `${fileName} ha sido descargado.`,
    });
  };

  const handleDownloadZip = () => {
    toast({
      title: "Descarga iniciada",
      description: "Descargando proyecto completo en formato ZIP.",
    });
    // En una implementación real, aquí se generaría y descargaría un ZIP con todos los archivos
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado al portapapeles",
      description: "El código ha sido copiado al portapapeles.",
    });
  };

  const pomXml = `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.qaanalyst</groupId>
    <artifactId>test-automation</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <selenium.version>4.11.0</selenium.version>
        <cucumber.version>7.13.0</cucumber.version>
        <webdrivermanager.version>5.4.1</webdrivermanager.version>
        <junit.version>5.10.0</junit.version>
    </properties>

    <dependencies>
        <!-- Selenium -->
        <dependency>
            <groupId>org.seleniumhq.selenium</groupId>
            <artifactId>selenium-java</artifactId>
            <version>\${selenium.version}</version>
        </dependency>

        <!-- WebDriverManager -->
        <dependency>
            <groupId>io.github.bonigarcia</groupId>
            <artifactId>webdrivermanager</artifactId>
            <version>\${webdrivermanager.version}</version>
        </dependency>

        <!-- Cucumber -->
        <dependency>
            <groupId>io.cucumber</groupId>
            <artifactId>cucumber-java</artifactId>
            <version>\${cucumber.version}</version>
        </dependency>
        <dependency>
            <groupId>io.cucumber</groupId>
            <artifactId>cucumber-junit</artifactId>
            <version>\${cucumber.version}</version>
            <scope>test</scope>
        </dependency>

        <!-- JUnit -->
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-api</artifactId>
            <version>\${junit.version}</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-engine</artifactId>
            <version>\${junit.version}</version>
            <scope>test</scope>
        </dependency>

        <!-- Logging -->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>2.0.7</version>
        </dependency>
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>1.4.8</version>
        </dependency>

        <!-- Assertions -->
        <dependency>
            <groupId>org.assertj</groupId>
            <artifactId>assertj-core</artifactId>
            <version>3.24.2</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.11.0</version>
                <configuration>
                    <source>11</source>
                    <target>11</target>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>3.1.2</version>
                <configuration>
                    <includes>
                        <include>**/*Runner.java</include>
                    </includes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>`;

  const loginFeature = `Feature: Login Functionality
  Como usuario, quiero poder iniciar sesión en la aplicación
  
  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter "usuario_test@example.com" in the email field
    And I enter "Password123!" in the password field
    And I click the "Iniciar Sesión" button
    Then I should be redirected to the dashboard
    And I should see a welcome message
  
  Scenario: Failed login with invalid credentials
    Given I am on the login page
    When I enter "usuario_test@example.com" in the email field
    And I enter "ContraseñaIncorrecta123!" in the password field
    And I click the "Iniciar Sesión" button
    Then I should see an error message
    And I should remain on the login page`;

  const loginStepDefs = `package com.qaanalyst.steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import com.qaanalyst.pages.LoginPage;
import com.qaanalyst.pages.DashboardPage;
import com.qaanalyst.utils.TestContext;
import org.junit.Assert;

public class LoginSteps {
    
    private WebDriver driver;
    private LoginPage loginPage;
    private DashboardPage dashboardPage;
    private TestContext testContext;
    
    public LoginSteps(TestContext context) {
        this.testContext = context;
        this.driver = testContext.getDriver();
        this.loginPage = new LoginPage(driver);
        this.dashboardPage = new DashboardPage(driver);
    }
    
    @Given("I am on the login page")
    public void iAmOnTheLoginPage() {
        loginPage.navigateToLoginPage();
    }
    
    @When("I enter {string} in the email field")
    public void iEnterInTheEmailField(String email) {
        loginPage.enterEmail(email);
    }
    
    @And("I enter {string} in the password field")
    public void iEnterInThePasswordField(String password) {
        loginPage.enterPassword(password);
    }
    
    @And("I click the {string} button")
    public void iClickTheButton(String buttonName) {
        if (buttonName.equals("Iniciar Sesión")) {
            loginPage.clickLoginButton();
        }
    }
    
    @Then("I should be redirected to the dashboard")
    public void iShouldBeRedirectedToTheDashboard() {
        Assert.assertTrue("User was not redirected to dashboard", 
            dashboardPage.isPageDisplayed());
    }
    
    @And("I should see a welcome message")
    public void iShouldSeeAWelcomeMessage() {
        Assert.assertTrue("Welcome message is not displayed", 
            dashboardPage.isWelcomeMessageDisplayed());
    }
    
    @Then("I should see an error message")
    public void iShouldSeeAnErrorMessage() {
        Assert.assertTrue("Error message is not displayed", 
            loginPage.isErrorMessageDisplayed());
    }
    
    @And("I should remain on the login page")
    public void iShouldRemainOnTheLoginPage() {
        Assert.assertTrue("User is not on the login page", 
            loginPage.isPageDisplayed());
    }
}`;

  const loginPage = `package com.qaanalyst.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class LoginPage {
    
    private WebDriver driver;
    private WebDriverWait wait;
    
    // Page URL
    private static final String PAGE_URL = "https://yourapp.com/login";
    
    // Locators
    @FindBy(id = "email")
    private WebElement emailField;
    
    @FindBy(id = "password")
    private WebElement passwordField;
    
    @FindBy(css = "button[type='submit']")
    private WebElement loginButton;
    
    @FindBy(css = ".error-message")
    private WebElement errorMessage;
    
    // Constructor
    public LoginPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        PageFactory.initElements(driver, this);
    }
    
    // Page methods
    public void navigateToLoginPage() {
        driver.get(PAGE_URL);
        wait.until(ExpectedConditions.visibilityOf(emailField));
    }
    
    public void enterEmail(String email) {
        emailField.clear();
        emailField.sendKeys(email);
    }
    
    public void enterPassword(String password) {
        passwordField.clear();
        passwordField.sendKeys(password);
    }
    
    public void clickLoginButton() {
        loginButton.click();
    }
    
    public boolean isErrorMessageDisplayed() {
        try {
            return wait.until(ExpectedConditions.visibilityOf(errorMessage)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isPageDisplayed() {
        return driver.getCurrentUrl().contains("/login");
    }
    
    // Login workflow method
    public void login(String email, String password) {
        enterEmail(email);
        enterPassword(password);
        clickLoginButton();
    }
}`;

  const dashboardPage = `package com.qaanalyst.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class DashboardPage {
    
    private WebDriver driver;
    private WebDriverWait wait;
    
    // Locators
    @FindBy(css = ".welcome-message")
    private WebElement welcomeMessage;
    
    @FindBy(css = ".dashboard-title")
    private WebElement dashboardTitle;
    
    // Constructor
    public DashboardPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        PageFactory.initElements(driver, this);
    }
    
    // Page methods
    public boolean isPageDisplayed() {
        try {
            return wait.until(ExpectedConditions.visibilityOf(dashboardTitle)).isDisplayed() &&
                   driver.getCurrentUrl().contains("/dashboard");
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isWelcomeMessageDisplayed() {
        try {
            return wait.until(ExpectedConditions.visibilityOf(welcomeMessage)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
}`;

  const testContext = `package com.qaanalyst.utils;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import java.time.Duration;

public class TestContext {
    
    private WebDriver driver;
    
    public TestContext() {
        initializeDriver();
    }
    
    private void initializeDriver() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        options.addArguments("--window-size=1920,1080");
        options.addArguments("--disable-gpu");
        options.addArguments("--disable-extensions");
        
        driver = new ChromeDriver(options);
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(30));
        driver.manage().window().maximize();
    }
    
    public WebDriver getDriver() {
        return driver;
    }
    
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}`;

  const testRunner = `package com.qaanalyst.runners;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
    features = "src/test/resources/features",
    glue = {"com.qaanalyst.steps", "com.qaanalyst.hooks"},
    plugin = {
        "pretty",
        "html:target/cucumber-reports/cucumber-pretty.html",
        "json:target/cucumber-reports/CucumberTestReport.json"
    },
    monochrome = true,
    dryRun = false,
    tags = "@regression or @smoke"
)
public class TestRunner {
    // This class will be empty
}`;

  const hooks = `package com.qaanalyst.hooks;

import com.qaanalyst.utils.TestContext;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.Scenario;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;

public class Hooks {
    
    private TestContext testContext;
    
    public Hooks(TestContext context) {
        this.testContext = context;
    }
    
    @Before
    public void setUp() {
        // Pre-condition steps to run before each scenario
    }
    
    @After
    public void tearDown(Scenario scenario) {
        if (scenario.isFailed()) {
            // Take screenshot if scenario fails
            final byte[] screenshot = ((TakesScreenshot) testContext.getDriver())
                    .getScreenshotAs(OutputType.BYTES);
            scenario.attach(screenshot, "image/png", "screenshot");
        }
        
        // Always close the browser after each scenario
        testContext.tearDown();
    }
}`;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <CardTitle>Código de Automatización Java</CardTitle>
              <CardDescription>
                Código Java generado automáticamente basado en los casos de prueba
              </CardDescription>
            </div>
          </div>
          <Button onClick={handleDownloadZip}>
            <Download className="mr-2 h-4 w-4" />
            Descargar Proyecto Completo
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4">
          <FileCode className="h-4 w-4" />
          <AlertTitle>Proyecto Maven configurado con Selenium y Cucumber</AlertTitle>
          <AlertDescription>
            Se ha generado un proyecto Java completo con estructura POM (Page Object Model) basado en los casos de prueba analizados.
            El proyecto incluye configuraciones de Selenium WebDriver, Cucumber para BDD y estructura de reportes.
          </AlertDescription>
        </Alert>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="structure">Estructura del Proyecto</TabsTrigger>
            <TabsTrigger value="pom">Configuración Maven</TabsTrigger>
            <TabsTrigger value="code">Código de Pruebas</TabsTrigger>
          </TabsList>

          <TabsContent value="structure" className="space-y-4 mt-4">
            <div className="font-mono text-sm p-4 border rounded bg-muted">
              <pre>
{`test-automation/
├── pom.xml
├── src/
│   ├── main/
│   │   └── java/
│   │       └── com/
│   │           └── qaanalyst/
│   │               ├── pages/
│   │               │   ├── LoginPage.java
│   │               │   └── DashboardPage.java
│   │               └── utils/
│   │                   └── TestContext.java
│   └── test/
│       ├── java/
│       │   └── com/
│       │       └── qaanalyst/
│       │           ├── runners/
│       │           │   └── TestRunner.java
│       │           ├── steps/
│       │           │   └── LoginSteps.java
│       │           └── hooks/
│       │               └── Hooks.java
│       └── resources/
│           └── features/
│               └── login.feature
└── target/`}
              </pre>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              El proyecto sigue el patrón de diseño Page Object Model (POM) para separar la lógica de pruebas de la UI.
              Las features de Cucumber están escritas en formato Gherkin para facilitar la legibilidad por parte de no-técnicos.
            </p>
          </TabsContent>

          <TabsContent value="pom" className="space-y-4 mt-4">
            <div className="flex justify-between mb-2">
              <h3 className="text-lg font-medium">pom.xml</h3>
              <div className="space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleCopyToClipboard(pomXml)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copiar
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDownload('pom.xml', pomXml)}>
                  <Download className="mr-2 h-4 w-4" />
                  Descargar
                </Button>
              </div>
            </div>
            <Textarea 
              value={pomXml}
              rows={20}
              readOnly
              className="font-mono text-sm"
            />
          </TabsContent>

          <TabsContent value="code" className="space-y-6 mt-4">
            <Tabs defaultValue="feature" className="w-full">
              <TabsList className="w-full grid grid-cols-6">
                <TabsTrigger value="feature">Feature</TabsTrigger>
                <TabsTrigger value="steps">Step Defs</TabsTrigger>
                <TabsTrigger value="loginpage">Login Page</TabsTrigger>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="context">Test Context</TabsTrigger>
                <TabsTrigger value="runner">Test Runner</TabsTrigger>
              </TabsList>

              <TabsContent value="feature" className="space-y-4 mt-4">
                <div className="flex justify-between mb-2">
                  <h3 className="text-lg font-medium">login.feature</h3>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleCopyToClipboard(loginFeature)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copiar
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownload('login.feature', loginFeature)}>
                      <Download className="mr-2 h-4 w-4" />
                      Descargar
                    </Button>
                  </div>
                </div>
                <Textarea 
                  value={loginFeature}
                  rows={15}
                  readOnly
                  className="font-mono text-sm"
                />
              </TabsContent>

              <TabsContent value="steps" className="space-y-4 mt-4">
                <div className="flex justify-between mb-2">
                  <h3 className="text-lg font-medium">LoginSteps.java</h3>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleCopyToClipboard(loginStepDefs)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copiar
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownload('LoginSteps.java', loginStepDefs)}>
                      <Download className="mr-2 h-4 w-4" />
                      Descargar
                    </Button>
                  </div>
                </div>
                <Textarea 
                  value={loginStepDefs}
                  rows={15}
                  readOnly
                  className="font-mono text-sm"
                />
              </TabsContent>

              <TabsContent value="loginpage" className="space-y-4 mt-4">
                <div className="flex justify-between mb-2">
                  <h3 className="text-lg font-medium">LoginPage.java</h3>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleCopyToClipboard(loginPage)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copiar
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownload('LoginPage.java', loginPage)}>
                      <Download className="mr-2 h-4 w-4" />
                      Descargar
                    </Button>
                  </div>
                </div>
                <Textarea 
                  value={loginPage}
                  rows={15}
                  readOnly
                  className="font-mono text-sm"
                />
              </TabsContent>

              <TabsContent value="dashboard" className="space-y-4 mt-4">
                <div className="flex justify-between mb-2">
                  <h3 className="text-lg font-medium">DashboardPage.java</h3>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleCopyToClipboard(dashboardPage)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copiar
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownload('DashboardPage.java', dashboardPage)}>
                      <Download className="mr-2 h-4 w-4" />
                      Descargar
                    </Button>
                  </div>
                </div>
                <Textarea 
                  value={dashboardPage}
                  rows={15}
                  readOnly
                  className="font-mono text-sm"
                />
              </TabsContent>

              <TabsContent value="context" className="space-y-4 mt-4">
                <div className="flex justify-between mb-2">
                  <h3 className="text-lg font-medium">TestContext.java</h3>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleCopyToClipboard(testContext)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copiar
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownload('TestContext.java', testContext)}>
                      <Download className="mr-2 h-4 w-4" />
                      Descargar
                    </Button>
                  </div>
                </div>
                <Textarea 
                  value={testContext}
                  rows={15}
                  readOnly
                  className="font-mono text-sm"
                />
              </TabsContent>

              <TabsContent value="runner" className="space-y-4 mt-4">
                <div className="flex justify-between mb-2">
                  <h3 className="text-lg font-medium">TestRunner.java</h3>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleCopyToClipboard(testRunner)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copiar
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownload('TestRunner.java', testRunner)}>
                      <Download className="mr-2 h-4 w-4" />
                      Descargar
                    </Button>
                  </div>
                </div>
                <Textarea 
                  value={testRunner}
                  rows={15}
                  readOnly
                  className="font-mono text-sm"
                />
                <div className="flex justify-between mb-2 mt-6">
                  <h3 className="text-lg font-medium">Hooks.java</h3>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleCopyToClipboard(hooks)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copiar
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownload('Hooks.java', hooks)}>
                      <Download className="mr-2 h-4 w-4" />
                      Descargar
                    </Button>
                  </div>
                </div>
                <Textarea 
                  value={hooks}
                  rows={15}
                  readOnly
                  className="font-mono text-sm"
                />
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Resultados
        </Button>
        <Button onClick={handleDownloadZip}>
          <Download className="mr-2 h-4 w-4" />
          Descargar Proyecto Completo
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JavaCodePreview;
