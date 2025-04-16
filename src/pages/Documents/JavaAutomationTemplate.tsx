
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clipboard, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const pomXml = `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.qaanalyst</groupId>
    <artifactId>selenium-cucumber-automation</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <selenium.version>4.14.1</selenium.version>
        <cucumber.version>7.14.0</cucumber.version>
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
            <version>5.5.3</version>
        </dependency>
        
        <!-- Cucumber -->
        <dependency>
            <groupId>io.cucumber</groupId>
            <artifactId>cucumber-java</artifactId>
            <version>\${cucumber.version}</version>
        </dependency>
        <dependency>
            <groupId>io.cucumber</groupId>
            <artifactId>cucumber-junit-platform-engine</artifactId>
            <version>\${cucumber.version}</version>
        </dependency>
        <dependency>
            <groupId>io.cucumber</groupId>
            <artifactId>cucumber-junit</artifactId>
            <version>\${cucumber.version}</version>
            <scope>test</scope>
        </dependency>
        
        <!-- JUnit 5 -->
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
        <dependency>
            <groupId>org.junit.platform</groupId>
            <artifactId>junit-platform-suite</artifactId>
            <version>1.10.0</version>
            <scope>test</scope>
        </dependency>
        
        <!-- Logging -->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>2.0.9</version>
        </dependency>
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>1.4.11</version>
        </dependency>
        
        <!-- AssertJ for assertions -->
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
                    <source>\${maven.compiler.source}</source>
                    <target>\${maven.compiler.target}</target>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>3.1.2</version>
                <configuration>
                    <properties>
                        <configurationParameters>
                            cucumber.junit-platform.naming-strategy=long
                        </configurationParameters>
                    </properties>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>`;

const basePage = `package org.qaanalyst.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

/**
 * Base Page Object class that all page objects will extend.
 * Contains common methods used across all pages.
 */
public abstract class BasePage {
    protected WebDriver driver;
    protected WebDriverWait wait;
    
    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    /**
     * Waits for element to be clickable and then clicks it
     */
    protected void click(By locator) {
        WebElement element = wait.until(ExpectedConditions.elementToBeClickable(locator));
        element.click();
    }
    
    /**
     * Waits for element to be visible and then enters text
     */
    protected void sendKeys(By locator, String text) {
        WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
        element.clear();
        element.sendKeys(text);
    }
    
    /**
     * Gets text from an element
     */
    protected String getText(By locator) {
        WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
        return element.getText();
    }
    
    /**
     * Checks if element is displayed
     */
    protected boolean isElementDisplayed(By locator) {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(locator)).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Waits for page to load completely
     */
    protected void waitForPageToLoad() {
        wait.until(driver -> ((org.openqa.selenium.JavascriptExecutor) driver)
                .executeScript("return document.readyState").equals("complete"));
    }
}`;

const loginPage = `package org.qaanalyst.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Page Object for Login page
 */
public class LoginPage extends BasePage {
    // Locators
    private final By emailField = By.id("email");
    private final By passwordField = By.id("password");
    private final By loginButton = By.id("login-button");
    private final By errorMessage = By.className("error-message");
    
    public LoginPage(WebDriver driver) {
        super(driver);
    }
    
    /**
     * Navigate to login page
     */
    public void navigateTo(String url) {
        driver.get(url);
        waitForPageToLoad();
    }
    
    /**
     * Login with credentials
     */
    public void login(String email, String password) {
        sendKeys(emailField, email);
        sendKeys(passwordField, password);
        click(loginButton);
    }
    
    /**
     * Get error message text
     */
    public String getErrorMessage() {
        return getText(errorMessage);
    }
    
    /**
     * Check if user is on login page
     */
    public boolean isOnLoginPage() {
        return isElementDisplayed(loginButton);
    }
}`;

const dashboardPage = `package org.qaanalyst.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Page Object for Dashboard page
 */
public class DashboardPage extends BasePage {
    // Locators
    private final By projectsTable = By.id("projects-table");
    private final By newProjectButton = By.id("new-project-button");
    private final By userProfileMenu = By.id("user-profile");
    private final By logoutButton = By.id("logout-button");
    
    public DashboardPage(WebDriver driver) {
        super(driver);
    }
    
    /**
     * Check if user is logged in and on dashboard
     */
    public boolean isOnDashboardPage() {
        return isElementDisplayed(projectsTable);
    }
    
    /**
     * Click on new project button
     */
    public void clickNewProject() {
        click(newProjectButton);
    }
    
    /**
     * Logout from application
     */
    public void logout() {
        click(userProfileMenu);
        click(logoutButton);
    }
    
    /**
     * Get number of projects from table
     */
    public int getProjectCount() {
        return driver.findElements(By.cssSelector("#projects-table tbody tr")).size();
    }
}`;

const webDriverManager = `package org.qaanalyst.utils;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.safari.SafariDriver;

/**
 * Factory class to create WebDriver instances
 */
public class DriverFactory {
    
    public static WebDriver createDriver(String browser) {
        WebDriver driver;
        
        switch (browser.toLowerCase()) {
            case "firefox":
                WebDriverManager.firefoxdriver().setup();
                FirefoxOptions firefoxOptions = new FirefoxOptions();
                driver = new FirefoxDriver(firefoxOptions);
                break;
            case "edge":
                WebDriverManager.edgedriver().setup();
                driver = new EdgeDriver();
                break;
            case "safari":
                driver = new SafariDriver();
                break;
            case "chrome":
            default:
                WebDriverManager.chromedriver().setup();
                ChromeOptions chromeOptions = new ChromeOptions();
                driver = new ChromeDriver(chromeOptions);
                break;
        }
        
        driver.manage().window().maximize();
        return driver;
    }
}`;

const loginSteps = `package org.qaanalyst.stepdefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.qaanalyst.pages.DashboardPage;
import org.qaanalyst.pages.LoginPage;
import org.qaanalyst.utils.TestContext;

import static org.assertj.core.api.Assertions.assertThat;

public class LoginSteps {
    private final TestContext context;
    private final LoginPage loginPage;
    private final DashboardPage dashboardPage;
    
    public LoginSteps(TestContext context) {
        this.context = context;
        this.loginPage = new LoginPage(context.getDriver());
        this.dashboardPage = new DashboardPage(context.getDriver());
    }
    
    @Given("I am on the login page")
    public void iAmOnTheLoginPage() {
        loginPage.navigateTo(context.getBaseUrl() + "/login");
    }
    
    @When("I enter email {string} and password {string}")
    public void iEnterEmailAndPassword(String email, String password) {
        loginPage.login(email, password);
    }
    
    @Then("I should be redirected to the dashboard")
    public void iShouldBeRedirectedToTheDashboard() {
        assertThat(dashboardPage.isOnDashboardPage()).isTrue();
    }
    
    @Then("I should see an error message {string}")
    public void iShouldSeeAnErrorMessage(String errorMessage) {
        assertThat(loginPage.getErrorMessage()).contains(errorMessage);
    }
}`;

const testContext = `package org.qaanalyst.utils;

import org.openqa.selenium.WebDriver;

/**
 * Shared context between step definitions
 * Used for dependency injection with Cucumber-Picocontainer
 */
public class TestContext {
    private WebDriver driver;
    private String baseUrl;
    
    public TestContext() {
        this.baseUrl = System.getProperty("baseUrl", "https://qaanalyst.app");
    }
    
    public WebDriver getDriver() {
        return driver;
    }
    
    public void setDriver(WebDriver driver) {
        this.driver = driver;
    }
    
    public String getBaseUrl() {
        return baseUrl;
    }
    
    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }
}`;

const hooks = `package org.qaanalyst.hooks;

import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.Scenario;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.qaanalyst.utils.DriverFactory;
import org.qaanalyst.utils.TestContext;

/**
 * Cucumber hooks for setup and teardown
 */
public class Hooks {
    private final TestContext context;
    
    public Hooks(TestContext context) {
        this.context = context;
    }
    
    @Before
    public void setup() {
        String browser = System.getProperty("browser", "chrome");
        WebDriver driver = DriverFactory.createDriver(browser);
        context.setDriver(driver);
    }
    
    @After
    public void tearDown(Scenario scenario) {
        WebDriver driver = context.getDriver();
        
        // Take screenshot if scenario fails
        if (scenario.isFailed()) {
            final byte[] screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);
            scenario.attach(screenshot, "image/png", "screenshot");
        }
        
        if (driver != null) {
            driver.quit();
        }
    }
}`;

const loginFeature = `Feature: Login Functionality
  As a user of the QA Analyst application
  I want to be able to login to the system
  So that I can access my projects and test cases

  Background:
    Given I am on the login page

  Scenario: Successful login with valid credentials
    When I enter email "user@example.com" and password "password123"
    Then I should be redirected to the dashboard
    
  Scenario: Failed login with invalid password
    When I enter email "user@example.com" and password "wrongpassword"
    Then I should see an error message "Invalid email or password"
    
  Scenario: Failed login with non-existing email
    When I enter email "nonexistent@example.com" and password "password123"
    Then I should see an error message "Invalid email or password"`;

const testRunner = `package org.qaanalyst.runners;

import org.junit.platform.suite.api.ConfigurationParameter;
import org.junit.platform.suite.api.IncludeEngines;
import org.junit.platform.suite.api.SelectClasspathResource;
import org.junit.platform.suite.api.Suite;

import static io.cucumber.junit.platform.engine.Constants.PLUGIN_PROPERTY_NAME;
import static io.cucumber.junit.platform.engine.Constants.GLUE_PROPERTY_NAME;

@Suite
@IncludeEngines("cucumber")
@SelectClasspathResource("features")
@ConfigurationParameter(key = GLUE_PROPERTY_NAME, value = "org.qaanalyst.stepdefinitions,org.qaanalyst.hooks")
@ConfigurationParameter(key = PLUGIN_PROPERTY_NAME, value = "pretty,html:target/cucumber-reports/report.html,json:target/cucumber-reports/report.json")
public class TestRunner {
    // This class serves as an entry point for running Cucumber tests
}`;

const JavaAutomationTemplate = () => {
    const [activeTab, setActiveTab] = useState("pom");
    
    const copyToClipboard = (text, description) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                toast({
                    title: "Copied to clipboard",
                    description: `${description} code copied successfully`,
                    duration: 3000,
                });
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
                toast({
                    title: "Error",
                    description: "Failed to copy to clipboard",
                    variant: "destructive",
                    duration: 3000,
                });
            });
    };
    
    const downloadFile = (content, filename) => {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    
    const getFileContent = (tab) => {
        switch(tab) {
            case "pom": return pomXml;
            case "basePage": return basePage;
            case "loginPage": return loginPage;
            case "dashboardPage": return dashboardPage;
            case "webDriverManager": return webDriverManager;
            case "loginSteps": return loginSteps;
            case "testContext": return testContext;
            case "hooks": return hooks;
            case "loginFeature": return loginFeature;
            case "testRunner": return testRunner;
            default: return "";
        }
    };
    
    const getFileName = (tab) => {
        switch(tab) {
            case "pom": return "pom.xml";
            case "basePage": return "BasePage.java";
            case "loginPage": return "LoginPage.java";
            case "dashboardPage": return "DashboardPage.java";
            case "webDriverManager": return "DriverFactory.java";
            case "loginSteps": return "LoginSteps.java";
            case "testContext": return "TestContext.java";
            case "hooks": return "Hooks.java";
            case "loginFeature": return "login.feature";
            case "testRunner": return "TestRunner.java";
            default: return "";
        }
    };
    
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Java Automation Template</CardTitle>
                <CardDescription>Selenium WebDriver + Cucumber BDD + Page Object Model</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="pom" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
                        <TabsTrigger value="pom">POM.xml</TabsTrigger>
                        <TabsTrigger value="basePage">BasePage</TabsTrigger>
                        <TabsTrigger value="loginPage">LoginPage</TabsTrigger>
                        <TabsTrigger value="dashboardPage">DashboardPage</TabsTrigger>
                        <TabsTrigger value="webDriverManager">DriverFactory</TabsTrigger>
                        <TabsTrigger value="loginSteps">LoginSteps</TabsTrigger>
                        <TabsTrigger value="testContext">TestContext</TabsTrigger>
                        <TabsTrigger value="hooks">Hooks</TabsTrigger>
                        <TabsTrigger value="loginFeature">Feature</TabsTrigger>
                        <TabsTrigger value="testRunner">TestRunner</TabsTrigger>
                    </TabsList>
                    
                    <div className="bg-gray-800 p-4 rounded-md relative">
                        <div className="absolute top-2 right-2 flex gap-2">
                            <Button 
                                variant="outline" 
                                size="icon" 
                                onClick={() => copyToClipboard(getFileContent(activeTab), getFileName(activeTab))}
                                title="Copy to clipboard"
                            >
                                <Clipboard className="h-4 w-4" />
                            </Button>
                            <Button 
                                variant="outline" 
                                size="icon" 
                                onClick={() => downloadFile(getFileContent(activeTab), getFileName(activeTab))}
                                title="Download file"
                            >
                                <Download className="h-4 w-4" />
                            </Button>
                        </div>
                        <ScrollArea className="h-[400px] w-full">
                            <pre className="text-xs md:text-sm text-gray-200 overflow-x-auto whitespace-pre-wrap">
                                {getFileContent(activeTab)}
                            </pre>
                        </ScrollArea>
                    </div>
                </Tabs>
                
                <div className="mt-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                    <h3 className="text-lg font-medium mb-2">Project Structure</h3>
                    <pre className="text-xs md:text-sm">
{`selenium-cucumber-automation/
├── pom.xml
├── src/
│   ├── main/
│   │   └── java/
│   │       └── org/
│   │           └── qaanalyst/
│   │               ├── pages/
│   │               │   ├── BasePage.java
│   │               │   ├── LoginPage.java
│   │               │   └── DashboardPage.java
│   │               └── utils/
│   │                   └── DriverFactory.java
│   └── test/
│       ├── java/
│       │   └── org/
│       │       └── qaanalyst/
│       │           ├── stepdefinitions/
│       │           │   └── LoginSteps.java
│       │           ├── hooks/
│       │           │   └── Hooks.java
│       │           ├── runners/
│       │           │   └── TestRunner.java
│       │           └── utils/
│       │               └── TestContext.java
│       └── resources/
│           └── features/
│               └── login.feature`}
                    </pre>
                </div>
            </CardContent>
        </Card>
    );
};

export default JavaAutomationTemplate;
